import type { IncomingMessage } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";
import SmeeClient from "smee-client";

const ALLOWED_EVENTS = new Set(["workflow_job", "issues"]);
const ISSUE_EVENT_ACTIONS = ["opened", "closed", "status_changed"];

function leesInstelling(naam: string) {
  const waarde = process.env[naam];
  if (!waarde) {
    throw new Error(`${naam} ontbreekt`);
  }
  return waarde;
};

const myOctokit = Octokit.plugin(paginateGraphQL);
const octokit = new myOctokit({ auth: leesInstelling("GITHUB_AUTH_TOKEN")})

export type githubFeatureType = {
  title: string,
  body: string,
  labels: {
    nodes: {name: string}[],
  },
  status: null | {name: string},
  state: "OPEN" | "CLOSED";
}
export type githubEpicType = githubFeatureType & {
  subIssues: {
    nodes: githubFeatureType[],
  }
}
export type githubResponseType = {
  repository: {
    epics: {
      nodes: githubEpicType[],
      pageInfo: {
        hasNextPage: boolean,
        endCursor: string,
      }
    }
  }
};

export async function verzoekGitHubData() {
  try {
    const config = {
      owner: leesInstelling("GITHUB_REPO_OWNER"),
      repo: leesInstelling("GITHUB_REPO_NAME"),
      
      // maximale aantal features die per epic worden opgehaald
      FEATURE_MAX_COUNT: 20,

      // maximale aantal labels die per issue (feature of epic) worden opgehaald
      LABEL_MAX_COUNT: 10,
    };
    const response: githubResponseType = await octokit.graphql.paginate(
      `
      query($cursor: String) {
        repository(owner:"${config.owner}", name:"${config.repo}") {
          epics: issues(first: 20, filterBy: {type: "Epic"}, after: $cursor) {
            nodes {
              ...issueInfo
              subIssues(first: ${config.FEATURE_MAX_COUNT}) {
                nodes {
                  ...issueInfo
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }

      fragment issueInfo on Issue {
        title
        body
        labels(first: ${config.LABEL_MAX_COUNT}) {
          nodes {
            name
          }
        }
        status {
          name
        }
        state
      }
      `
    ,);

    process.stdout.write(JSON.stringify(response) + "\n");
    if ("repository" in response) {
      return response["repository"];
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

export function valideerWebhookSignature(verzoek: IncomingMessage, body: Buffer) {
  const sendSignature = verzoek.headersDistinct["x-hub-signature-256"]?.join("") || "";
  if (!sendSignature.startsWith("sha256=")) {
    return false;
  }
  const sendBuffer = Buffer.from(sendSignature.slice("sha256=".length), "hex");
  if (sendBuffer.byteLength !== 32) {
    return false;
  }
  
  const hmac = createHmac("sha256", leesInstelling("GITHUB_WEBHOOK_SECRET"));
  
  const mySignature = hmac.update(body).digest("hex");
  const myBuffer = Buffer.from(mySignature, "hex");

  return timingSafeEqual(myBuffer, sendBuffer);
}

export function valideerWebhookEvent(verzoek: IncomingMessage, body: Buffer) {
  const eventType = verzoek.headersDistinct["x-github-event"]?.join("") || "";
  if (!ALLOWED_EVENTS.has(eventType)) {
    return false;
  }

  const json = JSON.parse(body.toString());
  const { action } = json;
  if (eventType === "workflow_job") {
    return action === "completed";
  }

  const { issue } = json;
  if (!ISSUE_EVENT_ACTIONS.includes(action)) {
    return false;
  }

  const issueType = issue?.type?.name;
  return issueType === "Feature" || issueType === "Epic";
}

// ONLY FOR DEVELOPMENT
const smee = new SmeeClient({
  source: "https://smee.io/BqUFFSGFHkfkewF", // Smee client link
  target: "http://localhost:4000/api/roadmap/webhook",
  logger: console,
});

(async () => {
  const events = await smee.start();
  console.log("Development webhook server geintialiseert");
})();
