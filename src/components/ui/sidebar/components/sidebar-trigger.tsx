
import * as React from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../sidebar-context";

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, isMobile, openMobile } = useSidebar();
  
  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {isMobile ? <Menu /> : <PanelLeft />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";
