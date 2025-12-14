
"use server"

import { inngest } from "@/inngest/client"
import prisma from "@/lib/db"
import { getPullRequestDiff } from "@/module/github/lib/github"

export async function reviewPullRequest(owner: string, repo: string, prNumber: number) {

     try {

          const respository = await prisma.repository.findFirst({
               where: {
                    owner,
                    name: repo
               },
               include: {
                    user: {
                         include: {
                              accounts: {
                                   where: {
                                        providerId: "github"
                                   }
                              }
                         }
                    }
               }
          })

          if (!respository) {
               throw new Error(`Repository ${owner}/${repo} not found`)
          }
          // for fetching the repo
          const githubAccount = respository.user.accounts[0]

          if (!githubAccount?.accessToken) {
               throw new Error(`User ${respository.user.id} does not have a github account`)
          }

          const Token = githubAccount.accessToken

          const { title } = await getPullRequestDiff(Token, owner, repo, prNumber)

          await inngest.send({
               name: "re.review.requested",
               data: {
                    owner,
                    repo,
                    prNumber,
                    userId: respository.user.id,
                    title,
               }
          })
     } catch (error) {
          try {
               const repository = await prisma.repository.findFirst({
                    where: { owner, name: repo }
               })
               if (repository) {
                    await prisma.review.create({
                         data: {
                              repositoryId: repository.id,
                              prNumber,
                              prTitle: "Failed to fetch",
                              prUrl: `http://github.com/${owner}/${repo}/${prNumber}`,
                              review:`Error ${error instanceof Error ? error.message : "Unknown error"}`,
                              status:"Failed"
                         }

                    })
                    
               }
          } catch (error) {
               console.error("Error creating review:", error)
          }
     }

}    