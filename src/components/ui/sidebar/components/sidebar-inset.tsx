
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../sidebar-context";

export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {
  enableScroll?: boolean;
}

export const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, enableScroll = false, ...props }, ref) => {
    const { open } = useSidebar();

    return (
      <div
        ref={ref}
        data-variant="inset"
        data-state={open ? "open" : "closed"}
        className={cn(
          "z-10 flex min-h-screen flex-1 flex-col transition-[margin,width] duration-300 data-[state=open]:ml-sidebar-width data-[state=closed]:ml-sidebar-width-icon",
          enableScroll && "overflow-y-auto",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarInset.displayName = "SidebarInset";
