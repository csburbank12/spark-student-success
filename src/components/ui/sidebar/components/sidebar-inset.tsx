
import * as React from "react";
import { cn } from "@/lib/utils";

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    variant?: "inset";
  }
>(
  (
    {
      variant = "inset",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-sidebar="inset"
        data-variant={variant}
        className={cn(
          "flex-1 overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarInset.displayName = "SidebarInset";

