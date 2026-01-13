import { render, screen, fireEvent } from "@testing-library/react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "../dialog"
import { expect, it, describe, vi } from "vitest"

// Mock Portal to avoid DOM issues in tests
vi.mock("@radix-ui/react-dialog", async () => {
  const actual = await vi.importActual("@radix-ui/react-dialog")
  return {
    ...actual,
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe("Dialog", () => {
  it("opens content when trigger is clicked", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    )
    
    expect(screen.queryByText("Dialog Title")).toBeNull()
    
    fireEvent.click(screen.getByText("Open"))
    
    expect(await screen.findByText("Dialog Title")).toBeDefined()
  })
})
