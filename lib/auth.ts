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
  trustedOrigins: ["http://localhost:3000", "https://9fc244dbdff5.ngrok-free.app"],
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
          successUrl: process.env.POLAR_SUCCESS_URL || "http://localhost:3000/dashboard/subscription?success=true",
          authenticatedUsersOnly: false, // Allow checkout without forcing re-authentication
        }),
        portal({
          returnUrl:
            process.env.NEXT_PUBLIC_BASE_APP_URL ||
            "http://localhost:3000/dashboard",
        }),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET || "fallback-secret-for-development",
          onSubscriptionActive: async (payload) => {
            console.log("Webhook: Subscription activated", payload.data);
            const subscriptionId = payload.data.id;
            const customerId = payload.data.customerId;
            
            try {
              // Find user by PolarCustomerId
              const user = await prisma.user.findUnique({
                where: {
                  PolarCustomerId: customerId,
                },
              });
              
              if (user) {
                console.log("Webhook: Found user", user.id);
                // Update user tier to PRO with ACTIVE status
                await updateUserTier(user.id, "PRO", "ACTIVE", subscriptionId);
                console.log("Webhook: Updated user tier to PRO");
              } else {
                console.error("Webhook: User not found for customer ID:", customerId);
              }
            } catch (error) {
              console.error("Webhook: Error processing subscription activation:", error);
            }
          },
          onSubscriptionCanceled: async (payload) => {
            console.log("Webhook: Subscription canceled", payload.data);
            const subscriptionId = payload.data.id;
            const customerId = payload.data.customerId;
            
            try {
              // Find user by PolarCustomerId
              const user = await prisma.user.findUnique({
                where: {
                  PolarCustomerId: customerId,
                },
              });
              
              if (user) {
                console.log("Webhook: Found user for cancellation", user.id);
                // Update user tier to FREE with CANCELLED status
                await updateUserTier(user.id, "FREE", "CANCELLED", subscriptionId);
                console.log("Webhook: Updated user tier to FREE (cancelled)");
              } else {
                console.error("Webhook: User not found for customer ID:", customerId);
              }
            } catch (error) {
              console.error("Webhook: Error processing subscription cancellation:", error);
            }
          },
          onSubscriptionRevoked: async (payload) => {
            console.log("Webhook: Subscription revoked", payload.data);
            const subscriptionId = payload.data.id;
            const customerId = payload.data.customerId;
            
            try {
              // Find user by PolarCustomerId
              const user = await prisma.user.findUnique({
                where: {
                  PolarCustomerId: customerId,
                },
              });
              
              if (user) {
                console.log("Webhook: Found user for revocation", user.id);
                // Update user tier to FREE with EXPIRED status
                await updateUserTier(user.id, "FREE", "EXPIRED", subscriptionId);
                console.log("Webhook: Updated user tier to FREE (expired)");
              } else {
                console.error("Webhook: User not found for customer ID:", customerId);
              }
            } catch (error) {
              console.error("Webhook: Error processing subscription revocation:", error);
            }
          },
        //   onOrderPaid: async (payload) => {
        //     // Handle order paid event if needed
        //     console.log("Order paid:", payload.data.id);
        //   },
          onCustomerCreated: async (payload) => {
            console.log("Webhook: Customer created", payload.data);
            const customerId = payload.data.id;
            const customerEmail = payload.data.email;
            
            try {
              // Find user by email
              const user = await prisma.user.findUnique({
                where: {
                  email: customerEmail,
                },
              });
              
              if (user) {
                console.log("Webhook: Found user for customer creation", user.id);
                // Update user with PolarCustomerId
                await updatePolarCustomerId(user.id, customerId);
                console.log("Webhook: Updated user with Polar customer ID");
              } else {
                console.error("Webhook: User not found for email:", customerEmail);
              }
            } catch (error) {
              console.error("Webhook: Error processing customer creation:", error);
            }
          },
        }),
      ],
    }),
  ],
});

