import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getRemainingLimits } from "@/module/payment/subscriptions";

export async function GET(request: Request) {
  try {
    // Check if we're in a static generation context
    let reqHeaders;
    try {
      reqHeaders = await headers();
    } catch (error) {
      // If headers() fails during static generation, return unauthorized
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const limits = await getRemainingLimits(session.user.id);
    
    return NextResponse.json({
      tier: limits.tier,
      limits: limits,
    });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
}