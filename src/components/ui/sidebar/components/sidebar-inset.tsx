
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../sidebar-context";

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  enableScroll?: boolean;
}

export const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, enableScroll = false, children, ...props }, ref) => {
    const { open, openMobile, isMobile } = useSidebar();

    return (
      <div
        ref={ref}
        data-variant="inset"
        data-state={open ? "open" : "closed"}
        data-mobile={openMobile ? "true" : "false"}
        className={cn(
          "relative z-10 flex h-screen flex-1 flex-col overflow-hidden transition-[margin] duration-300 ease-in-out",
          "md:ml-[var(--sidebar-width-icon)] md:data-[state=open]:ml-[var(--sidebar-width)]",
          enableScroll && "overflow-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarInset.displayName = "SidebarInset";
