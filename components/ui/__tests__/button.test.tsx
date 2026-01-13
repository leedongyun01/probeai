import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "../button"
import { expect, it, describe, vi } from "vitest"

describe("Button", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeDefined()
    expect(button.className).toContain("bg-primary")
  })

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole("button", { name: /delete/i })
    expect(button.className).toContain("bg-destructive")
  })

  it("handles click events", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })
})
