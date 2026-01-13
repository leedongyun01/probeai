# Quickstart Guide: Global Theming

## 1. Enable Theming

Ensure the `ThemeProvider` is wrapping your application in `app/layout.tsx`:

```tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 2. Using the Theme Hook

```tsx
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <button onClick={() => setTheme("light")}>
      Light Mode
    </button>
  )
}
```

## 3. Using Components

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  return (
    <div className="space-y-4">
      <Input type="email" placeholder="Email" />
      <Button variant="default">Login</Button>
    </div>
  )
}
```

## 4. Adding a New Color

1.  Open `app/globals.css`.
2.  Add the variable to `:root` (light mode) and `.dark` (dark mode).
3.  Add the color to `tailwind.config.ts` (if using v3 config) or use it directly in CSS (v4).

```css
/* app/globals.css */
:root {
  --brand-color: #3b82f6;
}
.dark {
  --brand-color: #60a5fa;
}
```

```tsx
// Usage
<div className="bg-[var(--brand-color)]" />
// OR if mapped in config
<div className="bg-brand" />
```
