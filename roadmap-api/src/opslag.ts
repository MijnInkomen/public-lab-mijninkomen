import pg, { Pool } from "pg";
import { type publiekeEndpointType, type roadmapEndpointType, type EPIC_STATUSSEN } from "./server.ts";

export type epicType = Omit<featureType, "description"> & {
  description: string | null,
  features: featureType[],
  gebruikers: null | string[]
};
export type featureType = {
  title: string,
  description: string,
  labels: string[],
  status: epicOpslagType["status"],
  isOpen: boolean,
};

export type epicOpslagType = {
  id: string,
  title: string,
  description: string | null,
  labels: string[],
  gebruikers: string[] | null,
  status: typeof EPIC_STATUSSEN[number] | null,
  open: boolean,
};
export type featureOpslagType = epicOpslagType & {
  epic_id: string,
};

export type roadmapEpicType = {
  title: string,
  description: null | string,
  labels: string[],
  gebruikers: null | string[],
  status: typeof EPIC_STATUSSEN[number] | null,
  isOpen: boolean,
  features: roadmapFeatureType[],
};
export type roadmapFeatureType = {
  title: string,
  description: string,
  isOpen: boolean,
}

const MAAK_TABLE = `
  CREATE TABLE IF NOT EXISTS epics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    labels text[] NOT NULL,
    gebruikers text[],
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

export function slaEpicOp(epic: epicType) {
  const {title, description, labels, isOpen, status } = epic;
  return {
    text: `
      INSERT INTO epics (title, description, labels, open${status ? ", status": ""})
      VALUES ($1, $2, $3, $4${status ? ", $5" : ""})
      RETURNING id;
    `,
    values: [title, description, labels, isOpen].concat(status ? [status] : [])
  }
}

export function slaFeatureOp(epicId: string, feature: featureType) {
  const { title, description, labels, isOpen, status } = feature;
  return {
    text: `
      INSERT INTO features (epic_id, title, description, labels, open${status ? ", status" : ""})
      VALUES ($1, $2, $3, $4, $5${status ? ", $6" : ""});
    `,
    values: [epicId, title, description, labels, isOpen].concat(status ? [status] : [])
  }
}

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
      await client.query('BEGIN;');
      await client.query('TRUNCATE TABLE epics CASCADE;');
      await client.query('TRUNCATE TABLE features;');
      for (const epic of epics) {
        let result = await client.query(slaEpicOp(epic));
        const epicId = result.rows[0].id;

        for (const feature of epic.features) {
          await client.query(slaFeatureOp(epicId, feature));
        }
      }

      await client.query('COMMIT;');
    } catch (e) {
      console.log(e)
      await client.query("ROLLBACK;");
    } finally {
      client.release();
    }
  }

  async haalPubliekeEpicsOp(epicType: publiekeEndpointType): Promise<Omit<epicType, "features">[]> {
    const client = await this.pool.connect();
    let result: Omit<epicType, "features">[] = [];
    try {
      const response = await client.query<Omit<epicType, "features">>(`
        SELECT title, description, labels, gebruikers, status, open as isOpen FROM epics
        WHERE 'publiek' = ANY (labels)
        AND open = ${epicType === "huidig" ? "FALSE" : "TRUE"};
      `);
      result = response.rows;
    } catch (e) {
      console.error(e);
    } finally {
      client.release();
    }

    return result;
  }

  async haalRoadmapOp(type: roadmapEndpointType): Promise<roadmapEpicType[]> {
    type epicQueryType = roadmapEpicType & {id: string};

    const client = await this.pool.connect();
    let result: epicQueryType[] = [];
    try {
      const epics = (await client.query<epicQueryType>(`
        SELECT id, title, description, labels, gebruikers, status, open as isOpen FROM epics
        WHERE $1 = ANY (labels);
      `, [type])).rows;
      result = epics.map((epic) => {
        return {
          ...epic,
          features: []
        }
      });

      type featureQueryType = roadmapFeatureType & {epic_id: string};
      const features = (await client.query<featureQueryType>(`
        SELECT epic_id, title, description, open as isOpen FROM features
        WHERE epid_id = ANY ($1)
        ORDER BY epic_id;
      `, epics.map((epic) => epic.id))).rows;

      for (const feature of features) {
        const parentEpic = result.find((epic) => epic.id === feature.epic_id);
        if (!parentEpic) {
          continue;
        }
        parentEpic.features.push(feature);
      }
    } catch (e) {
      console.error(e);
    } finally {
      client.release();
    }

    return result;
  }
}
