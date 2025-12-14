import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { IndexCodeBase } from "@/module/ai/lib/rag";
import { getRepoFileContent } from "@/module/github/lib/github";

export const indexRepo = inngest.createFunction(
     {
          id: "index-repo",
     },
     { event: "repository-connnected" },
     async ({ event, step }) => {
          const { owner, userId, repo } = event.data;

          // fetch all files 

          const files = await step.run("fetch-files", async () => {
               const account = await prisma.account.findFirst({
                    where: {
                         userId: userId,
                         providerId: "github"
                    },
               })
               if (!account?.accessToken) {
                    throw new Error("No access token found")
               }

               return await getRepoFileContent(account.accessToken, owner, repo)
          })

          await step.run("index-codebase", async () => {
               await IndexCodeBase(`${owner}/${repo}`, files)
          })

          return { success: true, indexFiles: files.length }


     }

)    