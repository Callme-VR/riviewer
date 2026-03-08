# Final Project Strategy & Performance Optimization: Reviewer

This document synthesizes the analysis from the `report.md`, `Features.md`, and `Issue.md` files to provide a concrete, high-impact action plan for optimizing the **Reviewer** project.

## 1. Immediate Critical Actions (High Impact & Security)
*   **Secure the Webhook Entry Point**: Implement GitHub Webhook Signature Verification immediately in `app/api/webhooks/github/route.ts`. This is not just a security fix; it prevents unauthorized or malicious payloads from triggering expensive AI processes that drain your quota.
*   **Offload to Inngest**: Ensure the webhook handler only acknowledges the event and immediately hands off the work to an **Inngest function**. This prevents execution timeouts in serverless environments (like Vercel) and allows for automatic retries if the GitHub API or Gemini fails.

## 2. Performance Architecture Improvements
*   **Parallelize File Indexing**: Refactor the `getRepoFileContent` logic in `module/github/lib/github.ts`. Instead of sequential recursive calls, use `Promise.all` with a concurrency limit (e.g., [p-limit](https://www.npmjs.com/package/p-limit)) to fetch multiple directories simultaneously without hitting GitHub's secondary rate limits too quickly.
*   **Implement Embedding Caching**: Before calling `google.textEmbedding`, check a local cache (Redis or even a simple database table `CodeSnippetEmbedding`) to see if that exact file content has already been embedded. This significantly reduces latency and cost during re-indexing or similar PRs.
*   **AST-Aware Chunking**: Replace character-based slicing with Abstract Syntax Tree (AST) parsing for JavaScript/TypeScript files. This ensures the AI receives complete logical blocks (functions/classes) rather than fragmented code, leading to much higher quality RAG retrieval and more accurate reviews.

## 3. Database & Scalability
*   **Add Database Indexes**: Ensure fields like `owner`, `repoName`, and `userId` are indexed in your PostgreSQL database. This speeds up the lookup time during high-volume webhook events.
*   **Transactional Subscription Checks**: Wrap the "check usage" and "increment usage" logic in a **Prisma Transaction** (`$transaction`) or use an atomic `increment` operation. This eliminates the race condition where users could bypass limits through concurrent requests.
*   **Clean Up Logic**: Implement a "Soft Delete" or a cleanup worker to remove Pineapple vectors and GitHub webhooks when a repository is disconnected, keeping the system lean.

## 4. User Experience & AI Quality
*   **Hybrid Search Implementation**: Move beyond simple vector search. Combine it with a basic keyword search for specific identifiers (variable names, error codes). This ensures that if a PR mentions a specific function, the AI definitely sees that function's implementation.
*   **Streaming AI Responses (Internal)**: Although the final review is a GitHub comment, use streaming internally for real-time dashboard updates so users can see the "AI is thinking..." progress without waiting for the full response.

## 5. Summary Action Roadmap
1.  **Week 1 (Stability & Security)**: Fix Webhook signatures, migrate PR review logic fully to Inngest, and add Zod validation to server actions.
2.  **Week 2 (Performance)**: Implement parallel file fetching and add basic file-type filtering for RAG indexing (ignore `.json`, `.md`, `.svg`, etc.).
3.  **Week 3 (Intelligence)**: Switch to AST-based chunking and implement the "Fix It" suggestion output format.
4.  **Week 4 (Scaling)**: Add Redis caching for embeddings and implement tiered rate-limiting for the Free tier.
