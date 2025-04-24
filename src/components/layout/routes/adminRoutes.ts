
import {
  LayoutDashboard,
  BarChartBig,
  School,
  Users,
  Activity,
  AlertTriangle,
  Settings,
  User,
} from "lucide-react";

export const adminRoutes = [
  {
    name: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Enhanced Dashboard",
    href: "/admin-dashboard-enhanced",
    icon: BarChartBig,
  },
  {
    name: "School Management",
    href: "/school-management",
    icon: School,
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: Users,
  },
  {
    name: "Data Analytics",
    href: "/data-analytics",
    icon: Activity,
  },
  {
    name: "Error Logs",
    href: "/error-logs",
    icon: AlertTriangle,
  },
  {
    name: "System Settings",
    href: "/system-settings",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];
