# Implementation Plan: Global Theming & UI Components

**Branch**: `001-global-theming` | **Date**: 2026-01-13 | **Spec**: `specs/001-global-theming/spec.md`
**Input**: Feature specification from `/specs/001-global-theming/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a robust global theming system (Light/Dark/System) and a set of core accessible UI components (Button, Input, Card, Modal).
**Approach**:
- **Theming**: Use `next-themes` to manage CSS variables for colors, typography, and radius.
- **Styling**: Tailwind CSS v4 with semantic tokens defined in `globals.css`.
- **Components**: Build on top of Radix UI primitives (Dialog, Slot) for accessibility and use `class-variance-authority` (cva) for managing component variants.
- **Testing**: Verify interactions with Vitest and React Testing Library.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: 
- `next-themes` (Theming)
- `lucide-react` (Icons)
- `@radix-ui/react-dialog`, `@radix-ui/react-slot` (Primitives)
- `clsx`, `tailwind-merge`, `class-variance-authority` (Utils)
- `vitest`, `@testing-library/react` (Testing)
**Storage**: `localStorage` (managed by `next-themes` for preference persistence)
**Testing**: Vitest + React Testing Library (Unit/Component)
**Target Platform**: Web (Modern Browsers)
**Project Type**: Next.js Web Application
**Performance Goals**: Instant theme toggle (<100ms), 0 CLS on load.
**Constraints**: Must support System Preference; High Contrast/Accessibility compliance.
**Scale/Scope**: ~5 core components, global CSS variables.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Component-Driven UI**: ✅ Yes, atomic components in `components/ui`.
- **Type Safety**: ✅ Yes, strict Props interfaces defined.
- **Utility-First Styling**: ✅ Yes, Tailwind CSS used exclusively.
- **Performance**: ✅ Yes, utilizing lightweight libraries and CSS variables.
- **Clean Architecture**: ✅ Yes, separation of primitives (Radix) and presentation (Tailwind).

## Project Structure

### Documentation (this feature)

```text
specs/001-global-theming/
├── plan.md              # This file
├── research.md          # Technology choices and rationale
├── data-model.md        # Design tokens and component states
├── quickstart.md        # Usage guide
├── contracts/           # Component Prop interfaces
│   └── components.ts
└── tasks.md             # To be created
```

### Source Code (repository root)

```text
app/
├── globals.css             # Semantic tokens (CSS variables)
├── layout.tsx              # ThemeProvider injection
└── components/
    ├── theme-provider.tsx  # Client component for next-themes
    └── ui/
        ├── button.tsx      # Button component
        ├── input.tsx       # Input component
        ├── card.tsx        # Card, CardHeader, etc.
        └── dialog.tsx      # Modal component (wrapping Radix)
lib/
└── utils.ts                # cn() helper
```

**Structure Decision**: Standard Next.js App Router structure with shadcn/ui-like organization for UI components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |