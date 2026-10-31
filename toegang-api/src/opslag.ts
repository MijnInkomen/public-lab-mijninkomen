import pg from 'pg';
import type { Aanvraag } from './validatie.ts';

export type Status = 'in behandeling' | 'toegelaten' | 'geweigerd';

export interface OpgeslagenAanvraag extends Aanvraag {
  id: string;
  status: Status;
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
  ) => Promise<Resultaat>;
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

  CREATE UNIQUE INDEX IF NOT EXISTS een_open_aanvraag_per_email
    ON toegangsaanvragen (email)
    WHERE status = 'in behandeling';
`;

const SLA_OP = `
  INSERT INTO toegangsaanvragen (naam, organisatie, functie, email, gesprek_datum)
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (email) WHERE status = 'in behandeling' DO NOTHING
`;

const KOLOMMEN = `
  id, naam, organisatie, functie, email, status,
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

    behandelAanvraag: async (id, status, actie) => {
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
        await client.query('UPDATE toegangsaanvragen SET status = $2 WHERE id = $1', [id, status]);
        await client.query('COMMIT');
        return 'gelukt';
      } catch (fout) {
        await client.query('ROLLBACK');
        throw fout;
      } finally {
        client.release();
      }
    },
  };
};
