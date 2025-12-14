import { pinecodeIndex } from "@/lib/pinecone";

import { embed } from "ai"
import { google } from "@ai-sdk/google";

export async function GenerateEmbedding(text: string) {
     const { embedding } = await embed({
          model: google.textEmbedding("text-embedding-004"),
          value: text
     })

     return embedding;
}



export async function IndexCodeBase(repoId: string, files: { path: string, content: string }[]) {

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
               await pinecodeIndex.upsert(batch)
          }
     }
     console.log("Indexing completed")



}

export async function retriveContextContent(query: string, repoId: string, topK: number = 5) {
     const embedding = await GenerateEmbedding(query)

     const results = await pinecodeIndex.query({
          vector: embedding,
          filter: { repoId },
          topK,
          includeMetadata: true
     })

     return results.matches.map(match => match.metadata?.content as string).filter(Boolean);
}