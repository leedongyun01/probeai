import { render, screen } from "@testing-library/react"
import { Input } from "../input"
import { expect, it, describe } from "vitest"

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeDefined()
  })

  it("applies error styles", () => {
    render(<Input error placeholder="Error input" />)
    const input = screen.getByPlaceholderText("Error input")
    expect(input.className).toContain("border-destructive")
  })

  it("renders with icons", () => {
    render(
      <Input 
        startIcon={<span data-testid="start-icon">S</span>} 
        endIcon={<span data-testid="end-icon">E</span>} 
      />
    )
    expect(screen.getByTestId("start-icon")).toBeDefined()
    expect(screen.getByTestId("end-icon")).toBeDefined()
  })

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
})
