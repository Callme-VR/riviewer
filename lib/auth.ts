import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { polarClient } from "@/module/payment/config/polar";
import {
  updatePolarCustomerId,
  updateUserTier,
} from "@/module/payment/subscriptions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: ["repo"],
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "d9d95dc0-2f60-4156-9044-c626df50ae1d",
              slug: "Coder", // Custom slug for easy reference in Checkout URL, e.g. /checkout/CodeReview
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal({
          returnUrl:
            process.env.NEXT_PUBLIC_BASE_APP_URL ||
            "http://localhost:3000/dashboard",
        }),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onSubscriptionActive: async (payload) => {
            const subscriptionId = payload.data.id;
            const customerId = payload.data.customerId;
            
            // Find user by PolarCustomerId
            const user = await prisma.user.findUnique({
              where: {
                PolarCustomerId: customerId,
              },
            });
            
            if (user) {
              // Update user tier to PRO with ACTIVE status
              await updateUserTier(user.id, "PRO", "ACTIVE", subscriptionId);
            }
          },
          onSubscriptionCanceled: async (payload) => {
            const subscriptionId = payload.data.id;
            const customerId = payload.data.customerId;
            
            // Find user by PolarCustomerId
            const user = await prisma.user.findUnique({
              where: {
                PolarCustomerId: customerId,
              },
            });
            
            if (user) {
              // Update user tier to FREE with CANCELLED status
              await updateUserTier(user.id, "FREE", "CANCELLED", subscriptionId);
            }
          },
          onSubscriptionRevoked: async (payload) => {
            const subscriptionId = payload.data.id;
            const customerId = payload.data.customerId;
            
            // Find user by PolarCustomerId
            const user = await prisma.user.findUnique({
              where: {
                PolarCustomerId: customerId,
              },
            });
            
            if (user) {
              // Update user tier to FREE with EXPIRED status
              await updateUserTier(user.id, "FREE", "EXPIRED", subscriptionId);
            }
          },
        //   onOrderPaid: async (payload) => {
        //     // Handle order paid event if needed
        //     console.log("Order paid:", payload.data.id);
        //   },
          onCustomerCreated: async (payload) => {
            const customerId = payload.data.id;
            const customerEmail = payload.data.email;
            
            // Find user by email
            const user = await prisma.user.findUnique({
              where: {
                email: customerEmail,
              },
            });
            
            if (user) {
              // Update user with PolarCustomerId
              await updatePolarCustomerId(user.id, customerId);
            }
          },
        }),
      ],
    }),
  ],
});