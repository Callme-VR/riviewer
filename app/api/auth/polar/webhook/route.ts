import { NextRequest, NextResponse } from "next/server";
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Create Next.js handler for better-auth
const { POST: authPost } = toNextJsHandler(auth);

// This route handles Polar webhooks by forwarding to the better-auth handler
export async function POST(req: NextRequest) {
  try {
    // Forward the request to the better-auth handler which processes webhooks
    return authPost(req);
  } catch (error) {
    console.error("Error forwarding Polar webhook to better-auth:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
