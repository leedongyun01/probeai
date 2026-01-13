<!--
SYNC IMPACT REPORT
Version change: 0.0.0 -> 1.0.0
Modified principles:
- Initial Definition of All Principles
Added sections:
- Technical Standards
- Development Workflow
Templates requiring updates:
- .specify/templates/plan-template.md (✅ checked, generic reference)
- .specify/templates/spec-template.md (✅ checked, generic reference)
- .specify/templates/tasks-template.md (✅ checked, generic reference)
Follow-up TODOs:
- Validate specific linting rules in SECTION_2.
-->
# ProbeAI Constitution

## Core Principles

### I. Component-Driven UI
UI MUST be built as a composition of reusable, atomic components. Business logic SHOULD be separated from presentation components (e.g., using custom hooks).

### II. Type Safety (TypeScript)
Strict TypeScript usage is NON-NEGOTIABLE. `any` type is forbidden unless strictly justified. All props and state MUST be typed.

### III. Utility-First Styling
Use Tailwind CSS for styling. Avoid custom CSS files unless necessary for complex animations or legacy integration. Maintain consistency with the design system.

### IV. Performance & SEO
Leverage Next.js Server Components and SSG/SSR where appropriate. Optimize images and fonts. Ensure semantic HTML for accessibility and SEO.

### V. Clean Architecture
Maintain clear separation of concerns. Server actions for mutations. Zod for validation.

## Technical Standards

*   **Framework**: Next.js (App Router).
*   **Language**: TypeScript.
*   **Styling**: Tailwind CSS.
*   **Linting**: ESLint (Strict).
*   **Formatting**: Prettier (implied).

## Development Workflow

*   **Branching**: Feature branches (`feat/`, `fix/`) -> `main`.
*   **Commits**: Conventional Commits (e.g., `feat:`, `fix:`, `docs:`).
*   **Testing**: Unit tests for logic, component tests for interaction.

## Governance

Amendments require team consensus.
Versioning follows SemVer.
PRs must pass all CI checks (Lint, Build, Test).

**Version**: 1.0.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13