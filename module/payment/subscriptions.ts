"use server";

import prisma from "@/lib/db";

export type SubscriptionsTier = "FREE" | "PRO" | "ENTERPRISE";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";

// limit tracking of the users

export interface UserLimits {
  tier: SubscriptionsTier;
  repositories: {
    current: number;
    limit: number | null;
    canAdd: boolean;
  };
  reviews: {
    [repositoryId: string]: {
      current: number;
      limit: number | null;
      canAdd: boolean;
    };
  };
}

// for user limits how many times user use it features

const TIER_LIMITS = {
  FREE: {
    repositories: 10,
    reviewsPerRepo: 10,
  },
  PRO: {
    repositories: null,
    reviewsPerRepo: null,
  },
} as const;

export async function getUserTier(userId: string): Promise<SubscriptionsTier> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      subscriptionsTier: true,
    },
  });
  return (user?.subscriptionsTier as SubscriptionsTier) || "FREE";
}

async function getUserUsage(userId: string) {
  let usage = await prisma.userUsage.findUnique({
    where: {
      userId,
    },
  });

  if (!usage) {
    usage = await prisma.userUsage.create({
      data: {
        userId,
        repositoryCount: 0,
        reviewCount: {},
      },
    });
  }

  return usage;
}

export async function CanConnectRepository(userId: string): Promise<boolean> {
  const tier = await getUserTier(userId);
  if (tier === "PRO") {
    return true; /*unlimited for the pro users*/
  }

  const usage = await getUserUsage(userId);
  const limit = TIER_LIMITS.FREE.repositories;
  return usage.repositoryCount < limit;
}

export async function CanCreateReviews(
  userId: string,
  repositoryId: string
): Promise<boolean> {
  const tier = await getUserTier(userId);
  if (tier === "PRO") {
    return true;
  }

  const usage = await getUserUsage(userId);
  const reviewCounts = usage.reviewCount as Record<string, number>;
  const currentCount = reviewCounts[repositoryId] || 0;
  const limit = TIER_LIMITS.FREE.reviewsPerRepo;
  return currentCount < limit;
}

export async function IncrementRepoCount(userId: string): Promise<void> {
  await prisma.userUsage.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      repositoryCount: 1,
      reviewCount: {},
    },

    update: {
      repositoryCount: {
        increment: 1,
      },
    },
  });
}

export async function DecrementRepoCount(userId: string): Promise<void> {
  const usage = await getUserUsage(userId);
  await prisma.userUsage.update({
    where: {
      userId,
    },
    data: {
      repositoryCount: Math.max(0, usage.repositoryCount - 1),
    },
  });
}

// for counting the review of user usage

export async function IncrementReviewCount(
  userId: string,
  repositoryId: string
): Promise<void> {
  const usage = await getUserUsage(userId);

  const reviewCounts = usage.reviewCount as Record<string, number>;

  reviewCounts[repositoryId] = (reviewCounts[repositoryId] || 0) + 1;

  await prisma.userUsage.update({
    where: { userId },
    data: {
      reviewCount: reviewCounts,
    },
  });
}

export async function getRemainingLimits(userId: string): Promise<UserLimits> {
  const tier = await getUserTier(userId);
  const usage = await getUserUsage(userId);
  const reviewCounts = usage.reviewCount as Record<string, number>;

  const limits: UserLimits = {
    tier,
    repositories: {
      current: usage.repositoryCount,
      limit: tier === "PRO" ? null : TIER_LIMITS.FREE.repositories,
      canAdd:
        tier === "PRO" ||
        usage.repositoryCount < (TIER_LIMITS.FREE.repositories || 0),
    },
    reviews: {},
  };

  // get all user repositories
  const repositories = await prisma.repository.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  // calculate limit for each repository
  for (const repo of repositories) {
    const currentCount = reviewCounts[repo.id] || 0;
    limits.reviews[repo.id] = {
      current: currentCount,
      limit: tier === "PRO" ? null : TIER_LIMITS.FREE.reviewsPerRepo,
      canAdd:
        tier === "PRO" || currentCount < (TIER_LIMITS.FREE.reviewsPerRepo || 0),
    };
  }

  return limits;
}

export async function updateUserTier(
  userId: string,
  tier: SubscriptionsTier,
  status: SubscriptionStatus
): Promise<void> {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      subscriptionStatus: status,
      subscriptionsTier: tier,
    },
  });
  // todo for the polar subscription payments
}
