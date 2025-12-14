"use server";

import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { getPullRequestDiff } from "@/module/github/lib/github";
import {
  CanCreateReviews,
  IncrementReviewCount,
} from "@/module/payment/subscriptions";

export async function reviewPullRequest(
  owner: string,
  repo: string,
  prNumber: number
) {
  try {
    console.log("Starting reviewPullRequest", { owner, repo, prNumber });

    const respository = await prisma.repository.findFirst({
      where: {
        owner,
        name: repo,
      },
      include: {
        user: {
          include: {
            accounts: {
              where: {
                providerId: "github",
              },
            },
          },
        },
      },
    });

    if (!respository) {
      console.error(`Repository ${owner}/${repo} not found`);
      throw new Error(`Repository ${owner}/${repo} not found`);
    }

    const canCreateReviews = await CanCreateReviews(
      respository.user.id,
      respository.id
    );
    if (!canCreateReviews) {
      throw new Error(
        "You have reached your review limit please upgrade for more and unlimited usage"
      );
    }

    // for fetching the repo
    const githubAccount = respository.user.accounts[0];

    if (!githubAccount?.accessToken) {
      console.error(
        `User ${respository.user.id} does not have a github account`
      );
      throw new Error(
        `User ${respository.user.id} does not have a github account`
      );
    }

    const Token = githubAccount.accessToken;

    const { title } = await getPullRequestDiff(Token, owner, repo, prNumber);

    console.log("Sending event to Inngest", {
      eventName: "pr.review.requested",
      owner,
      repo,
      prNumber,
      userId: respository.user.id,
      title,
    });

    await inngest.send({
      name: "pr.review.requested",
      data: {
        owner,
        repo,
        prNumber,
        userId: respository.user.id,
        Token: githubAccount.accessToken,
        title,
      },
    });

    //     for subscription reviwcount measures calling function  here
    await IncrementReviewCount(respository.user.id, respository.id);

    console.log("Successfully sent event to Inngest");
  } catch (error) {
    console.error("Error in reviewPullRequest:", error);
    try {
      const repository = await prisma.repository.findFirst({
        where: { owner, name: repo },
      });
      if (repository) {
        await prisma.review.create({
          data: {
            repositoryId: repository.id,
            prNumber,
            prTitle: "Failed to fetch",
            prUrl: `http://github.com/${owner}/${repo}/${prNumber}`,
            review: `Error ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
            status: "Failed",
          },
        });
      }
    } catch (error) {
      console.error("Error creating review:", error);
    }
  }
}
