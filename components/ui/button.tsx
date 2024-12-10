import * as React from "react"
import { cn } from "@/lib/ut"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}>(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "",
        variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "",
        variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : "",
        variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : "",
        size === "default" ? "h-10 px-4 py-2" : "",
        size === "sm" ? "h-9 rounded-md px-3" : "",
        size === "lg" ? "h-11 rounded-md px-8" : "",
        size === "icon" ? "h-10 w-10 p-0" : "",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }

