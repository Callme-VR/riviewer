import { reviewPullRequest } from "@/module/ai/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = req.headers.get("X-GitHub-Event");
    console.log(`Received GitHub webhook event: ${event}`, body);

    if (event === "ping") {
      return NextResponse.json({ message: "pong" }, { status: 200 }); // Fixed typo in "message"
    }
    if (event === "pull_request") {
      const action = body.action;
      const repo = body.repository;
      
      if (!repo) {
        throw new Error("Repository information not found in webhook payload");
      }
      
      const prNumber = body.number;
      const owner = repo.owner?.login || repo.owner?.name;
      const repoName = repo.name;
      
      if (!owner || !repoName) {
        throw new Error("Could not determine repository owner or name");
      }

      // Log the action being processed
      console.log(`Processing pull request action: ${action}`, { owner, repoName, prNumber });

      if (action === "opened" || action === "synchronized") {
        reviewPullRequest(owner, repoName, prNumber)
          .then(() => {
            console.log(`Review Completed For ${repoName} # ${prNumber}`) // Fixed variable reference
          }).catch((error) => {
            console.error(`Failed to review pull request for ${repoName} # ${prNumber}: ${error}`);
          });
      }
    }

    return NextResponse.json({ message: "Event received" }, { status: 200 });
  } catch (error) {
    console.error("Error handling GitHub webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}