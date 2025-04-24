
import { UserRole } from "@/types/roles";
import { universalRoutes } from "./routes/universalRoutes";
import { teacherAdminRoutes } from "./routes/teacherAdminRoutes";
import { studentRoutes } from "./routes/studentRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { parentRoutes } from "./routes/parentRoutes";

export {
  universalRoutes,
  teacherAdminRoutes,
  studentRoutes,
  adminRoutes,
  parentRoutes,
};

export const getRoutesByRole = (role: string) => {
  switch (role) {
    case UserRole.teacher:
    case UserRole.staff:
      return teacherAdminRoutes;
    case UserRole.student:
      return studentRoutes;
    case UserRole.admin:
      return adminRoutes;
    case UserRole.parent:
      return parentRoutes;
    default:
      return [];
  }
};
