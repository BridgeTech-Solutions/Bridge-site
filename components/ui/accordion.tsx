"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  children: React.ReactNode;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  type = "single",
  defaultValue,
  children,
  className,
}) => {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (defaultValue) return [defaultValue];
    return [];
  });

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      if (type === "single") {
        return prev.includes(value) ? [] : [value];
      } else {
        return prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ value, children, className }) => {
  return (
    <div className={cn("border-b border-gray-200", className)} data-value={value}>
      {children}
    </div>
  );
};

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionTrigger must be used within Accordion");

    const { openItems, toggleItem } = context;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (props as any)["data-value"] || "";
    const isOpen = openItems.includes(value);

    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-primary",
          className
        )}
        onClick={() => toggleItem(value)}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionContent must be used within Accordion");

    const { openItems } = context;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (props as any)["data-value"] || "";
    const isOpen = openItems.includes(value);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden text-sm transition-all animate-in slide-in-from-top-2",
          className
        )}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
