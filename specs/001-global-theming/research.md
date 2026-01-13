# Research & Decisions

## Testing Strategy
**Decision**: Vitest + React Testing Library
**Rationale**: 
- Vitest provides a fast, native ESM-first testing environment compatible with Next.js.
- React Testing Library is the industry standard for component interaction testing (as required by "Independent Test" scenarios).
- **Alternatives**: Jest (slower, more config), Cypress (too heavy for unit/component tests).

## Icon System
**Decision**: `lucide-react`
**Rationale**: 
- Explicitly recommended in the Spec clarifications.
- Lightweight, tree-shakeable, and visually consistent.
- **Alternatives**: Heroicons, FontAwesome.

## Accessible Primitives (Headless UI)
**Decision**: Radix UI
- `@radix-ui/react-dialog` for the **Modal/Dialog** component (FR-006).
- `@radix-ui/react-slot` for the **Button** component (to support `asChild` pattern).
**Rationale**: 
- Building accessible modals (focus trapping, screen reader support, backdrop) from scratch is error-prone.
- Radix provides unstyled, accessible primitives that integrate perfectly with Tailwind.

## Styling Utilities
**Decision**: `clsx` + `tailwind-merge`
**Rationale**: 
- Essential for constructing the `cn()` utility to safely merge Tailwind classes (e.g., overriding button colors).
- Standard practice in modern React/Tailwind codebases.

## Theming Implementation (Tailwind v4)
**Decision**: CSS Variables via `globals.css`
**Rationale**: 
- Tailwind v4 prioritizes CSS-native variables.
- We will define `--color-primary`, `--color-bg`, etc., in `globals.css` and reference them in classes.
- Theme switching will handle toggling a `.dark` class on the `<html>` or `<body>` element, which updates the CSS variable values.
