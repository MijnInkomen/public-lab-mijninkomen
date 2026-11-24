import pg from 'pg';
import type { Aanvraag } from './validatie.ts';

export type Status = 'in behandeling' | 'toegelaten' | 'geweigerd';

export interface OpgeslagenAanvraag extends Aanvraag {
  id: string;
  status: Status;
  redenWeigering: string | null;
  aangemaaktOp: string;
}

export type Resultaat = 'gelukt' | 'niet-gevonden' | 'al-behandeld';

export interface Opslag {
  slaAanvraagOp: (aanvraag: Aanvraag) => Promise<unknown>;
  haalAanvragenOp: () => Promise<OpgeslagenAanvraag[]>;
  /** Voert de actie uit en zet daarna de status. Mislukt de actie, dan blijft de aanvraag ongewijzigd. */
  behandelAanvraag: (
    id: string,
    status: Exclude<Status, 'in behandeling'>,
    actie?: (aanvraag: OpgeslagenAanvraag) => Promise<void>,
    redenWeigering?: string,
  ) => Promise<Resultaat>;
  /** Soort communitylid per lid. Zonder eigen keuze is dat de functie uit de geaccepteerde aanvraag. */
  haalSoortenOp: (leden: { id: string; email: string }[]) => Promise<Map<string, string | null>>;
  zetSoort: (id: string, soort: string) => Promise<void>;
  /** Functie en organisatie van een lid, uit het gekozen soort en de geaccepteerde aanvraag. */
  haalProfielOp: (id: string, email: string) => Promise<Profiel>;
  /** Na een nieuw e-mailadres hoort de geaccepteerde aanvraag nog steeds bij het lid. */
  verhuisAanvraag: (oudEmail: string, nieuwEmail: string) => Promise<void>;
}

export interface Profiel {
  functie: string | null;
  organisatie: string | null;
}

const MAAK_TABEL = `
  CREATE TABLE IF NOT EXISTS toegangsaanvragen (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    naam text NOT NULL,
    organisatie text NOT NULL,
    functie text NOT NULL,
    email text NOT NULL,
    gesprek_datum date NOT NULL,
    status text NOT NULL DEFAULT 'in behandeling'
      CHECK (status IN ('in behandeling', 'toegelaten', 'geweigerd')),
    aangemaakt_op timestamptz NOT NULL DEFAULT now()
  );

  ALTER TABLE toegangsaanvragen ADD COLUMN IF NOT EXISTS reden_weigering text;

  CREATE TABLE IF NOT EXISTS leden_soort (
    keycloak_id text PRIMARY KEY,
    soort text NOT NULL,
    gewijzigd_op timestamptz NOT NULL DEFAULT now()
  );

  CREATE UNIQUE INDEX IF NOT EXISTS een_open_aanvraag_per_email
    ON toegangsaanvragen (email)
    WHERE status = 'in behandeling';
`;

const SLA_OP = `
  INSERT INTO toegangsaanvragen (naam, organisatie, functie, email, gesprek_datum)
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (email) WHERE status = 'in behandeling' DO NOTHING
`;

const SOORTEN = `
  SELECT lid.id, COALESCE(gekozen.soort, aanvraag.functie) AS soort
  FROM unnest($1::text[], $2::text[]) AS lid (id, email)
  LEFT JOIN leden_soort gekozen ON gekozen.keycloak_id = lid.id
  LEFT JOIN LATERAL (
    SELECT functie FROM toegangsaanvragen
    WHERE email = lid.email AND status = 'toegelaten'
    ORDER BY aangemaakt_op DESC LIMIT 1
  ) aanvraag ON true
`;

const ZET_SOORT = `
  INSERT INTO leden_soort (keycloak_id, soort) VALUES ($1, $2)
  ON CONFLICT (keycloak_id) DO UPDATE SET soort = EXCLUDED.soort, gewijzigd_op = now()
`;

const PROFIEL = `
  SELECT COALESCE(gekozen.soort, aanvraag.functie) AS functie, aanvraag.organisatie
  FROM (SELECT $1::text AS id, $2::text AS email) AS lid
  LEFT JOIN leden_soort gekozen ON gekozen.keycloak_id = lid.id
  LEFT JOIN LATERAL (
    SELECT functie, organisatie FROM toegangsaanvragen
    WHERE email = lid.email AND status = 'toegelaten'
    ORDER BY aangemaakt_op DESC LIMIT 1
  ) aanvraag ON true
`;

const KOLOMMEN = `
  id, naam, organisatie, functie, email, status,
  reden_weigering AS "redenWeigering",
  gesprek_datum::text AS "gesprekDatum",
  aangemaakt_op AS "aangemaaktOp"
`;

export const maakOpslag = async (connectionString: string): Promise<Opslag> => {
  const pool = new pg.Pool({ connectionString });
  await pool.query(MAAK_TABEL);

  return {
    slaAanvraagOp: ({ naam, organisatie, functie, email, gesprekDatum }) =>
      pool.query(SLA_OP, [naam, organisatie, functie, email, gesprekDatum]),

    haalAanvragenOp: async () => {
      const { rows } = await pool.query<OpgeslagenAanvraag>(
        `SELECT ${KOLOMMEN} FROM toegangsaanvragen ORDER BY aangemaakt_op DESC`,
      );
      return rows;
    },

    behandelAanvraag: async (id, status, actie, redenWeigering) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        // FOR UPDATE: twee admins kunnen dezelfde aanvraag niet tegelijk behandelen.
        const { rows } = await client.query<OpgeslagenAanvraag>(
          `SELECT ${KOLOMMEN} FROM toegangsaanvragen WHERE id = $1 FOR UPDATE`,
          [id],
        );
        const aanvraag = rows[0];
        const resultaat: Resultaat | undefined = !aanvraag
          ? 'niet-gevonden'
          : aanvraag.status !== 'in behandeling'
            ? 'al-behandeld'
            : undefined;
        if (resultaat) {
          await client.query('ROLLBACK');
          return resultaat;
        }

        await actie?.(aanvraag);
        await client.query('UPDATE toegangsaanvragen SET status = $2, reden_weigering = $3 WHERE id = $1', [
          id,
          status,
          redenWeigering ?? null,
        ]);
        await client.query('COMMIT');
        return 'gelukt';
      } catch (fout) {
        await client.query('ROLLBACK');
        throw fout;
      } finally {
        client.release();
      }
    },

    haalSoortenOp: async (leden) => {
      const { rows } = await pool.query<{ id: string; soort: string | null }>(SOORTEN, [
        leden.map(({ id }) => id),
        leden.map(({ email }) => email.toLowerCase()),
      ]);
      return new Map(rows.map(({ id, soort }) => [id, soort]));
    },

    zetSoort: async (id, soort) => {
      await pool.query(ZET_SOORT, [id, soort]);
    },

    haalProfielOp: async (id, email) => {
      const { rows } = await pool.query<Profiel>(PROFIEL, [id, email.toLowerCase()]);
      return rows[0] ?? { functie: null, organisatie: null };
    },

    verhuisAanvraag: async (oudEmail, nieuwEmail) => {
      await pool.query(`UPDATE toegangsaanvragen SET email = $2 WHERE email = $1 AND status = 'toegelaten'`, [
        oudEmail.toLowerCase(),
        nieuwEmail.toLowerCase(),
      ]);
    },
  };
};
