import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { valideerWebhookEvent,valideerWebhookSignature, verzoekGitHubData, type githubFeatureType, type githubResponseType } from './github.ts';
import { leesOpslag, slaOp, type epicType, type featureType, type jsonOpslageType } from './opslag.ts';

const MAX_GROOTTE = 25 * 1024 * 1024;

export function maakServer() {
  return createServer(async (verzoek, antwoord) => {
    const url = new URL(verzoek.url ?? '/', 'http://localhost');
    const pad = url.pathname.slice(12, url.pathname.at(-1) === "/" ? -1 : undefined);
    try {
      switch (pad) {
        case "/publiek/huidig":
        case "/publiek/toekomstig":
          const json = await leesOpslag();
          if (!json) {
            return stuurJson(antwoord, 200, []);
          }
          const type = pad.slice(9) as "huidig" | "toekomstig";
          return stuurJson(antwoord, 200, json.publiek[type]);
        
        case "/update":
          await verwerkUpdateVerzoek(antwoord);
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

function verwerkGithubResponse(response: githubResponseType["repository"]): jsonOpslageType {
  const roadmap: epicType[] = [];
  const publiek: jsonOpslageType["publiek"] = {
    huidig: [],
    toekomstig: [],
  };

  for (const epic of response.epics.nodes) {
    const epicInfo = vertaalGitHubIssue(epic);
    const features = epic.subIssues.nodes.map((feature) => vertaalGitHubIssue(feature));
    if (epicInfo.labels.includes("publiek")) {
      publiek[epicInfo.isOpen ? "toekomstig" : "huidig"].push({
        title: epicInfo.title,
        heading: epicInfo.title,
        description: epicInfo.description,
        status: epicInfo.status,
        gebruikers: ["Alle gemeenten"],
      });
    }

    roadmap.push({
      ...epicInfo,
      features
    });
  }
 
  return {
    publiek,
    community: {roadmap}
  };
}

function vertaalGitHubIssue(issue: githubFeatureType): featureType {
  return {
    title: issue.title,
    description: issue.body,
    labels: issue.labels.nodes.map((label) => label.name),
    status: issue.status?.name || "Geen status",
    isOpen: issue.state === "OPEN",
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