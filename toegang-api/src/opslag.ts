import pg from 'pg';
import type { Aanvraag } from './validatie.ts';

export interface Opslag {
  slaAanvraagOp: (aanvraag: Aanvraag) => Promise<unknown>;
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

export const maakOpslag = async (connectionString: string): Promise<Opslag> => {
  const pool = new pg.Pool({ connectionString });
  await pool.query(MAAK_TABEL);

  return {
    slaAanvraagOp: ({ naam, organisatie, functie, email, gesprekDatum }) =>
      pool.query(SLA_OP, [naam, organisatie, functie, email, gesprekDatum]),
  };
};
