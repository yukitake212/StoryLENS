import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "accent";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center sharp-sm text-sm font-medium font-interface snappy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-red focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-story-ink text-story-paper hover:bg-signal-red hover:-translate-y-0.5": variant === "default",
            "border border-system-gray bg-transparent text-story-ink hover:bg-system-gray hover:border-story-ink": variant === "outline",
            "bg-signal-red text-story-paper hover:bg-[#b30000] hover:-translate-y-0.5": variant === "accent",
            "hover:bg-system-gray text-story-ink": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3 text-xs": size === "sm",
            "h-11 px-8 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

