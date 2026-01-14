# ProbeAI Design System: "Mission Control"

This document defines the visual language and interaction patterns for ProbeAI, based on the "Mission Control" prototype. It is designed to provide a professional, data-dense, and highly controllable environment for researchers and analysts.

**Core Philosophy:** "Total Visibility & Control"
**Target Audience:** Researchers, Analysts, Developers.

---

## 1. Typography

We use a dual-font strategy to differentiate between UI/Content and Data/Code.

*   **Primary (UI & Body):** `Inter` (Sans-serif)
    *   Used for: Headings, button text, general readable content, navigational elements.
    *   Weights: `Regular (400)`, `SemiBold (600)`.
*   **Secondary (Data & Code):** `JetBrains Mono` (Monospace)
    *   Used for: Logs, status indicators, source URLs, raw data tables, inputs.
    *   Weights: `Regular (400)`, `Bold (700)`.

## 2. Color Palette (Dark Theme Focused)

The interface is predominantly dark to reduce eye strain during long research sessions, with high-contrast accents for status and actions.

### Backgrounds
*   **App Background:** `bg-slate-950` (#020617) - *Deepest layer.*
*   **Panel/Sidebar:** `bg-slate-900` (#0F172A) - *Structural layer.*
*   **Glass Surface:** `bg-slate-900/70` + `backdrop-blur-md` - *Floating panels.*

### Borders & Separators
*   **Subtle:** `border-slate-800` - *Panel dividers.*
*   **Highlight:** `border-blue-500/50` - *Active or focused elements.*

### Text Colors
*   **Primary:** `text-slate-200` (#E2E8F0) - *High legibility.*
*   **Secondary:** `text-slate-400` (#94A3B8) - *Labels, metadata.*
*   **Muted:** `text-slate-600` (#475569) - *Placeholders, empty states.*

### Functional Colors
*   **Action (Primary):** `text-blue-500` / `bg-blue-600`
*   **Success/Online:** `text-green-400` / `bg-green-500/10`
*   **Warning/Processing:** `text-yellow-400`
*   **Error:** `text-red-400`

---

## 3. UI Components & Patterns

### 3.1. Glass Panels
The core building block of the dashboard. Use for all major sections (Search, Logs, Plan).
```tsx
<div className="rounded-lg border border-slate-800 bg-slate-900/70 backdrop-blur-md p-4">
  {/* Content */}
</div>
```

### 3.2. Status Indicators
Used in headers or lists to show system health or task status.
```tsx
<span className="rounded px-2 py-0.5 text-xs font-mono font-medium border border-green-500/20 bg-green-500/10 text-green-500">
  ONLINE
</span>
```

### 3.3. Monospace Inputs
Search bars and command inputs should feel like a terminal.
```tsx
<input 
  type="text" 
  className="w-full rounded bg-slate-800/50 border border-slate-700 px-4 py-2 font-mono text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
/>
```

### 3.4. Terminal Logs
For displaying the agent's internal thought process.
```tsx
<div className="font-mono text-xs">
  <span className="text-slate-600">[{timestamp}]</span>{' '}
  <span className="text-green-400">{message}</span>
</div>
```

### 3.5. Action Buttons
Geometric, slightly uppercase, high contrast.
```tsx
<button className="rounded bg-blue-600 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-blue-500">
  Initialize
</button>
```

---

## 4. Layout Structure

### Dashboard Grid
The main view uses a CSS Grid layout to maximize screen real estate utilization.

*   **Sidebar:** Fixed width (`w-16`), persistent navigation.
*   **Header:** Slim height (`h-14`), global status.
*   **Content Area:** Flexible grid (`grid-cols-12`).

### Panel Hierarchy
1.  **Search/Command (Top-Left):** Primary input.
2.  **Planner (Top-Right):** Structural overview (Tree view).
3.  **Live Report (Center):** The main output artifact.
4.  **Source Feed (Bottom-Right):** Raw data ingestion stream.
5.  **Terminal (Bottom-Overlay):** Real-time system logs.

---

## 5. Animation & Micro-interactions

*   **Pulse:** Use `animate-pulse` for active data ingestion or processing states.
*   **Blink:** Custom blinking cursor for the "typing" effect in the report view.
*   **Transitions:** Fast and subtle (`duration-200`) for hover states on buttons and list items.
