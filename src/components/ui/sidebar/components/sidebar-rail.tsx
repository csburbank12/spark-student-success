
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../sidebar-context";

export const SidebarRail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, toggleSidebar, isMobile } = useSidebar();

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={ref}
      data-variant="rail"
      data-state={open ? "open" : "closed"}
      className={cn(
        "hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:h-screen md:w-1.5 md:flex-col md:items-center",
        className
      )}
      onClick={toggleSidebar}
      {...props}
    >
      <div className="flex h-full w-full cursor-ew-resize items-center justify-center hover:bg-sidebar-accent/20" />
    </div>
  );
});
SidebarRail.displayName = "SidebarRail";
