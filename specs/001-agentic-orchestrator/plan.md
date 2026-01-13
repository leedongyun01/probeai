# Implementation Plan: Agentic Research Orchestrator

**Branch**: `001-agentic-orchestrator` | **Date**: 2026-01-13 | **Spec**: [specs/001-agentic-orchestrator/spec.md](specs/001-agentic-orchestrator/spec.md)
**Input**: Feature specification from `/specs/001-agentic-orchestrator/spec.md`

## Summary
Implement a multi-agent research orchestration system using LangGraph. The system will provide two modes: "Quick Scan" for rapid summaries and "Deep Probe" for iterative, multi-step investigation. Core focus is on absolute verifiability through mandatory citation mapping and real-time state visibility for the user.

## Technical Context

**Language/Version**: TypeScript 5.x / Next.js 16 (App Router) / React 19
**Primary Dependencies**: LangGraph (Orchestration), Gemini 2.5 Flash Lite (LLM), Tavily AI (Search), Zod (Validation), Tailwind CSS 4, Lucide React, Mermaid.js
**Storage**: N/A (State managed in LangGraph via `thread_id` persistence with SQLite/Postgres; Session ID stored in HTTP-only cookies)
**Testing**: Vitest (Unit), Playwright (E2E)
**Target Platform**: Web
**Project Type**: Web application
**Performance Goals**: Quick Scan < 2m, Deep Probe < 5m
**Constraints**: Max 5 iterations for Deep Probe, Citation Integrity mandatory, Context Window management (Summary Buffer)
**Scale/Scope**: 10 concurrent research sessions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Agentic Autonomy & State Visibility**: LangGraph will be used to ensure state transitions are observable and the process is resumable. (PASS)
- **II. Absolute Verifiability (Citations)**: Every claim will be mapped to a source URL from acquisition to synthesis. (PASS)
- **III. Intelligent Content Synthesis**: Automated generation of Mermaid/Markdown tables for structured data. (PASS)
- **IV. Component-Driven UI (React 19)**: Next.js App Router with atomic components (Shadcn UI/Tailwind 4). (PASS)
- **V. Strict Type Safety & Validation**: TypeScript 5 with Zod validation for all LLM outputs. (PASS)

## Project Structure

### Documentation (this feature)

```text
specs/001-agentic-orchestrator/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
app/
├── (research)/          # Route group for research features
│   ├── [sessionId]/
│   │   └── page.tsx     # Research session view
│   └── page.tsx         # New research input
├── components/          # Shared UI components
│   ├── research/        # Status dashboard, Report viewer
│   └── ui/              # Atomic Shadcn components
└── api/
    └── research/        # API endpoints for triggering/tracking research
lib/
├── agents/              # LangGraph definitions
│   ├── nodes/           # analyzer, planner, researcher, synthesizer
│   ├── state.ts         # LangGraph state definition
│   └── graph.ts         # Graph orchestration logic
├── services/            # Third-party integrations (Tavily, Gemini)
├── schema/              # Zod schemas for state and LLM output
└── utils.ts
```

**Structure Decision**: Web application structure (Option 2) adapted for Next.js App Router and LangGraph-based logic.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | - | - |