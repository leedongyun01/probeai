import { render, screen } from "@testing-library/react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../card"
import { expect, it, describe } from "vitest"

describe("Card", () => {
  it("renders card structure correctly", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )
    
    expect(screen.getByText("Card Title")).toBeDefined()
    expect(screen.getByText("Card content")).toBeDefined()
    expect(screen.getByRole("button", { name: /action/i })).toBeDefined()
  })
})
