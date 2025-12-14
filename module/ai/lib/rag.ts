import { pinecodeIndex } from "@/lib/pinecone";

import { embed } from "ai"
import { google } from "@ai-sdk/google";

export async function GenerateEmbedding(text: string) {
     console.log("Generating embedding for text length:", text.length);
     const { embedding } = await embed({
          model: google.textEmbedding("text-embedding-004"),
          value: text
     })

     console.log("Embedding generated successfully");
     return embedding;
}


export async function IndexCodeBase(repoId: string, files: { path: string, content: string }[]) {
     console.log("Indexing codebase", { repoId, fileCount: files.length });

     const vectors = [];

     for (const file of files) {
          const content = `File:${file.path}\n\n${file.content}`
          const truncatedContent = content.slice(0, 8000);
          try {
               const embedding = await GenerateEmbedding(truncatedContent);

               vectors.push({
                    id: `${repoId}-${file.path.replace(/\//g, "_")}`,
                    values: embedding,
                    metadata: {
                         repoId,
                         path: file.path,
                         content: truncatedContent

                    }
               })
          } catch (error) {
               console.log(`Failed To embed:${file.path}:`, error)

          }

     }
     if (vectors.length > 0) {
          const batchsize = 100;
          for (let i = 0; i < vectors.length; i += batchsize) {
               const batch = vectors.slice(i, i + batchsize);
               console.log("Upserting batch to Pinecone", { batchSize: batch.length });
               await pinecodeIndex.upsert(batch)
          }
     }
     console.log("Indexing completed")


}

export async function retriveContextContent(query: string, repoId: string, topK: number = 5) {
     console.log("Retrieving context content", { query, repoId, topK });
     
     // Return empty array if Pinecone is not configured
     if (!process.env.PINECONE_API_KEY) {
          console.warn("Pinecone API key not set, returning empty context");
          return [];
     }
     
     try {
          const embedding = await GenerateEmbedding(query)

          const results = await pinecodeIndex.query({
               vector: embedding,
               filter: { repoId },
               topK,
               includeMetadata: true
          })

          const context = results.matches.map(match => match.metadata?.content as string).filter(Boolean);
          console.log("Context retrieved successfully", { matchCount: context.length });
          return context;
     } catch (error) {
          console.error("Error retrieving context from Pinecone:", error);
          return []; // Return empty array on error to prevent breaking the review process
     }
}