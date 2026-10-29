import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-input bg-white px-3 py-1 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ocean focus-visible:ring-[3px] focus-visible:ring-ocean/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
