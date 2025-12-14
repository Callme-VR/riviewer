import { getPullRequestDiff, postreviewComment } from "@/module/github/lib/github";
import { inngest } from "../client";
import { retriveContextContent } from "@/module/ai/lib/rag";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import prisma from "@/lib/db";

export const generateReview = inngest.createFunction(
     { id: "generate-Review", concurrency: 5 },
     { event: "pr.review.requested" },

     async ({ event, step }) => {
          console.log("Generate review function triggered", event.data);
          
          const { owner, repo, prNumber, Token: eventToken, userId, title: eventTitle } = event.data;

          const { diff, title, description, token } = await step.run(
               "fetch-pr-data",
               async () => {
                    console.log("Fetching PR data", { owner, repo, prNumber });
                    // First try to use the token from the event
                    if (eventToken) {
                         const prData = await getPullRequestDiff(eventToken, owner, repo, prNumber);
                         return { 
                              ...prData, 
                              token: eventToken 
                         };
                    }
                    
                    // Fallback to getting token from database
                    const account = await prisma.account.findFirst({
                         where: {
                              userId: userId,
                              providerId: "github",
                         },
                    });

                    if (!account?.accessToken) {
                         throw new Error("No GitHub access token found for user");
                    }

                    const prData = await getPullRequestDiff(account.accessToken, owner, repo, prNumber);
                    return { 
                         ...prData, 
                         token: account.accessToken 
                    };
               }
          );

          const context = await step.run("retrive-Context", async () => {
               const query = `${title}\n${description}`;
               console.log("Retrieving context", { query, repoIdentifier: `${owner}/${repo}` });
               return await retriveContextContent(query, `${owner}/${repo}`);
          });

          const review = await step.run("generate-ai-review", async () => {
               const prompt = `You are an expert code reviewer. Analyze the following pull request and provide a detailed, constructive code review.

PR Title: ${title}
PR Description: ${description || "No description provided"}

Context from Codebase:
${context.join("\n\n")}

Code Changes:
\`\`\`diff
${diff}
\`\`\`

Please provide:
1. **Walkthrough**: A file-by-file explanation of the changes.
2. **Sequence Diagram**: A Mermaid JS sequence diagram visualizing the flow of the changes (if applicable).
3. **Summary**: Brief overview.
4. **Strengths**: What's done well.
5. **Issues**: Bugs, security concerns, code smells.
6. **Suggestions**: Specific code improvements.
7. **Poem**: A short, creative poem summarizing the changes at the very end.

Format your response in markdown.`;

               console.log("Generating AI review with prompt length", prompt.length);
               
               // Check if Google API key is set
               if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
                    console.error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
                    throw new Error("Google AI API key is not configured");
               }
               
               const { text } = await generateText({
                    model: google("gemini-2.5-flash"),
                    prompt
               });

               console.log("AI review generated successfully", { textLength: text.length });
               return text;
          });

          await step.run("post-comment", async () => {
               console.log("Posting review comment to GitHub");
               await postreviewComment(token, owner, repo, prNumber, review);
          });

          await step.run("save-review", async () => {
               const repository = await prisma.repository.findFirst({
                    where: {
                         owner,
                         name: repo
                    }
               });

               if (!repository) {
                    throw new Error(`Repository ${owner}/${repo} not found in database`);
               }

               await prisma.review.create({
                    data: {
                         repositoryId: repository.id,
                         prNumber,
                         prTitle: title,
                         prUrl: `https://github.com/${owner}/${repo}/pull/${prNumber}`,
                         review,
                         status: "completed"
                    }
               });
          });

          console.log("Review generation completed successfully");
          return { success: true };
     }
);