
import React from 'react';
import { UserRole } from "@/types/roles";
import { NavMenu } from "@/components/layout/navigation/NavMenu";
import { useAuth } from "@/contexts/AuthContext";
import { adminRoutes } from "@/components/layout/routes/adminRoutes";
import { teacherAdminRoutes } from "@/components/layout/routes/teacherAdminRoutes";
import { studentRoutes } from "@/components/layout/routes/studentRoutes";
import { parentRoutes } from "@/components/layout/routes/parentRoutes";
import { universalRoutes } from "@/components/layout/routes/universalRoutes";
import { wellLensRoutes, profileRoutes } from "@/components/layout/sidebarRoutes";

export const RoleBasedNavigation: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.role as UserRole || "";
  
  // Determine which routes to show based on user role
  const getRoleSpecificRoutes = () => {
    switch (userRole) {
      case UserRole.admin:
        return [...adminRoutes, ...wellLensRoutes];
      case UserRole.teacher:
      case UserRole.staff:
        return [...teacherAdminRoutes, ...wellLensRoutes];
      case UserRole.student:
        return studentRoutes;
      case UserRole.parent:
        return parentRoutes;
      default:
        return [];
    }
  };

  const roleSpecificRoutes = getRoleSpecificRoutes();
  const allRoutes = [...roleSpecificRoutes, ...profileRoutes];

  return (
    <div className="space-y-6">
      <NavMenu routes={allRoutes} />
      
      {/* Universal routes section (divider + universal links) */}
      <div className="px-3 py-2">
        <div className="h-px bg-muted my-4" />
        <NavMenu routes={universalRoutes} />
      </div>
    </div>
  );
};
