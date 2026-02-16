"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, variant = "default", onClose }, ref) => {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onClose(id);
      }, 5000);

      return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border shadow-lg transition-all duration-300",
          "animate-in slide-in-from-right",
          {
            "bg-white border-gray-200": variant === "default",
            "bg-green-50 border-green-200": variant === "success",
            "bg-red-50 border-red-200": variant === "error",
            "bg-yellow-50 border-yellow-200": variant === "warning",
          }
        )}
      >
        <div className="flex items-start gap-3 p-4">
          <div className="flex-1">
            {title && (
              <div
                className={cn("font-semibold text-sm mb-1", {
                  "text-gray-900": variant === "default",
                  "text-green-900": variant === "success",
                  "text-red-900": variant === "error",
                  "text-yellow-900": variant === "warning",
                })}
              >
                {title}
              </div>
            )}
            {description && (
              <div
                className={cn("text-sm", {
                  "text-gray-600": variant === "default",
                  "text-green-700": variant === "success",
                  "text-red-700": variant === "error",
                  "text-yellow-700": variant === "warning",
                })}
              >
                {description}
              </div>
            )}
          </div>
          <button
            onClick={() => onClose(id)}
            className={cn(
              "rounded-md p-1 transition-colors hover:bg-gray-100",
              {
                "text-gray-500": variant === "default",
                "text-green-500 hover:bg-green-100": variant === "success",
                "text-red-500 hover:bg-red-100": variant === "error",
                "text-yellow-500 hover:bg-yellow-100": variant === "warning",
              }
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast };
