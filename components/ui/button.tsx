import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "primary" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            // Variants
            "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl":
              variant === "default",
            "bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl":
              variant === "primary",
            "border-2 border-primary text-primary hover:bg-primary hover:text-white":
              variant === "outline",
            "bg-gray-100 text-gray-900 hover:bg-gray-200": variant === "secondary",
            "hover:bg-gray-100": variant === "ghost",
            // Sizes
            "h-11 px-8 py-2 text-sm": size === "default",
            "h-9 px-4 text-xs": size === "sm",
            "h-14 px-8 text-base": size === "lg",
            "h-11 w-11 p-0": size === "icon",
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
