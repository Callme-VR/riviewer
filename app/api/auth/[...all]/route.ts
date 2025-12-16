// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

let handlers;

try {
  console.log("Initializing auth handlers...");
  console.log("Environment check:", {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? "SET" : "MISSING",
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ? "SET" : "MISSING",
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "SET" : "MISSING",
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  });
  handlers = toNextJsHandler(auth);
  console.log("Auth handlers initialized successfully");
} catch (error) {
  console.error("Failed to create auth handlers:", error);
  // Fallback handlers
  handlers = {
    GET: async () => 
      NextResponse.json({ error: "Auth handler not available", details: error instanceof Error ? error.message : String(error) }, { status: 500 }),
    POST: async () => 
      NextResponse.json({ error: "Auth handler not available", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  };
}

export const { GET, POST } = handlers;