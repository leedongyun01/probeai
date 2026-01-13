# Tasks: Agentic Research Orchestrator

**Input**: Design documents from `/specs/001-agentic-orchestrator/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/research.yaml

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure (app, components, api, lib/agents, lib/services, lib/schema) per plan.md
- [x] T002 Initialize project dependencies (langgraph, @langchain/google-genai, tavily-client, zod) in package.json
- [x] T003 [P] Configure Vitest and Playwright in vitest.config.ts and playwright.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Setup environment variables and Zod validation in lib/config.ts
- [x] T005 [P] Implement HTTP-only cookie session management in lib/session.ts
- [x] T006 [P] Setup LangGraph checkpointer (SQLite) for state persistence in lib/agents/checkpoint.ts
- [x] T007 [P] Define Zod schemas for ResearchSession, ResearchState, and SourceCitation in lib/schema/research.ts

---

## Phase 3: Agent Logic & Orchestration (Research Core)

**Purpose**: Implementation of the agentic core nodes and tools

- [x] T008 [P] Define LangGraph state schema (messages, summary, plan, results) in lib/agents/state.ts
- [x] T009 [P] Implement Tavily search service integration in lib/services/tavily.ts
- [x] T010 [P] Implement core prompt templates for Analyzer and Researcher in lib/agents/prompts.ts
- [x] T011 Implement citation mapping logic (Constitution Principle II) in lib/agents/nodes/researcher.ts
- [x] T012 Implement Summary Buffer logic for context window management in lib/agents/nodes/summarizer.ts
- [x] T012a Implement query clarification logic in Analyzer node for ambiguous inputs in lib/agents/nodes/analyzer.ts
- [x] T012b [P] Add error handling and retry logic for search API and broken links in lib/services/tavily.ts

---

## Phase 4: User Story 1 - High-Level Research Summary (Priority: P1) 🎯 MVP

**Goal**: Implement "Quick Scan" mode to provide rapid, verified summaries.

**Independent Test**: Submit a query via API and verify a structured summary is returned with at least 3 inline citations from `lib/agents/graph.ts`.

### Implementation for User Story 1

- [x] T013 [P] [US1] Implement Quick Scan node logic using Tavily's `include_answer` in lib/agents/nodes/quick_scan.ts
- [x] T014 [US1] Create primary LangGraph flow for Quick Scan in lib/agents/graph.ts
- [x] T015 [P] [US1] Create research start API endpoint (POST /api/research/start) in app/api/research/start/route.ts
- [x] T016 [US1] Implement basic research input form in app/(research)/page.tsx
- [x] T017 [US1] Create Markdown report viewer component with citation support in components/research/ReportViewer.tsx
- [x] T018 [US1] Implement research session view for results in app/(research)/[sessionId]/page.tsx

**Checkpoint**: User Story 1 (MVP) is fully functional and testable independently.

---

## Phase 5: User Story 2 - In-Depth Multi-Step Investigation (Priority: P2)

**Goal**: Implement "Deep Probe" mode for iterative investigation and contradiction detection.

**Independent Test**: Run a "Deep Probe" session for a complex topic and verify the agent performs multiple search cycles in `lib/agents/graph.ts`.

### Implementation for User Story 2

- [x] T019 [P] [US2] Implement Planner node logic for multi-step investigation in lib/agents/nodes/planner.ts
- [x] T020 [P] [US2] Implement iterative Researcher node loop logic in lib/agents/nodes/researcher.ts
- [x] T021 [US2] Implement Synthesizer node with contradiction detection logic in lib/agents/nodes/synthesizer.ts
- [x] T022 [US2] Update LangGraph flow in lib/agents/graph.ts to support Deep Probe logic (max 5 iterations)
- [x] T023 [US2] Update components/research/ReportViewer.tsx to render Mermaid.js charts and "Contradictions" section

**Checkpoint**: User Story 2 is functional and differentiates the product with deep reasoning.

---

## Phase 6: User Story 3 - Real-time Progress Tracking (Priority: P3)

**Goal**: Provide real-time visibility into the agent's internal state transitions.

**Independent Test**: Observe the UI dashboard during a search and verify it reflects state transitions (Searching -> Synthesizing).

### Implementation for User Story 3

- [x] T024 [P] [US3] Implement Server-Sent Events (SSE) stream endpoint in app/api/research/[sessionId]/stream/route.ts
- [x] T025 [US3] Create Status Dashboard UI component in components/research/StatusDashboard.tsx
- [x] T026 [P] [US3] Implement client-side SSE listener hook in lib/hooks/useResearchStream.ts
- [x] T027 [US3] Integrate StatusDashboard into the session view in app/(research)/[sessionId]/page.tsx

**Checkpoint**: User Story 3 is complete, providing full transparency of the agentic process.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Testing, optimization, and final documentation.

- [x] T028 [P] Add unit tests for LangGraph nodes in tests/unit/agents/nodes/
- [x] T029 [P] Add E2E tests for research flows using Playwright in tests/e2e/research.spec.ts
- [x] T030 [P] Optimize Tailwind CSS 4 styles and Lucide icons in app/globals.css and components/
- [x] T031 Update README.md with final architecture and run quickstart.md validation
- [x] T032 [P] Perform concurrency and performance testing to verify SC-001 and SC-003 in tests/performance/load.test.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001, T002. Blocks all user stories.
- **Agent Core (Phase 3)**: Depends on Phase 2. Blocks US1 and US2.
- **User Story 1 (P1)**: Depends on Phase 3.
- **User Story 2 (P2)**: Depends on Phase 3 and US1 (shared graph logic).
- **User Story 3 (P3)**: Depends on US1/US2 implementation for state data.
- **Polish (Phase 7)**: Depends on all stories.

### Parallel Opportunities

- T003 (Testing config) can run alongside Foundational tasks.
- T005, T006, T007 (Foundational utils) can run in parallel.
- T008, T009, T010 (Agent logic) can run in parallel.
- T013, T015 (API/Node logic for US1) can run in parallel.
- T019, T020 (Node logic for US2) can run in parallel.
- T024, T026 (SSE logic for US3) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup, Foundational, and Agent Core (Phases 1-3).
2. Complete Phase 4 (User Story 1).
3. **VALIDATE**: Run a Quick Scan and verify citation accuracy.

### Incremental Delivery

1. Add User Story 2 for deep reasoning once Quick Scan is stable.
2. Add User Story 3 to improve UX and transparency.
3. Finalize with cross-cutting tests and documentation.
