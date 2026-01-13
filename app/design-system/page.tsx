import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold">Design System</h1>
          <p className="text-muted-foreground mt-2">Core components and tokens for ProbeAI.</p>
        </div>
        <ModeToggle />
      </div>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-background border border-border shadow-sm"></div>
                <p className="text-xs font-medium">Background</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs">Primary</div>
                <p className="text-xs font-medium">Primary</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center text-xs">Secondary</div>
                <p className="text-xs font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-muted text-muted-foreground flex items-center justify-center text-xs">Muted</div>
                <p className="text-xs font-medium">Muted</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-destructive text-destructive-foreground flex items-center justify-center text-xs">Destructive</div>
                <p className="text-xs font-medium">Destructive</p>
            </div>
            <div className="space-y-2">
                <div className="h-20 rounded-md bg-card text-card-foreground border border-border flex items-center justify-center text-xs">Card</div>
                <p className="text-xs font-medium">Card</p>
            </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Search className="h-4 w-4" /></Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Inputs</h2>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Input</label>
              <Input placeholder="Type something..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Input with Icon</label>
              <Input placeholder="Search..." startIcon={<Search className="h-4 w-4" />} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Error State</label>
              <Input placeholder="Invalid value" error />
              <p className="text-xs text-destructive">This field is required.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Containers</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Example Card</CardTitle>
                <CardDescription>This is a description for the card.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Cards provide a flexible container for content. They can include headers, footers, and various types of content.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>

            <div className="p-4 border border-dashed border-border rounded-lg flex items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Modal Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Modal Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog uses Radix UI primitives for full accessibility, including focus trapping and screen reader support.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm">Dialog content goes here. You can put anything inside, including forms and other components.</p>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Confirm Action</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
