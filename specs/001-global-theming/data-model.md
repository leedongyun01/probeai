# Data Model: Design System Tokens

## Color Palette (Semantic)

Stored as CSS Variables, toggled via `.dark` class.

| Semantic Role | Token Name | Light Value | Dark Value | Usage |
|---|---|---|---|---|
| **Background** | `--background` | `#ffffff` | `#09090b` | Page background |
| **Foreground** | `--foreground` | `#09090b` | `#fafafa` | Default text |
| **Primary** | `--primary` | `#18181b` | `#fafafa` | Main actions |
| **Primary FG** | `--primary-foreground` | `#fafafa` | `#18181b` | Text on primary |
| **Secondary** | `--secondary` | `#f4f4f5` | `#27272a` | Secondary actions |
| **Secondary FG**| `--secondary-foreground`| `#18181b` | `#fafafa` | Text on secondary |
| **Destructive** | `--destructive` | `#ef4444` | `#7f1d1d` | Dangerous actions |
| **Destructive FG**|`--destructive-foreground`|`#fafafa`| `#fafafa` | Text on destructive |
| **Warning** | `--warning` | `#f59e0b` | `#fbbf24` | Alerts/Caution |
| **Muted** | `--muted` | `#f4f4f5` | `#27272a` | Disabled/Subtle |
| **Muted FG** | `--muted-foreground` | `#71717a` | `#a1a1aa` | Hints/Placeholders |
| **Border** | `--border` | `#e4e4e7` | `#27272a` | Component borders |
| **Input** | `--input` | `#e4e4e7` | `#27272a` | Input borders |
| **Ring** | `--ring` | `#18181b` | `#d4d4d8` | Focus rings |

## Typography (T-Shirt Sizes)

| Token Name | Class | Size | Line Height | Usage |
|---|---|---|---|---|
| **Text XS** | `text-xs` | 0.75rem | 1rem | Captions |
| **Text SM** | `text-sm` | 0.875rem | 1.25rem | Small text |
| **Text Base** | `text-base` | 1rem | 1.5rem | Body text |
| **Text LG** | `text-lg` | 1.125rem | 1.75rem | Large body/Subtitle |
| **Text XL** | `text-xl` | 1.25rem | 1.75rem | Heading 4 |
| **Text 2XL** | `text-2xl` | 1.5rem | 2rem | Heading 3 |
| **Text 3XL** | `text-3xl` | 1.875rem | 2.25rem | Heading 2 |
| **Text 4XL** | `text-4xl` | 2.25rem | 2.5rem | Heading 1 |

## Border Radius

| Token Name | Class | Value |
|---|---|---|
| **Radius SM** | `rounded-sm` | `calc(var(--radius) - 2px)` |
| **Radius MD** | `rounded-md` | `var(--radius)` (Default: 0.5rem) |
| **Radius LG** | `rounded-lg` | `calc(var(--radius) + 2px)` |
| **Radius Full** | `rounded-full`| `9999px` (Pill) |
| **Radius None** | `rounded-none`| `0px` |

## Component States

### Button
*   **Variant**: Primary, Secondary, Destructive, Outline, Ghost, Link.
*   **Size**: sm, md (default), lg, icon.
*   **State**: Enabled, Disabled, Hover, Focus-Visible.

### Input
*   **State**: Default, Focus, Error, Disabled.
*   **Attributes**: type, placeholder, value, onChange.

### Theme Preference
*   **Values**: `light`, `dark`, `system`.
*   **Storage**: `localStorage` key `theme`.
