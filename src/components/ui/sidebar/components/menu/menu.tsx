
import * as React from "react";
import { cn } from "@/lib/utils";

export const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 px-2 py-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("min-w-0 group/menu-item", className)}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";
