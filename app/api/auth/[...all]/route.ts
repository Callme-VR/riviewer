// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

let handlers;

try {
  handlers = toNextJsHandler(auth);
} catch (error) {
  console.error("Failed to create auth handlers:", error);
  // Fallback handlers
  handlers = {
    GET: async () => 
      NextResponse.json({ error: "Auth handler not available" }, { status: 500 }),
    POST: async () => 
      NextResponse.json({ error: "Auth handler not available" }, { status: 500 })
  };
}

export const { GET, POST } = handlers;