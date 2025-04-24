
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../sidebar-context";
import { SidebarHeader, SidebarContent, SidebarFooter } from "./sidebar-group";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { open, openMobile, setOpenMobile, isMobile } = useSidebar();
    
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && openMobile) {
          setOpenMobile(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [openMobile, setOpenMobile]);

    return (
      <>
        <div
          data-state={open ? "open" : "closed"}
          data-mobile={openMobile ? "true" : "false"}
          className={cn(
            "fixed left-0 top-0 z-20 h-screen w-sidebar-width bg-sidebar shadow-sm transition-transform duration-300 ease-in-out data-[state=closed]:w-sidebar-width-icon data-[mobile=true]:translate-x-0 data-[mobile=false]:-translate-x-full md:relative md:shadow-none md:data-[mobile=false]:translate-x-0",
            className
          )}
          ref={ref}
          {...props}
        >
          <div className="flex h-full flex-col overflow-hidden">
            {children}
          </div>
        </div>
        {isMobile && openMobile && (
          <div
            className="fixed inset-0 z-10 bg-black/50"
            onClick={() => setOpenMobile(false)}
          />
        )}
      </>
    );
  }
);
Sidebar.displayName = "Sidebar";

export { SidebarHeader, SidebarContent, SidebarFooter };
