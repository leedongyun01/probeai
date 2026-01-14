"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { BrainCircuit } from "lucide-react";

interface GlobalShellProps {
  children: React.ReactNode;
}

export function GlobalShell({ children }: GlobalShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top-Left Logo */}
      <header className="fixed top-0 left-0 z-50 p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <BrainCircuit className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
            ProbeAI
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="min-h-screen pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Bottom-Left Theme Toggle */}
      <div className="fixed bottom-0 left-0 z-50 p-6">
        <ModeToggle />
      </div>
    </div>
  );
}
