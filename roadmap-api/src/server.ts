import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { valideerWebhookEvent,valideerWebhookSignature, verzoekGitHubData, type githubEpicType, type githubFeatureType, type githubResponseType } from './github.ts';
import { Opslag, type epicType, type featureType } from './opslag.ts';
import { ROLLEN, type Keycloak } from './keycloak.ts';
import toml from "toml";

const MAX_GROOTTE = 25 * 1024 * 1024;
export const EPIC_STATUSSEN = ["In Behandeling", "Trechter", "Refinement", "PI Ready"] as const;

export type publiekeEndpointType = "huidig" | "toekomstig";
export type roadmapEndpointType = "mijninkomen" | "innovatie";

export function maakServer(opslag: Opslag, keycloak: Keycloak) {
  return createServer(async (verzoek, antwoord) => {
    const url = new URL(verzoek.url ?? '/', 'http://localhost');
    const pad = url.pathname.slice(12, url.pathname.at(-1) === "/" ? -1 : undefined);
    try {
      switch (pad) {
        case "/publiek/huidig":
        case "/publiek/toekomstig": {
          if (verzoek.method !== "GET") {
            antwoord.setHeader('Allow', 'GET');
            stuurJson(antwoord, 405, { fout: 'Methode niet toegestaan' });
            return;
          }

          const type = pad.slice(9) as publiekeEndpointType;
          const epics = await opslag.haalPubliekeEpicsOp(type);
          stuurJson(antwoord, 200, {[type]: epics});
          return;
        }
        
        case "/privaat/roadmap":
        case "/privaat/innovatie": {
          if (verzoek.method !== "GET") {
            antwoord.setHeader('Allow', 'GET');
            stuurJson(antwoord, 405, { fout: 'Methode niet toegestaan' });
            return;
          }

          const type = pad.slice(9) as roadmapEndpointType;
          const epics = await opslag.haalRoadmapOp(type);
          console.log(epics)
          stuurJson(antwoord, 200, {[type]: epics});
          return;
        }
        
        case "/update": {
          if (verzoek.method !== "PATCH") {
            antwoord.setHeader('Allow', 'PATCH');
            stuurJson(antwoord, 405, { fout: 'Methode niet toegestaan' });
            return;
          }

          const email = leesHeading(verzoek, "x-auth-email");
          if (!email) {
            stuurStatus(antwoord, 401);
            return;
          }

          const rollen = await keycloak.haalRollenOp(email);
          if (!(rollen.has(ROLLEN.ADMIN) || rollen.has(ROLLEN.HOOFDBEHEERDER))) {
            stuurStatus(antwoord, 401);
            return;
          }

          const result = await verwerkUpdateVerzoek(opslag);
          stuurStatus(antwoord, result ? 200 : 500);
          return;
        }

        case "/webhook": {
          if (verzoek.method !== "POST") {
            antwoord.setHeader('Allow', 'POST');
            stuurJson(antwoord, 405, { fout: 'Methode niet toegestaan' });
            return;
          }

          const body = await leesBody(verzoek);
          if (!valideerWebhookSignature(verzoek, body)) {
            stuurStatus(antwoord, 400);
            return;
          }
          if (!valideerWebhookEvent(verzoek, body)) {
            stuurStatus(antwoord, 200);
            return;
          }
          const result = await verwerkUpdateVerzoek(opslag);
          stuurStatus(antwoord, result ? 200 : 500);
          return;
        }

        default:
          stuurJson(antwoord, 404, { fout: 'Niet gevonde '});
          return;
      }
    } catch (fout) {
      stuurFout(antwoord, fout);
      return;
    }
  });
}

function stuurFout (antwoord: ServerResponse, fout: unknown): void {
  console.error('Verzoek mislukt:', fout instanceof Error ? fout.message : 'onbekend');
  stuurJson(antwoord, 500, { fout: 'Er ging iets mis. Probeer het later opnieuw' });
};

function stuurJson (antwoord: ServerResponse, status: number, inhoud: object): void {
  antwoord.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  antwoord.end(JSON.stringify(inhoud));
};

function stuurStatus(antwoord: ServerResponse, statusCode: number) {
  antwoord.writeHead(statusCode)
  antwoord.end()
}

function verwerkGithubResponse(response: githubResponseType["repository"]): epicType[] {
  const epics: epicType[] = [];

  for (const epic of response.epics.nodes) {
    const vertaaldeEpic = vertaalGitHubEpic(epic);
    vertaaldeEpic.features = epic.subIssues.nodes.map(
      (feature) => vertaalGitHubFeature(feature)
    );

    epics.push(vertaaldeEpic);
  }
  console.log(epics)
  return epics;
}

function vertaalGitHubFeature(issue: githubFeatureType): featureType {
  const feature: featureType = {
    title: issue.title,
    description: issue.body,
    labels: issue.labels.nodes.map((label) => label.name),
    isOpen: issue.state === "OPEN",
    status: null,
  };
  feature.status = getStatus(feature.labels);

  return feature
}

function vertaalGitHubEpic(issue: githubEpicType): epicType {
  const epic: epicType = {
    title: issue.title,
    description: null,
    labels: issue.labels.nodes.map((label) => label.name),
    isOpen: issue.state === "OPEN",
    status: null,
    gebruikers: null,
    features: [],
  };
  epic.status = getStatus(epic.labels);

  try {
    const { beschrijving, gebruikers } = toml.parse(issue.body);
    epic.description = beschrijving;
    epic.gebruikers = gebruikers;
  } catch(e) {}

  return epic;
}

export async function verwerkUpdateVerzoek(opslag: Opslag) {
  const result = await verzoekGitHubData();
  if (!result) {
    return false;
  }

  const verwerkteEpics = verwerkGithubResponse(result);
  await opslag.slaIssuesOp(verwerkteEpics);
  return true;
}

async function leesBody(verzoek: IncomingMessage) {
  const delen = [];
  let grootte = 0;
  for await (const deel of verzoek) {
    grootte += deel.length;
    if (grootte > MAX_GROOTTE){
      throw new Error('Te groot');
    }

    delen.push(deel);
  }

  return Buffer.concat(delen);
}

function leesHeading(verzoek: IncomingMessage, header: string) {
  let waarde = verzoek.headers[header];
  if (Array.isArray(waarde)) {
    waarde = waarde.join("");
  }

  return waarde ? waarde.trim() : null;
}

function getStatus(labels: string[]): null | typeof EPIC_STATUSSEN[number] {
  for (const status of EPIC_STATUSSEN) {
    if (labels.includes(status)) {
      return status;
    }
  }
  return null;
}