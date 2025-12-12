import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = req.headers.get("X-GitHub-Event");
    console.log(`Received GitHub webhook event: ${event}`);

    if (event === "ping") {
      return NextResponse.json({ mesage: "pong" }, { status: 200 });
    }

    return NextResponse.json({ message: "Event received" }, { status: 200 });
    // handle diffrrent webhook events
  } catch (error) {
    console.error("Error handling GitHub webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
