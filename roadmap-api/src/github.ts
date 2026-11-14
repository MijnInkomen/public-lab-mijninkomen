import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

function leesInstelling(naam: string) {
  const waarde = process.env[naam];
  if (!waarde) {
    throw new Error(`${naam} ontbreekt`)!
  }
  return waarde;
};

const myOctokit = Octokit.plugin(paginateGraphQL);
const octokit = new myOctokit({ auth: leesInstelling("GITHUB_AUTH_TOKEN")})

export type githubFeatureType = {
  title: string,
  body: string,
  labels: {
    nodes: {name: string}[]
  },
  status: null | {name: string}
}
export type githubEpicType = githubFeatureType & {
  subIssues: {
    nodes: githubFeatureType[]
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
    }
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
