# Quickstart: Agentic Research Orchestrator

## Prerequisites
- Node.js 18+
- Tavily AI API Key
- Google Gemini API Key

## Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env.local`:
   ```text
   TAVILY_API_KEY=your_key_here
   GEMINI_API_KEY=your_key_here
   DATABASE_URL=file:./dev.db # For SQLite checkpointer
   ```
3. Initialize the database (if applicable):
   ```bash
   npx prisma db push
   ```

## Running the Agent
The research agent logic is located in `lib/agents/graph.ts`. You can test the orchestration locally using a script or via the API.

### Via API
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Trigger a research session:
   ```bash
   curl -X POST http://localhost:3000/api/research/start \
     -H "Content-Type: application/json" \
     -d '{"query": "Future of AI in 2026", "mode": "quick_scan"}'
   ```

## Project Layout
- `lib/agents/`: Core LangGraph orchestration logic.
- `app/api/research/`: API route handlers for Next.js.
- `app/research/`: Frontend UI for research sessions.
- `components/research/`: Reusable React components for status tracking and reporting.
