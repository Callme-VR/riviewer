import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json(
      { error: "Failed to sign out" },
      { status: 500 }
    );
  }
}

// reviewer\.next\dev\server\chunks\ssr\_816ce1c6._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed