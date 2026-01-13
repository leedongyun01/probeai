// Component API Contracts (Props)

import * as React from "react"

// Button Component
// FR-003: variant, size, icons
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean // For Radix Slot composition
}

// Input Component
// FR-004: error, disabled, start/end icons
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

// Card Component
// FR-005: generic container
export type CardProps = React.HTMLAttributes<HTMLDivElement>
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

// Modal Component
// FR-006: focus trapping, backdrop (handled by internal logic, exposed via simple props)
export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}
export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

// Theme Context
// FR-007, FR-008: System preference, Persistence
export type Theme = "dark" | "light" | "system"

export interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}
