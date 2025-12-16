// lib/auth-client.ts - Better-auth client integration
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://riviewer.vercel.app"
});

export const {
  signIn,
  signUp,
  signOut,
  useSession
} = authClient;