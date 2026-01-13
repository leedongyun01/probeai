---
description: "Task list for Global Theming & UI Components implementation"
---

# Tasks: Global Theming & UI Component Architecture

**Input**: Design documents from `/specs/001-global-theming/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/components.ts, research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install `next-themes`, `lucide-react`, `@radix-ui/react-dialog`, `@radix-ui/react-slot`, `clsx`, `tailwind-merge`, `class-variance-authority`
- [x] T002 Install testing dependencies (`vitest`, `@testing-library/react`, `@testing-library/dom`, `@vitejs/plugin-react`, `jsdom`)
- [x] T003 Create utility helper `cn` in `lib/utils.ts`
- [x] T004 Create/configure `vitest.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Define global CSS variables (Colors, Radius, Motion) in `app/globals.css`
- [x] T006 Define Typography and Base styles in `app/globals.css`
- [x] T007 Create `ThemeProvider` component in `components/theme-provider.tsx`
- [x] T008 Integrate `ThemeProvider` in `app/layout.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Theme Customization (Priority: P1) 🎯 MVP

**Goal**: Enable users to toggle between Light and Dark modes with persistence

**Independent Test**: Fully tested by toggling the theme switch and verifying that background and text colors invert correctly.

### Tests for User Story 1

- [x] T009 [US1] Create unit test for ThemeProvider in `components/__tests__/theme-provider.test.tsx`

### Implementation for User Story 1

- [x] T010 [US1] Create `ModeToggle` component in `components/mode-toggle.tsx`
- [x] T011 [US1] Create design system demo page in `app/design-system/page.tsx`
- [x] T012 [US1] Verify Theme persistence, toggle functionality, and instant response (<100ms) on demo page

**Checkpoint**: User Story 1 (Theming) fully functional and testable

---

## Phase 4: User Story 2 - Consistent Action Elements (Priority: P1)

**Goal**: Provide consistent, accessible Button and Input components

**Independent Test**: Verify interactions (hover, focus, disabled) on the Component Showcase page.

### Tests for User Story 2

- [x] T013 [P] [US2] Create unit test for Button in `components/ui/__tests__/button.test.tsx`
- [x] T014 [P] [US2] Create unit test for Input in `components/ui/__tests__/input.test.tsx`

### Implementation for User Story 2

- [x] T015 [P] [US2] Implement `Button` component in `components/ui/button.tsx`
- [x] T016 [P] [US2] Implement `Input` component in `components/ui/input.tsx`
- [x] T017 [US2] Add Button and Input examples to `app/design-system/page.tsx`

**Checkpoint**: User Stories 1 AND 2 work independently

---

## Phase 5: User Story 3 - Feedback and Information Containers (Priority: P2)

**Goal**: Provide structural components (Card, Modal) for content organization

**Independent Test**: Open a Modal and verify focus trapping; Check Card consistency.

### Tests for User Story 3

- [x] T018 [P] [US3] Create unit test for Card in `components/ui/__tests__/card.test.tsx`
- [x] T019 [P] [US3] Create unit test for Dialog in `components/ui/__tests__/dialog.test.tsx`

### Implementation for User Story 3

- [x] T020 [P] [US3] Implement `Card` component in `components/ui/card.tsx`
- [x] T021 [P] [US3] Implement `Dialog` component in `components/ui/dialog.tsx`
- [x] T022 [US3] Add Card and Dialog examples to `app/design-system/page.tsx`

**Checkpoint**: All user stories independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T023 Run accessibility checks (Lighthouse) on `app/design-system/page.tsx` (Completed manually)
- [x] T024 Verify mobile responsiveness of all components
- [x] T025 Update documentation in `docs/` if necessary

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase
- **Polish**: Depends on all user stories

### User Story Dependencies

- **US1 (Theming)**: Foundation for visual verification.
- **US2 (Actions)**: Can start after Foundation. Independent of US1 implementation details (uses CSS vars).
- **US3 (Containers)**: Can start after Foundation. Independent of US1/US2.

### Parallel Opportunities

- T013 (Button Test) and T014 (Input Test) can run in parallel
- T015 (Button Impl) and T016 (Input Impl) can run in parallel
- T018 (Card Test) and T019 (Dialog Test) can run in parallel
- T020 (Card Impl) and T021 (Dialog Impl) can run in parallel
- US2 and US3 can be developed in parallel by different developers

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup & Foundation
2. Implement US1 (Theming)
3. Validate Theme Switching
4. Deploy/Commit MVP

### Incremental Delivery

1. Add US2 (Buttons/Inputs) -> Validate
2. Add US3 (Cards/Modals) -> Validate
3. Polish & Finalize