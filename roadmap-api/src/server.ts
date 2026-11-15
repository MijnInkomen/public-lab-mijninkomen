import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { valideerWebhookEvent,valideerWebhookSignature, verzoekGitHubData, type githubFeatureType, type githubResponseType } from './github.ts';
import { leesOpslag, slaOp, type epicType, type featureType, type jsonOpslageType } from './opslag.ts';

const MAX_GROOTTE = 16 * 1024;

export function maakServer() {
  return createServer(async (verzoek, antwoord) => {
    const pad = new URL(verzoek.url ?? '/', 'http://localhost').pathname.slice(12);
    try {
      switch (pad) {
        case "/publiek/huidig":
        case "/publiek/toekomstig":
          const json = await leesOpslag();
          const type = pad.slice(9) as "huidig" | "toekomstig";
          return stuurJson(antwoord, 200, json.publiek[type]);
        
        case "/update":
          await verwerkUpdateVerzoek(antwoord);
          return;
        
        // TEMP ENDPOINT FOR CHECKING
        case "/update-failed":
          console.log("Failed update");
          stuurStatus(antwoord, 500);
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
          await verwerkUpdateVerzoek(antwoord);
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
  // Log geen aanvraag: daar staan persoonsgegevens in.
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

type roadmapType = jsonOpslageType["community"];
function verwerkGithubResponse(response: githubResponseType["repository"]): roadmapType {
  const epics: epicType[] = [];
  for (const epic of response.epics.nodes) {
    const epicInfo = vertaalGitHubIssue(epic);
    const features = epic.subIssues.nodes.map((feature) => vertaalGitHubIssue(feature));

    epics.push({
      ...epicInfo,
      features
    });
  }
  
  return {roadmap: epics};
}

function vertaalGitHubIssue(issue: githubFeatureType): featureType {
  return {
    title: issue.title,
    description: issue.body,
    labels: issue.labels.nodes.map((label) => label.name),
    status: issue.status?.name || "Geen status",
  };
}

async function verwerkUpdateVerzoek(antwoord: ServerResponse) {
  const result = await verzoekGitHubData();
  if (!result) {
    stuurStatus(antwoord, 500);
    return;
  }

  const verwerkteEpics = verwerkGithubResponse(result);
  await slaOp(verwerkteEpics);
  console.log("Succesfully updated");
  stuurStatus(antwoord, 200);
  return;
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