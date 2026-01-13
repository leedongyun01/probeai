# Feature Specification: Agentic Research Orchestrator

**Feature Branch**: `001-agentic-orchestrator`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Implement the core agentic research flow using LangGraph for multi-step reasoning and orchestration."

## User Scenarios & Testing *(mandatory)*

## Clarifications

### Session 2026-01-13
- Q: How should the system explicitly present conflicting information in the final report? → A: Side-by-side comparison: Explicitly list Source A's claim vs. Source B's claim in a dedicated "Contradictions" section.
- Q: What minimum metadata MUST be captured for every source citation? → A: Standard: URL, Title, Snippet, and Published/Access Date.
- Q: For "Deep Probe" mode, what is the maximum number of autonomous research iterations? → A: Conservative: Maximum 5 loops.
- Q: How should the system handle the internal state if data exceeds the LLM's context window? → A: Summary Buffer: Summarize findings from previous steps before moving to the next iteration.
- Q: If "Deep Probe" is simple and resolved in one loop, should it terminate? → A: Auto-terminate: If sufficient information is found in loop 1, proceed directly to synthesis.

### User Story 1 - High-Level Research Summary (Priority: P1)

As a busy professional, I want to get a quick but accurate summary of a complex topic so that I can understand the core concepts without reading dozens of articles.

**Why this priority**: This is the core MVP value proposition—providing immediate, verified value with minimal user effort.

**Independent Test**: Can be tested by submitting a query and verifying that the system returns a structured summary with at least 3 distinct sources cited within 2 minutes.

**Acceptance Scenarios**:

1. **Given** a research query, **When** the "Quick Scan" mode is selected, **Then** the system should return a summary covering key points with inline citations.
2. **Given** a query with no relevant web results, **When** the research starts, **Then** the system should gracefully inform the user that no verified information was found.

---

### User Story 2 - In-Depth Multi-Step Investigation (Priority: P2)

As a researcher, I want the agent to perform a multi-step investigation that cross-references multiple sources and identifies conflicting information so that I can have a comprehensive understanding of a topic.

**Why this priority**: This differentiates ProbeAI from standard LLM wrappers by providing deep, autonomous reasoning.

**Independent Test**: Can be tested by a query that requires multiple search steps (e.g., "Compare the impact of X on Y and Z") and verifying the agent performs at least 2 distinct search cycles.

**Acceptance Scenarios**:

1. **Given** a complex query, **When** "Deep Probe" mode is selected, **Then** the system should execute a multi-phase plan (Analyzer -> Planner -> Researcher -> Synthesizer).
2. **Given** conflicting information across sources, **When** synthesizing the report, **Then** the system should highlight the discrepancies rather than ignoring them.

---

### User Story 3 - Real-time Progress Tracking (Priority: P3)

As a user, I want to see what the agent is currently doing (thinking, searching, or writing) so that I feel confident the process is moving forward and understand the effort involved.

**Why this priority**: Enhances transparency and perceived reliability, aligning with the "State Visibility" principle.

**Independent Test**: Can be tested by observing the status dashboard during a research session and verifying it correctly transitions between states.

**Acceptance Scenarios**:

1. **Given** an ongoing research task, **When** the agent transitions from searching to synthesizing, **Then** the status dashboard should reflect this change immediately.

### Edge Cases

- **Search Rate Limiting**: How does the system handle being throttled by external search providers? (Assumption: It should wait and retry or inform the user of a delay).
- **Ambiguous Queries**: What happens if the query is too broad or nonsensical? (Requirement: System should ask for clarification or try to narrow the scope).
- **Broken Links/Unreachable Sources**: How does the researcher handle sites that cannot be scraped? (Requirement: System must skip and find alternative sources).
- **Conflicting Data**: Handling direct contradictions between two high-authority sources. The system MUST present these as a side-by-side comparison in a dedicated "Contradictions" section of the report.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST accept natural language queries as research input.
- **FR-002**: System MUST support two research modes: "Quick Scan" and "Deep Probe".
- **FR-003**: System MUST provide a real-time status stream of agent activities.

#### Agentic & Data Requirements (Constitution Alignment)
- **FR-AG-001**: Agents MUST autonomously generate search queries based on the initial user query and subsequent findings. In "Deep Probe" mode, this MUST be capped at a maximum of 5 search-then-analyze iterations.
- **FR-AG-002**: System MUST maintain an internal state (LangGraph) to track the research progress and collected data. If data exceeds the context window, a Summary Buffer strategy MUST be used.
- **FR-AG-003**: Every factual claim in the generated report MUST be mapped to a source URL (Citation Integrity).
- **FR-AG-004**: System MUST automatically generate a Mermaid.js chart or Markdown table if structured data (e.g., comparisons, timelines) is identified.

### Assumptions & Dependencies
- **AS-001**: System relies on a third-party search API for web indexing.
- **AS-002**: Users are expected to provide queries in a language supported by the underlying LLM.
- **AS-003**: Internet connectivity is mandatory for all core research functions.

### Key Entities *(include if feature involves data)*

- **ResearchSession**: Represents a single user query and its lifecycle.
- **ResearchState**: The LangGraph state object containing the current plan, search results, and synthesized report.
- **SourceCitation**: A reference object containing the URL, Title, Snippet, and Published/Access Date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of research queries result in a completed report within 5 minutes for "Deep Probe" and 2 minutes for "Quick Scan".
- **SC-002**: 100% of factual claims in reports must have at least one verifiable source citation.
- **SC-003**: System handles 10 concurrent research sessions without state corruption.
- **SC-004**: User satisfaction score (sampled) for report accuracy is 4/5 or higher.