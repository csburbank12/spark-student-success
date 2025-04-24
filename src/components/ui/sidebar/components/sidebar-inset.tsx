
import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    variant?: "inset";
    enableScroll?: boolean;
  }
>(
  (
    {
      variant = "inset",
      enableScroll = true,
      className,
      children,
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
          "flex-1",
          // Only apply overflow-hidden if scrolling is not enabled
          !enableScroll && "overflow-hidden",
          className
        )}
        {...props}
      >
        {enableScroll ? (
          <ScrollArea className="h-full">{children}</ScrollArea>
        ) : (
          children
        )}
      </div>
    );
  }
);
SidebarInset.displayName = "SidebarInset";
