import pg, { Client, Pool } from "pg";
import { type publiekeEndpointType, type roadmapEndpointType, type EPIC_STATUSSEN } from "./server.ts";

// De feature en epic structuur die de server creërt vanuit de github structuur
export type epicType = Omit<featureType, "description"> & {
  description: string | null,
  features: featureType[],
  gebruikers: null | string[]
};
export type featureType = {
  status: issueOpslag["status"],
  title: string,
  description: string,
  labels: string[],
  isOpen: boolean,
};

// De structuur van de opgeslagen features/epics
export type issueOpslag = {
  id: string,
  parent_id: string | null,
  issue_type: "feature" | "epic",
  title: string,
  description: string | null,
  gebruikers: string[] | null,
  status: typeof EPIC_STATUSSEN[number] | null,
  open: boolean,
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

// De structuur van de epics die naar de ontwikkeling pagina gaan
export type publiekeEpicType = {
  title: string,
  status: string,
  isOpen: boolean,
} & ({
  description: null,
  gebruikers: null,
} | {
  description: string,
  gebruikers: string[],
});

const MAAK_TABLE = `
  CREATE TABLE IF NOT EXISTS issues (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id uuid,
    issue_type text NOT NULL
      CHECK (issue_type IN ('epic', 'feature')),
    title text NOT NULL,
    description text,
    gebruikers text[],
    open boolean DEFAULT FALSE,
    status text NOT NULL DEFAULT 'In Behandeling',
      CHECK (status IN ('In Behandeling', 'Trechter', 'Refinement', 'PI Ready')),
    CONSTRAINT fk_features_epics FOREIGN KEY (parent_id)
      REFERENCES issues(id)
  );

  CREATE TABLE IF NOT EXISTS labels (
    name text PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS issue_labels (
    issue_id uuid NOT NULL,
    label text NOT NULL,
    CONSTRAINT fk_issue FOREIGN KEY (issue_id)
      REFERENCES issues(id),
    CONSTRAINT fk_label FOREIGN KEY (label)
      REFERENCES labels(name),
    PRIMARY KEY (issue_id, label)
  );

  CREATE INDEX IF NOT EXISTS is_afgemaakt
    ON issues (id, open);
  CREATE INDEX IF NOT EXISTS welke_labels
    ON issue_labels (issue_id, label)
`;

export function slaEpicOp(epic: epicType) {
  const {title, description, isOpen, status, gebruikers } = epic;
  return {
    text: `
      INSERT INTO issues (issue_type, title, description, gebruikers, open${status ? ", status": ""})
      VALUES ('epic', $1, $2, $3, $4${status ? ", $5" : ""})
      RETURNING id;
    `,
    values: [title, description, gebruikers, isOpen].concat(status ? [status] : [])
  }
}

export function slaFeatureOp(epicId: string, feature: featureType) {
  const { title, description, isOpen, status } = feature;
  return {
    text: `
      INSERT INTO issues (issue_type, parent_id, title, description, open${status ? ", status" : ""})
      VALUES ('feature', $1, $2, $3, $4${status ? ", $5" : ""})
      RETURNING id;
    `,
    values: [epicId, title, description, isOpen].concat(status ? [status] : [])
  }
}

export async function slaLabelsOp(client: Client, issueId: string, labels: string[]) {
  if (labels.length === 0) {
    return;
  }

  const labelIdxes = Array.from({length: labels.length}, (_, idx) => "$" + (idx + 1).toString());
  const issueIdx = labels.length + 1;
  const values = [...labels, issueId];
  await client.query(`
    INSERT INTO labels VALUES ${labelIdxes.map((idx) => `(${idx})`).join()}
      ON CONFLICT DO NOTHING;
    `,
    labels
  );

  await client.query(`
    INSERT INTO issue_labels
    VALUES ${labelIdxes.map((idx) => `($${issueIdx}, ${idx})`).join()};
    `,
    values
  );
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
      await client.query(`TRUNCATE TABLE issues CASCADE;`);
      await client.query('TRUNCATE TABLE labels CASCADE;');
      await client.query('TRUNCATE TABLE issue_labels;');
      for (const epic of epics) {
        let result = await client.query(slaEpicOp(epic));
        const epicId = result.rows[0].id;
        await slaLabelsOp(client, epicId, epic.labels);

        for (const feature of epic.features) {
          result = await client.query(slaFeatureOp(epicId, feature));
          const featureId = result.rows[0].id;
          await slaLabelsOp(client, featureId, feature.labels);
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

  async haalPubliekeEpicsOp(epicType: publiekeEndpointType): Promise<publiekeEpicType[]> {
    const client = await this.pool.connect();
    let result: publiekeEpicType[] = [];
    try {
      const response = await client.query<publiekeEpicType>(`
        SELECT title, description, gebruikers, status, open as isOpen FROM issues
        JOIN issue_labels ON issues.id = issue_labels.issue_id
        JOIN labels ON issue_labels.label = labels.name
        WHERE issue_type = 'epic' AND labels.name = 'publiek'
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
    let result = new Map<string, roadmapEpicType>();
    try {
      const epics = (await client.query<epicQueryType>(`
        SELECT id, title, description, gebruikers, status, open as isOpen FROM issues
        JOIN issue_labels ON issues.id = issue_labels.issue_id
        JOIN labels ON issue_labels.label = labels.name
        WHERE issue_type = 'epic' AND labels.name = $1;
      `, [type])).rows;
      epics.forEach((epic) => {
        let epicData: Omit<epicQueryType, "id"> & {id?: string} = structuredClone(epic);
        delete epicData.id;

        result.set(epic.id, {
          ...epicData,
          labels: [],
          features: [],
        });
      });

      type featureQueryType = roadmapFeatureType & {parent_id: string};
      const features = (await client.query<featureQueryType>(`
        SELECT parent_id, title, description, open as isOpen FROM issues
        WHERE issue_type = 'feature' AND parent_id = ANY ($1)
        ORDER BY parent_id;
      `, [epics.map((epic) => epic.id)])).rows;

      for (const feature of features) {
        const parentEpic = result.get(feature.parent_id);
        if (!parentEpic) {
          continue;
        }
        parentEpic.features.push({
          title: feature.title,
          description: feature.description,
          isOpen: feature.isOpen
        });
      }

      type labelQueryType = {issue_id: string, name: string};
      const labels = (await client.query<labelQueryType>(`
        SELECT name, issue_id FROM labels
        JOIN issue_labels ON labels.name = issue_labels.label
        JOIN issues ON issue_labels.issue_id = issues.id
        WHERE issue_id = ANY ($1)
        ORDER BY issue_id;
      `, [epics.map((epic) => epic.id)])).rows;

      for (const label of labels) {
        const parentEpic = result.get(label.issue_id);
        if (!parentEpic) {
          continue;
        }

        parentEpic.labels.push(label.name);
      }
    } catch (e) {
      console.error(e);
    } finally {
      client.release();
    }

    return [...result.values()];
  }
}
