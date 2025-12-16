# Reviewer - AI-Powered Code Review Platform

Reviewer is an advanced AI-powered code review platform that integrates directly with GitHub to provide instant, intelligent feedback on pull requests. Built with Next.js 16, it leverages cutting-edge AI models to analyze code changes and provide actionable insights.

## Features

- **AI-Powered Code Reviews**: Automatically analyze pull requests using Gemini AI
- **GitHub Integration**: Seamless integration with GitHub repositories and webhooks
- **Real-time Dashboard**: Track your coding activity, PR statistics, and review history
- **Subscription Management**: Flexible pricing tiers with Polar.sh integration
- **Vector Search**: Pinecone-powered context-aware code analysis
- **Responsive UI**: Beautiful, mobile-friendly interface built with Tailwind CSS and Shadcn UI

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with GitHub OAuth
- **AI/ML**: Google Gemini API, Pinecone Vector Database
- **Payments**: Polar.sh subscription management
- **Background Jobs**: Inngest for async processing
- **Deployment**: Vercel-ready

## Architecture Overview

```mermaid
graph TD
    A[GitHub Webhook] --> B[Next.js API Route]
    B --> C[Inngest Queue]
    C --> D[AI Review Generation]
    D --> E[Pinecone Context Retrieval]
    D --> F[Gemini AI Analysis]
    F --> G[GitHub PR Comment]
    F --> H[Database Storage]
    
    I[User Dashboard] --> J[Next.js Frontend]
    J --> K[API Routes]
    K --> L[Database Queries]
    K --> M[GitHub API]
    
    N[Authentication] --> O[Better Auth]
    O --> P[GitHub OAuth]
    
    Q[Subscription] --> R[Polar.sh]
    R --> S[Webhooks]
```

## Prerequisites

- Node.js 18+
- PostgreSQL database
- GitHub OAuth App credentials
- Google AI API key
- Polar.sh account for subscription management
- Pinecone account for vector search

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/reviewer

# Next.js
NEXT_PUBLIC_APP_URL=https://riviewer.vercel.app
NEXT_PUBLIC_BASE_APP_URL=https://riviewer.vercel.app

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key

# Polar.sh
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret
POLAR_SUCCESS_URL=https://riviewer.vercel.app/dashboard/subscription?success=true

# Inngest
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
```

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/reviewer.git
   cd reviewer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up the database**:
   ```bash
   npx prisma migrate dev
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Set environment variables in Vercel dashboard
5. Deploy!

### Docker (Alternative)

```bash
# Build the image
docker build -t reviewer .

# Run the container
docker run -p 3000:3000 reviewer
```

## Project Structure

```
reviewer/
├── app/                    # Next.js 16 App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── ...
├── components/            # Shared React components
├── lib/                   # Core libraries and utilities
├── module/                # Feature modules
│   ├── ai/               # AI functionality
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── github/           # GitHub integration
│   ├── payment/          # Payment/subscription logic
│   ├── repository/       # Repository management
│   ├── review/           # Review functionality
│   └── settings/         # Settings components
├── prisma/               # Prisma schema and migrations
└── public/               # Static assets
```

## How It Works

1. **Repository Connection**: Users connect their GitHub repositories through OAuth
2. **Webhook Setup**: GitHub webhooks trigger on PR events
3. **AI Analysis**: When a PR is opened or updated, the system:
   - Retrieves PR diff and metadata
   - Fetches relevant code context from Pinecone
   - Generates comprehensive review using Gemini AI
   - Posts review as a comment on the PR
   - Stores review in the database
4. **Dashboard Insights**: Users can view:
   - Repository statistics
   - Contribution graphs
   - Review history
   - Subscription usage

## Subscription Tiers

- **Free Tier**: Limited to 10 repositories and 10 reviews per repository
- **Pro Tier**: Unlimited repositories and reviews with advanced analysis

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on the GitHub repository or contact the maintainers.