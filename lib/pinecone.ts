import { Pinecone } from "@pinecone-database/pinecone";

// Check if the API key is set
if (!process.env.PINECONE_API_KEY) {
  console.warn("PINECONE_API_KEY is not set. Pinecone functionality will be disabled.");
}

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "dummy-key", // Use dummy key if not set to prevent crashes
})

export const pinecodeIndex = pinecone.index("review-vector-ai")