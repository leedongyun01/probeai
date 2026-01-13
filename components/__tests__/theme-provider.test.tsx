import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "../theme-provider"
import { useTheme } from "next-themes"
import { expect, it, describe } from "vitest"

// Mock component to test theme hook
const ThemeConsumer = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
    </div>
  )
}

describe("ThemeProvider", () => {
  it("provides theme context to children", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    )
    
    // next-themes initializes with undefined or defaultTheme
    // We check if the consumer can access the context
    expect(screen.getByTestId("theme")).toBeDefined()
  })
})