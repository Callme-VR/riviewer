"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { polarClient } from "../config/polar";
import prisma from "@/lib/db";
import { getRemainingLimits, updateUserTier, UserLimits } from "../subscriptions";

export interface SubscriptionData {
  user: {
    id: string;
    name: string;
    email: string;
    polarCustomerId: string | null;
    subscriptionStatus: string | null;
    subscriptionTier: string | null;
    polarSubscriptionId: string | null;
  } | null;
  limits: UserLimits | null;
}

export async function GetSubscriptionData(): Promise<SubscriptionData> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { user: null, limits: null };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  if (!user) {
    return { user: null, limits: null };
  }

  const limits = await getRemainingLimits(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      polarCustomerId: user.PolarCustomerId,
      subscriptionStatus: user.subscriptionStatus || null,
      subscriptionTier: user.subscriptionsTier || null,
      polarSubscriptionId: user.PolarSubscriptionId || null,
    },
    limits
  };
}

export async function syncSubscriptionStatus() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Not authenticated");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    });

    if (!user || !user.PolarCustomerId) {
        return { success: false, message: "No Polar customer ID found" };
    }

    try {
        console.log("Sync: Fetching subscriptions from Polar for customer:", user.PolarCustomerId);
        
        // Fetch subscriptions from Polar
        const result = await polarClient.subscriptions.list({
            customerId: user.PolarCustomerId,
        });

        const subscriptions = result.result?.items || [];
        console.log("Sync: Found subscriptions:", subscriptions.length);

        // Find the most relevant subscription (active or most recent)
        const activeSub = subscriptions.find((sub) => sub.status === 'active');
        const latestSub = subscriptions[0]; // Assuming API returns sorted or we should sort

        if (activeSub) {
            console.log("Sync: Found active subscription, updating to PRO");
            await updateUserTier(user.id, "PRO", "ACTIVE", activeSub.id);
            return { success: true, status: "ACTIVE" };
        } else if (latestSub) {
            console.log("Sync: No active subscription, checking latest:", latestSub.status);
            // If latest is canceled/expired
            const status = latestSub.status === 'canceled' ? 'CANCELLED' : 'EXPIRED';
            // Only downgrade if we are sure it's not active
            if (latestSub.status !== 'active') {
                console.log("Sync: Downgrading to FREE with status:", status);
                await updateUserTier(user.id, "FREE", status, latestSub.id);
            }
            return { success: true, status };
        }
        console.log("Sync: No subscriptions found");
        return { success: true, status: "NO_SUBSCRIPTION" };
    } catch (error) {
        console.error("Sync: Failed to sync subscription:", error);
        return { success: false, error: "Failed to sync with Polar" };
    }
}