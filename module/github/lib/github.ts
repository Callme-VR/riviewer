import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Octokit } from "octokit";
import prisma from "@/lib/db";

// Define interfaces for the GitHub API response
interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface GitHubUser {
  contributionsCollection: ContributionsCollection;
}

interface GitHubResponse {
  user: GitHubUser;
}

export const getGithubToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  if (!account?.accessToken) {
    throw new Error("Unauthorized");
  }

  return account?.accessToken;
};

// for usercontribution fetching from database
export const fetchUserContribution = async (
  token: string,
  userName: string
) => {
  const octokit = new Octokit({ auth: token });

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await octokit.graphql<GitHubResponse>(query, {
      username: userName,
    });

    return response.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error("Error fetching user contributions:", error);
    // Return a default structure in case of error
    return {
      totalContributions: 0,
      weeks: [],
    } as ContributionCalendar;
  }
};

export const getRepositories = async (
  page: number = 1,
  perPage: number = 10
) => {
  const token = await await getGithubToken();
  const octokit = new Octokit({ auth: token });

  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    sort: "updated",
    direction: "desc",
    visibility: "all",
    per_page: perPage,
    page: page,
  });
  return data;
};

//
export const createWebHook = async (owner: string, repo: string) => {
  const token = await getGithubToken();

  const octokit = new Octokit({ auth: token });
  // Use encodeURIComponent for more thorough encoding of special characters
  const baseUrl = process.env.NEXT_PUBLIC_BASE_APP_URL || "";
  // Remove any trailing slashes and encode the URL properly
  const cleanUrl = baseUrl.replace(/\/$/, "");
  const webHookUrl = `${cleanUrl}/api/webhooks/github`;

  const { data: hooks } = await octokit.rest.repos.listWebhooks({
    owner,
    repo,
  });

  const existingHook = hooks.find((hooks) => hooks.config.url === webHookUrl);
  if (existingHook) {
    return existingHook;
  }

  const { data } = await octokit.rest.repos.createWebhook({
    owner,
    repo,
    config: {
      url: webHookUrl,
      content_type: "json",
    },
    events: ["pull_request"]
  });
  return data;
};

export const deleteWebhook = async (owner: string, repo: string) => {
  const token = await getGithubToken();

  const octokit = new Octokit({ auth: token });
  // Use the same URL construction as in createWebHook
  const baseUrl = process.env.NEXT_PUBLIC_BASE_APP_URL || "";
  const cleanUrl = baseUrl.replace(/\/$/, "");
  const webhooksUrl = `${cleanUrl}/api/webhooks/github`;

  try {
    const { data: hooks } = await octokit.rest.repos.listWebhooks({
      owner, repo
    });

    const hooktoDelete = hooks.find(hooks => hooks.config.url === webhooksUrl)

    if (hooktoDelete) {
      await octokit.rest.repos.deleteWebhook({
        owner, repo, hook_id: hooktoDelete.id
      })
      return true
    }
    return false;
  } catch (error) {
    console.error("Error deleting webhook:", error);
    // Check if it's a 404 error (webhook not found) and treat it as success

  }

}

export async function getRepoFileContent(
  token: string,
  owner: string,
  repo: string,
  path: string = ""
): Promise<{ path: string, content: string }[]> {
  const octokit = new Octokit({ auth: token });
  const files: { path: string, content: string }[] = [];

  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
  })

  // Handle directory case - recursively fetch all files
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.type === "dir") {
        // Recursively fetch contents of subdirectory
        const subFiles = await getRepoFileContent(token, owner, repo, item.path);
        files.push(...subFiles);
      } else if (item.type === "file") {
        // Fetch individual file content
        try {
          const { data: fileData } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path: item.path,
          });

          if (!Array.isArray(fileData) && fileData.type === "file" && fileData.content) {
            // Filter out binary files
            if (!item.path.match(/\.(png|jpg|jpeg|svg|ico|pdf|zip|tar|gz|exe|dll|so|dylib)$/i)) {
              files.push({
                path: item.path,
                content: Buffer.from(fileData.content, "base64").toString("utf-8")
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching file ${item.path}:`, error);
        }
      }
    }
    return files;
  }

  // Handle single file case
  if (data.type === "file" && data.content) {
    if (!path.match(/\.(png|jpg|jpeg|svg|ico|pdf|zip|tar|gz|exe|dll|so|dylib)$/i)) {
      return [{
        path: data.path,
        content: Buffer.from(data.content, "base64").toString("utf-8")
      }];
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export async function getPullRequestDiff(token: string, owner: string, repo: string, prNumber: number) {
  const octokit = new Octokit({ auth: token });
  const { data: pr } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber
  })

  const { data: diff } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: {
      format: "diff"
    }
  })

  return {
    diff: diff as unknown as string,
    title: pr.title,
    description: pr.body,

  }
}


export async function postreviewComment(token: string, owner: string, repo: string, prNumber: number, review: string) {

  const octokit = new Octokit({ auth: token })

  await octokit.rest.issues.createComment({
    owner, repo, issue_number: prNumber,
    body: `## 🤖 AI CodeReview 

${review}

---
*Powered by The Reviewer*`
  })
} 