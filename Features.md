# Future Feature Roadmap: Reviewer

This document outlines planned and suggested features to improve the performance, capabilities, and user experience of the Reviewer platform.

## 1. Performance & RAG Optimizations
*   **AST-Based Chunking**: Move from fixed-size character chunking to Abstract Syntax Tree (AST) parsing. This ensures code blocks (functions, classes) are kept intact, significantly improving the AI's understanding of context.
*   **Incremental Indexing**: Instead of re-indexing or scanning large portions of a repository, implement logic to only index files changed in recent commits, reducing Pinecone usage and processing time.
*   **Hybrid Search**: Combine vector search (semantic) with keyword-based search (BM25) to better find specific function names or unique identifiers that might be missed by embeddings alone.
*   **Embedding Caching**: Implement a Redis-based cache for common code snippets or previously generated embeddings to speed up the RAG retrieval process.


## 2. Interactive & Collaborative Features
*   **Two-Way Conversation**: Enable users to reply to the AI's comments directly on GitHub. An Inngest function can listen for `issue_comment` webhooks, process the reply with the existing context, and post a follow-up response.
*   **"Fix It" Suggestions (One-Click PRs)**: Enhance the AI output to provide actual code diffs. Add a feature in the dashboard to "Apply Fix," which automatically creates a new branch and PR with the suggested changes.
*   **Team Workspaces**: Allow users to group repositories into "Teams" with shared billing, shared review history, and team-wide coding standards.
*   **Slack/Discord Integration**: Real-time notifications when an AI review is completed, including a summary of findings and a link to the PR.

## 3. Intelligent Customization
*   **Project-Specific Rules (`.reviewer.json`)**: Allow repositories to include a configuration file where developers can define specific rules, libraries to ignore, or architectural patterns the AI should enforce.
*   **Style Guide Alignment**: Allow users to upload their ESLint, Prettier, or internal style guide documents so the AI can flag stylistic inconsistencies specific to that project.
*   **Custom Persona Selection**: Choose different AI "Personas" (e.g., "The Security Expert," "The Performance Optimizer," "The Helpful Mentor").

## 4. Advanced Security & Analysis
*   **Security Focused Scanning**: Integrate specialized prompts for OWASP Top 10 vulnerabilities, secret detection (leaked API keys), and dependency vulnerability checks.
*   **Performance Regression Alerts**: Train the AI to identify code patterns that might lead to performance bottlenecks (e.g., N+1 queries, inefficient loops).
*   **Test Coverage Analysis**: If the PR includes test changes, the AI should verify if the new code is adequately covered by tests.

## 5. Dashboard & Analytics
*   **Code Quality Trends**: A dashboard visualizing the number of bugs, security risks, and refactoring suggestions found over time.
*   **Developer Insights**: Show which areas of the codebase receive the most AI "flags" to help identify technical debt.
*   **Cost/Usage Tracking**: Detailed breakdown of AI tokens used and Pinecone credits consumed per repository.

## 6. Enterprise & DX
*   **Self-Hosted Options**: Support for Docker-based deployments for companies that cannot use the SaaS version due to data privacy.
*   **Browser Extension**: A Chrome/Firefox extension that adds a "Review with AI" button directly on the GitHub UI for on-demand reviews.
*   **CLI Tool**: A `reviewer-cli` that allows developers to run the AI review locally before even pushing their code to GitHub.

## 7. Tech Stack Evolution
*   **Multi-Model Support**: Let users choose between Gemini 1.5 Pro, GPT-4o, or Claude 3.5 Sonnet based on their preference for speed vs. accuracy.
*   **Edge Functions**: Move non-heavy logic to Vercel Edge Functions to reduce latency for global users.
*   **Comprehensive Testing**: Implement Vitest for unit testing and Playwright for E2E testing of the dashboard flows.
