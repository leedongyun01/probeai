<!--
SYNC IMPACT REPORT
Version change: 1.1.0 -> 1.2.0
Modified principles:
- None
Added sections:
- VI. Design System Adherence ("Mission Control")
Templates requiring updates:
- .specify/templates/plan-template.md (✅ updated)
- .specify/templates/spec-template.md (✅ updated)
- .specify/templates/tasks-template.md (✅ updated)
Follow-up TODOs:
- None
-->
# ProbeAI Constitution

## Core Principles

### I. Agentic Autonomy & State Visibility
The system MUST be designed for autonomous execution. Agents SHOULD independently perform browsing, analysis, and synthesis. However, state transitions MUST be observable and resumable, leveraging LangGraph for robust orchestration.

### II. Absolute Verifiability (Citations)
Non-negotiable: Every factual claim in a research report MUST include a verifiable citation. Source mapping MUST be maintained from data acquisition through final synthesis to ensure user trust and auditability.

### III. Intelligent Content Synthesis
Agents MUST proactively structure information. Quantitative data or structural flows SHOULD be automatically converted into visual formats (Mermaid.js, Markdown Tables) to enhance readability.

### IV. Component-Driven UI (React 19)
UI MUST be built using atomic, reusable components (Shadcn UI/Tailwind 4). Separation of concerns between Agent Logic (Server) and Presentation (Client) is MANDATORY.

### V. Strict Type Safety & Validation
TypeScript 5+ is mandatory. `any` is forbidden. Interaction with LLMs (Gemini) MUST use structured output validation (e.g., Zod) to ensure system stability.

### VI. Design System Adherence ("Mission Control")
All UI/UX development MUST strictly adhere to the "Mission Control" design system defined in `docs/design-system.md`. This includes the usage of the "Dark/Data-Dense" aesthetic, `JetBrains Mono` for data, and specific color palettes. Deviations must be explicitly justified.

## Technical Standards

*   **Framework**: Next.js 16 (App Router) / React 19.
*   **Orchestration**: LangGraph (State management).
*   **AI Model**: Gemini 1.5 Pro.
*   **Search**: Tavily AI API.
*   **Styling**: Tailwind CSS 4.
*   **Visualization**: Mermaid.js / Lucide React.
*   **Validation**: Zod.

## Development Workflow

*   **Branching**: `feat/`, `fix/`, `refactor/` -> `main`.
*   **Testing**: Vitest for unit/logic tests. Playwright/Cypress recommended for agent flow E2E.
*   **Citations**: Citation integrity must be part of the Definition of Done (DoD) for research features.

## Governance

Amendments to this constitution require a MINOR version bump. Backward-incompatible changes to agent behavior or data integrity rules require a MAJOR bump.

**Version**: 1.2.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-14