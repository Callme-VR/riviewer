# Project Analysis Report: Reviewer

## 1. Project Overview
**Reviewer** is an AI-powered code review automation platform designed to integrate seamlessly with GitHub. It leverages Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) to provide context-aware, high-quality feedback on Pull Requests. By analyzing the PR diff alongside relevant codebase context stored in a vector database, Reviewer helps developers catch bugs, improve code quality, and maintain consistency.

## 2. Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [Better Auth](https://better-auth.com/) with GitHub Social Provider
- **AI/LLM**: [Google Gemini 1.5 Flash](https://ai.google.dev/) (via [Vercel AI SDK](https://sdk.vercel.ai/))
- **Vector Database**: [Pinecone](https://www.pinecone.io/) for RAG
- **Background Jobs**: [Inngest](https://www.inngest.com/) for reliable, serverless-friendly workflow orchestration
- **Payments/Subscriptions**: [Polar.sh](https://polar.sh/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Tailwind CSS, Radix UI)
- **API Clients**: Octokit (GitHub), Polar SDK

## 3. Architecture & Structure
The project follows a modular, feature-based architecture within the `module/` directory, promoting separation of concerns and maintainability.

- `app/`: Next.js App Router routes and page-level layouts.
- `components/`: Shared UI components (Shadcn UI) and global providers.
- `module/`: Core business logic organized by domain:
  - `ai/`: RAG implementation, embedding generation, and AI prompts.
  - `auth/`: Authentication UI and utilities.
  - `github/`: GitHub API integration (Octokit).
  - `payment/`: Subscription management and Polar configuration.
  - `repository/`: Repository connection and management logic.
  - `review/`: Core review generation actions.
  - `settings/`: User profile and repository configuration.
- `inngest/`: Background job definitions (e.g., handling GitHub webhooks, indexing codebases, generating reviews).
- `lib/`: Shared utilities, database client, and auth configuration.
- `prisma/`: Database schema and migrations.

## 4. Key Features
- **Automated PR Reviews**: Automatically triggers a review when a new PR is opened or updated on a connected repository.
- **Context-Aware Feedback (RAG)**: Indexes the entire codebase into Pinecone to retrieve relevant code context for more accurate reviews.
- **GitHub Integration**: Single-click repository connection and automatic webhook management.
- **Subscription Tiers**: Free and Pro (Coder) tiers with usage limits (e.g., number of repositories, reviews per repo).
- **Interactive Dashboard**: View connected repositories, review history, and subscription status.
- **Contribution Graph**: Visual representation of AI-assisted review activity.

## 5. Database Schema Overview (Prisma)
The schema is designed for multi-tenancy and robust tracking of AI interactions.
- **User / Account / Session**: Core authentication models (Better Auth compatible).
- **Repository**: Stores connected GitHub repositories, including metadata like `owner`, `repoName`, and `webhookSecret`.
- **Review**: Records each AI-generated review, linking it to a repository and storing the feedback content.
- **UserUsage**: Tracks usage metrics (repos connected, reviews generated) to enforce subscription limits.
- **SubscriptionTier (Enum)**: `FREE`, `PRO`, etc.

## 6. Authentication Flow
- Powered by **Better Auth**.
- **Social Login**: Exclusively uses GitHub for authentication.
- **Polar Integration**: The `polar` plugin for Better Auth synchronizes user data with Polar.sh and handles subscription webhooks (active, canceled, revoked) to update the user's `subscriptionsTier` in real-time.

## 7. AI/RAG Integration
- **Indexing**: When a repository is connected, its files are fetched, chunked, and embedded using `google.textEmbedding`. These embeddings are stored in Pinecone with metadata.
- **Retrieval**: For a given PR, the system generates a search query based on the PR title and description. It then retrieves the top-K most relevant code snippets from Pinecone.
- **Generation**: The PR diff (retrieved via Octokit) and the retrieved code context are combined into a prompt for `gemini-1.5-flash`.
- **Result**: A structured Markdown review is generated and posted back to GitHub as a comment.

## 8. Payment & Subscription (Polar)
- **Integration**: Uses the Polar SDK and Better Auth plugin.
- **Product**: A 'Coder' product is defined in Polar for the PRO tier.
- **Enforcement**: Server actions in `module/payment/subscriptions.ts` check the user's tier and usage counts from `UserUsage` before allowing new repository connections or reviews.

## 9. GitHub Integration
- **OAuth**: Obtains access tokens during the authentication process.
- **Webhooks**: Automatically creates a webhook on the user's repository to listen for `pull_request` events.
- **Octokit**: Used for fetching repository file structures (for indexing), retrieving PR diffs, and posting review comments.

## 10. Future Recommendations
- **Improved Chunking**: Implement smarter code-aware chunking (e.g., by function or class) rather than fixed-size slices to improve RAG quality.
- **Multi-Model Orchestration**: Allow users to toggle between models (e.g., Gemini Flash for speed, Gemini Pro for depth).
- **Review Quality Feedback**: Allow users to "thumbs up/down" AI comments to fine-tune future prompt versions.
- **Enterprise Features**: Support for GitHub Enterprise and self-hosted deployments.
- **Performance**: Optimize the indexing process for very large repositories (multi-stage indexing or parallel processing).
