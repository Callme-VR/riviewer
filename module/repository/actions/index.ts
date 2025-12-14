"use server";

import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createWebHook, getRepositories } from "@/module/github/lib/github";
import { headers } from "next/headers";

export const fetchrepositories = async (
  page: number = 1,
  perPage: number = 10
) => {
  try {
    // currently logged user data
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { error: "Unauthorized", status: 401 };
    }

    const githubrepos = await getRepositories(page, perPage);

    const dbrepos = await prisma.repository.findMany({
      where: {
        userId: session.user.id,
      },
    });

    const connectedreposids = new Set(dbrepos.map((repo) => repo.githubId));

    const filteredRepos = githubrepos.filter(
      (repo) => !connectedreposids.has(BigInt(repo.id))
    );

    return {
      data: githubrepos.map((repo) => ({
        ...repo,
        isConnected: connectedreposids.has(BigInt(repo.id)),
      })),
      nextPage: page + 1,
      hasNextPage: filteredRepos.length > 0,
    };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return { error: "Failed to fetch repositories", status: 500 };
  }
};

export const connectrepository = async (
  owner: string,
  repo: string,
  githubId: number,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return { error: "Unauthorized", status: 401 };
    }

    // todo:Check if the  user can connect more repos

    const webhooks = await createWebHook(owner, repo);

    if (webhooks) {
      await prisma.repository.create({
        data: {
          githubId: BigInt(githubId),
          name: repo,
          owner: owner,
          url: `https://github.com/${owner}/${repo}`,
          userId: session.user.id,
        },
      });
    }

    // todo:increment repository count for the user
    // todo: trigger repository sync and indexing

    try {
      await inngest.send({
        name: "repository-connnected",
        data: {
          owner,
          repo,
          userId: session.user.id
        }

      })
    } catch (error) {
      console.log("Failed to  Trigger Indexing", error)
    }





    return webhooks
  } catch (error) {
    console.error("Error connecting repository:", error);
    return { error: "Failed to connect repository", status: 500 };
  }

};
