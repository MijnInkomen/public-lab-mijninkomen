import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { valideerWebhookEvent,valideerWebhookSignature, verzoekGitHubData, type githubFeatureType, type githubResponseType } from './github.ts';
import { Opslag, type epicType, type featureType } from './opslag.ts';

const MAX_GROOTTE = 25 * 1024 * 1024;

export function maakServer(opslag: Opslag) {
  return createServer(async (verzoek, antwoord) => {
    const url = new URL(verzoek.url ?? '/', 'http://localhost');
    const pad = url.pathname.slice(12, url.pathname.at(-1) === "/" ? -1 : undefined);
    try {
      switch (pad) {
        case "/publiek/huidig":
        case "/publiek/toekomstig":
          const type = pad.slice(9) as "huidig" | "toekomstig";
          const epics = await opslag.haalIssuesOp(type);
          return stuurJson(antwoord, 200, epics);
        
        case "/update":
          await (async () => {
            const result = await verwerkUpdateVerzoek(opslag);
            stuurStatus(antwoord, result ? 200 : 500);
          })();
          return;

        case "/webhook":
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

        default:
          return stuurJson(antwoord, 404, { fout: 'Niet gevonde '});
      }
    } catch (fout) {
      return stuurFout(antwoord, fout);
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
    const epicInfo = vertaalGitHubIssue(epic);
    console.log(epicInfo)
    const features = epic.subIssues.nodes.map((feature) => vertaalGitHubIssue(feature));

    epics.push({
      ...epicInfo,
      features
    });
  }
 
  console.log(epics)
  return epics;
}

function vertaalGitHubIssue(issue: githubFeatureType): featureType {
  return {
    title: issue.title,
    description: issue.body,
    labels: issue.labels.nodes.map((label) => label.name),
    isOpen: issue.state === "OPEN",
    status: null,
    gebruikers: [],
  };
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