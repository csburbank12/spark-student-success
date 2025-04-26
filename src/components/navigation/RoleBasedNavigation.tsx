
import React from 'react';
import { UserRole } from "@/types/roles";
import { NavMenu } from "@/components/layout/navigation/NavMenu";
import { useAuth } from "@/contexts/AuthContext";
import { adminRoutes } from "@/components/layout/routes/adminRoutes";
import { teacherAdminRoutes } from "@/components/layout/routes/teacherAdminRoutes";
import { studentRoutes } from "@/components/layout/routes/studentRoutes";
import { parentRoutes } from "@/components/layout/routes/parentRoutes";
import { universalRoutes } from "@/components/layout/routes/universalRoutes";
import { useRouter } from "@/components/ui/router";
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
  const { navigate } = useRouter();
  const userRole = user?.role as UserRole || "";
  
  const handleNavigation = (route: Route) => {
    if (route.isDisabled) {
      toast.info("This feature is coming soon!");
      return;
    }
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
      default:
        return [];
    }
  };

  const roleSpecificRoutes = getRoleSpecificRoutes();
  const allRoutes = [...roleSpecificRoutes, ...universalRoutes] as Route[];

  return (
    <div className="space-y-6">
      <NavMenu routes={allRoutes} onNavigate={handleNavigation} />
    </div>
  );
};
