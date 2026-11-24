import fsPromises from "node:fs/promises";
import pg, { Pool } from "pg";

export type epicType = featureType & {
  features: featureType[],
};
export type featureType = {
  title: string,
  description: string,
  labels: string[],
  gebruikers: string[],
  status: epicOpslagType["status"],
  isOpen: boolean,
};

type epicOpslagType = {
  id: string,
  title: string,
  description: string,
  labels: string[],
  status: 'In Behandeling' | 'Trechter' | 'Refinement' | 'PI Ready' | null,
  open: boolean,
};
type featureOpslagType = epicOpslagType & {
  epic_id: string,
};

export const QUERIES = {
  "huidig": "SELECT * FROM epics WHERE 'publiek' IN labels AND open = FALSE",
  "toekomstig": "SELECT * FROM epics WHERE 'publiek' IN labels AND open = TRUE",
}
export type queryType = keyof typeof QUERIES;

const MAAK_TABLE = `
  CREATE TABLE IF NOT EXISTS epics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    labels text[] NOT NULL,
    status text NOT NULL DEFAULT 'In Behandeling'
      CHECK (status IN ('In Behandeling', 'Trechter', 'Refinement', 'PI Ready')),
    open boolean DEFAULT TRUE
  );

  CREATE TABLE IF NOT EXISTS features (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    epic_id uuid,
    title text NOT NULL,
    description text NOT NULL,
    labels text[] NOT NULL,
    status text NOT NULL DEFAULT 'In Behandeling'
      CHECK (status IN ('In Behandeling', 'Trechter', 'Refinement', 'PI Ready')),
    open boolean DEFAULT TRUE,
    CONSTRAINT fk_features_epics FOREIGN KEY (epic_id)
      REFERENCES epics(id)
  );

  CREATE INDEX IF NOT EXISTS is_afgemaakt
    ON epics (id, open);
`;

export function slaEpicOp(title: string, description: string, labels: string[], open: boolean, status: null | string) {
  return {
    text: `INSERT INTO epics (title, description, labels, open${status ? ", status": ""}) VALUES ($1, $2, $3, $4${status ? ", $5" : ""}) RETURNING id`,
    values: [title, description, labels, open].concat(status ? [status] : [])
  }
}

export function slaFeatureOp(epicId: string, title: string, description: string, labels: string[], open: boolean, status: null | string) {
  return {
    text: `INSERT INTO features (epic_id, title, description, labels, open${status ? ", status" : ""}) VALUES ($1, $2, $3, $4, $5${status ? ", $6" : ""})`,
    values: [epicId, title, description, labels, open].concat(status ? [status] : [])
  }
}
const STATUSSES = ["In Behandeling", "Trechter", "Refinement", "PI Ready"];

const OPSLAG_PAD = "./opslag/storage.json";
export class Opslag {
  pool: Pool
  intialized: boolean = false;
  constructor(connectionString: string) {
    this.pool = new pg.Pool({ connectionString });
    this.pool.query(MAAK_TABLE).then(() => this.intialized = true);
  }

  async slaIssuesOp(epics: epicType[]) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('TRUNCATE TABLE epics CASCADE');
      await client.query('TRUNCATE TABLE features');
      for (const epic of epics) {
        let status = getStatus(epic.labels)
        let result = await client.query(
          slaEpicOp(epic.title, epic.description, epic.labels, epic.isOpen, status)
        );
        const epicId = result.rows[0].id;

        for (const feature of epic.features) {
          status = getStatus(feature.labels);
          await client.query(
            slaFeatureOp(epicId, feature.title, feature.description, feature.labels, feature.isOpen, status)
          );
        }
      }

      await client.query('COMMIT');
    } catch (e) {
      console.log(e)
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  }

  // async haalIssuesOp(): Promise<epicType[]> {
  async haalIssuesOp(queryType: queryType): Promise<epicType[]> {
    const client = await this.pool.connect();
    let result;
    try {

      if (queryType === "huidig") {
        const response = await client.query("SELECT * FROM epics WHERE 'publiek' = ANY (labels) AND open = FALSE");
        result = response.rows as epicOpslagType[];
      } else {
        const response = await client.query("SELECT * FROM epics WHERE 'publiek' = ANY (labels) AND open = TRUE");
        result = response.rows as epicOpslagType[];
      }
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      client.release();
    }

    return vertaalEpics(result || []);
  }
}

export function vertaalEpics(epics: epicOpslagType[]): epicType[] {
  return epics.map((epic) => {
    const epicInfo = vertaalIssue(epic);
    return {
      ...epicInfo,
      features: [],
    }
  });
}

export function vertaalIssue(issue: epicOpslagType): featureType {
  return {
    title: issue.title,
    description: issue.description,
    labels: issue.labels,
    // TODO: Zorg ervoor dat gebruikers in isues staan op een manier
    gebruikers: ["Alle gemeenten"],
    status: issue.status,
    isOpen: issue.open, 
  }
}

export function getStatus(labels: string[]) {
  for (const status of STATUSSES) {
    if (labels.includes(status)) {
      return status;
    }
  }
  return null;
}