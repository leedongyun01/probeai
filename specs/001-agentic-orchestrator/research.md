# Research Findings: Agentic Research Orchestrator

## 1. Session Persistence in Next.js with LangGraph
- **Decision**: Use LangGraph's built-in checkpointing mechanism (Threads) linked to a Next.js session identifier stored in an HTTP-only cookie.
- **Rationale**: This allows the agent's state (including search results and current plan) to persist across browser refreshes or accidental disconnects.
- **Implementation**:
  - Backend: `SqliteSaver` (development) or `PostgresSaver` (production) to store graph states.
  - Frontend: Generate or retrieve a `sessionId` (used as `thread_id`) and pass it to all API calls.
- **Alternatives considered**: 
  - Client-side state only: Rejected due to loss of state on refresh and inability to handle long-running server-side tasks reliably.

## 2. Tavily AI Integration Patterns
- **Decision**: Implement a multi-phase agent loop: `Analyzer -> Planner -> Researcher -> Synthesizer`.
- **Rationale**: Tavily provides LLM-optimized search results, but the agent still needs to plan specific queries and reflect on results to meet the "Deep Probe" requirement.
- **Implementation**:
  - `Researcher` node will use the `TavilySearch` tool.
  - Set `include_answer=true` for Quick Scan mode to leverage Tavily's internal synthesis.
  - Use `max_results=5` to stay within context limits while ensuring breadth.
- **Alternatives considered**: 
  - Direct LLM search tools: Rejected as Tavily provides cleaner, structured data specifically for RAG.

## 3. Summary Buffer Implementation
- **Decision**: Implement a `summarize` node in LangGraph that triggers when the message history exceeds a token threshold (e.g., 4k tokens).
- **Rationale**: Prevents context window overflow while maintaining long-term memory of previous research steps.
- **Implementation**:
  - State will include `messages: BaseMessage[]` and `summary: string`.
  - When history is too long, the `summarize` node will use Gemini 2.5 Flash Lite to condense the `summary + older_messages` into a new `summary`.
  - Only the `summary` and the most recent `N` messages are sent to the LLM.
- **Alternatives considered**: 
  - Simple truncation: Rejected as it loses critical context from early research phases.

## 4. Visualization (Mermaid.js)
- **Decision**: Use a dedicated node or a post-processing step in the `Synthesizer` to detect structured data (comparisons, timelines) and prompt the LLM to output Mermaid.js code.
- **Rationale**: Aligns with Constitution Principle III (Intelligent Content Synthesis).
- **Implementation**: 
  - Frontend will use `mermaid` or `react-mermaid` to render the output code blocks.
