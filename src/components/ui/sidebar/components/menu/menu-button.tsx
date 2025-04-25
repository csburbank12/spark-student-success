
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { useSidebar } from "../../sidebar-context";

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: React.ReactNode;
  isActive?: boolean;
  asChild?: boolean;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, tooltip, isActive, asChild = false, ...props }, ref) => {
  const { state } = useSidebar();
  const Comp = asChild ? Slot : "button";

  if (tooltip && state === "collapsed") {
    return (
      <Tooltip content={tooltip}>
        <Comp
          ref={ref}
          type="button"
          className={cn(
            "group flex w-full select-none items-center gap-2 rounded-md px-3 py-2 text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:bg-sidebar-accent/50 [&>svg]:size-5 [&>svg]:shrink-0",
            isActive &&
              "bg-sidebar-accent/50 text-sidebar-accent-foreground",
            className
          )}
          {...props}
        />
      </Tooltip>
    );
  }

  return (
    <Comp
      ref={ref}
      type="button"
      className={cn(
        "group flex w-full select-none items-center gap-2 rounded-md px-3 py-2 text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:bg-sidebar-accent/50 [&>svg]:size-5 [&>svg]:shrink-0",
        isActive &&
          "bg-sidebar-accent/50 text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";
