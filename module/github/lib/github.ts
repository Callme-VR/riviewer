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
  const webHookUrl = `${process.env.NEXT_PUBLIC_BASE_APP_URL}/api/webhooks/github`;

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
  const webhooksUrl = `${process.env.NEXT_PUBLIC_BASE_APP_URL}/api/webhooks/github`;

  try {
    const { data: hooks } = await octokit.rest.repos.listWebhooks({
      owner, repo
    });

    const hooktoDelete = hooks.find(hooks => hooks.config.url === "webHookUrl")

    if (hooktoDelete) {
      await octokit.rest.repos.deleteWebhook({
        owner, repo, hook_id: hooktoDelete.id
      })
      return true
    }
    return false;
  } catch (error) {
    console.error("Error deleting webhook:", error);
    return false;
  }

}