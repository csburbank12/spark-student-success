
import React from 'react';
import { UserRole } from "@/types/roles";
import { NavMenu } from "@/components/layout/navigation/NavMenu";
import { useAuth } from "@/contexts/AuthContext";
import { adminRoutes } from "@/components/layout/routes/adminRoutes";
import { teacherAdminRoutes } from "@/components/layout/routes/teacherAdminRoutes";
import { studentRoutes } from "@/components/layout/routes/studentRoutes";
import { parentRoutes } from "@/components/layout/routes/parentRoutes";
import { counselorRoutes } from "@/components/layout/routes/counselorRoutes";
import { universalRoutes } from "@/components/layout/routes/universalRoutes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Route {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
  isDisabled?: boolean;
}

export const RoleBasedNavigation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role as UserRole || "";
  
  const handleNavigation = (route: Route) => {
    if (route.isDisabled) {
      toast.info(`${route.name} is coming soon!`);
      return;
    }
    
    // Use navigate instead of direct window location change
    navigate(route.href);
  };
  
  const getRoleSpecificRoutes = () => {
    switch (userRole) {
      case UserRole.admin:
        return adminRoutes;
      case UserRole.teacher:
      case UserRole.staff:
        return teacherAdminRoutes;
      case UserRole.student:
        return studentRoutes;
      case UserRole.parent:
        return parentRoutes;
      case UserRole.counselor:
        return counselorRoutes;
      default:
        return [];
    }
  };

  const roleSpecificRoutes = getRoleSpecificRoutes();

  return (
    <div className="space-y-6 pt-2 relative z-10">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Navigation
        </h2>
        <NavMenu routes={roleSpecificRoutes} onNavigate={handleNavigation} className="relative z-20" />
      </div>
      
      <div className="px-3 py-2 border-t border-border/30 pt-6">
        <h2 className="mb-2 px-4 text-sm font-medium tracking-tight text-muted-foreground">
          Account
        </h2>
        <NavMenu routes={universalRoutes} onNavigate={handleNavigation} className="relative z-20" />
      </div>
    </div>
  );
};
