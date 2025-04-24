
import { UserRole } from "@/types/roles";
import { 
  universalRoutes, 
  teacherAdminRoutes, 
  studentRoutes, 
  adminRoutes, 
  parentRoutes 
} from "./routes/universalRoutes";
import { 
  BarChart3,
  Activity,
  LineChart,
  Search,
  Share2
} from "lucide-react";

// WellLens routes that should appear for teachers, admins, and staff
export const wellLensRoutes = [
  {
    name: "WellLens Dashboard",
    href: "/welllens",
    icon: Activity,
  },
  {
    name: "Predictive Support",
    href: "/predictive-support",
    icon: LineChart,
  },
  {
    name: "Emotion Scheduling",
    href: "/emotion-scheduling",
    icon: BarChart3,
  },
];

// Universal profile access routes for all users
export const profileRoutes = [
  {
    name: "User Profiles",
    href: "/profiles",
    icon: Search,
  },
  {
    name: "Shared Resources",
    href: "/shared-resources",
    icon: Share2,
  }
];

export {
  universalRoutes,
  teacherAdminRoutes,
  studentRoutes,
  adminRoutes,
  parentRoutes,
};

export const getRoutesByRole = (role: string) => {
  let routes = [];
  
  switch (role) {
    case UserRole.teacher:
    case UserRole.staff:
      routes = [...teacherAdminRoutes, ...wellLensRoutes];
      break;
    case UserRole.student:
      routes = studentRoutes;
      break;
    case UserRole.admin:
      routes = [...adminRoutes, ...wellLensRoutes];
      break;
    case UserRole.parent:
      routes = parentRoutes;
      break;
    default:
      routes = [];
  }
  
  // Add universal profile routes to all roles
  return [...routes, ...profileRoutes];
};
