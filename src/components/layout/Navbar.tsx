
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar/components/sidebar-trigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-navbar px-4 md:px-6 backdrop-blur-sm">
      {isMobile && <SidebarTrigger />}
      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          {user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard` : 'Dashboard'}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Placeholder for future navbar items */}
      </div>
    </div>
  );
};
