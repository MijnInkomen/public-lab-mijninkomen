import { Octokit } from "octokit";

function leesInstelling(naam: string) {
  const waarde = process.env[naam];
  if (!waarde) throw new Error(`${naam} ontbreekt`);
  return waarde;
};

const octokit = new Octokit({
    auth: leesInstelling("GITHUB_AUTH_TOKEN")
});

export async function updateData() {
    try {
        const config = {
            owner: leesInstelling("GITHUB_REPO_OWNER"),
            repo: leesInstelling("GITHUB_REPO_NAME"),
        }
        const result = await octokit.request("GET /repos/{owner}/{repo}/issues", config);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
