import { graphql } from "@octokit/graphql";

function leesInstelling(naam: string) {
  const waarde = process.env[naam];
  if (!waarde) throw new Error(`${naam} ontbreekt`);
  return waarde;
};

const authGraphql = graphql.defaults({
    headers: {
        authorization: `token ${leesInstelling("GITHUB_AUTH_TOKEN")}`,
    }
})

export async function updateData() {
    try {
        const config = {
            owner: leesInstelling("GITHUB_REPO_OWNER"),
            repo: leesInstelling("GITHUB_REPO_NAME"),
        }
        const response = await authGraphql(`
            query {
                repository(owner:"${config.owner}", name:"${config.repo}") {
                    Features: issues(first: 20) {
                        edges {
                            node {
                                ...issueInfo
                                subIssues(first: 20) {
                                    nodes {
                                        ...issueInfo
                                    }
                                }
                            }
                        }
                    }
                }
            }

            fragment issueInfo on Issue {
                title
                body
                issueType {
                    name
                }
                labels(first: 20) {
                    nodes {
                        name
                    }
                }
                status {
                    name
                }
            }
        `,);

        process.stdout.write(JSON.stringify(response) + "\n");
        // const json = parseGithubJson(response["data"]);
    } catch (error) {
        console.error(error);
    }
}
