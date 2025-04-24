
import { Users, BarChart3, School, Settings, Shield, Keyboard } from "lucide-react";

export const adminRoutes = [
  {
    name: "User Management",
    href: "/admin/user-management",
    icon: Users,
  },
  {
    name: "Data Analytics",
    href: "/admin/data-analytics",
    icon: BarChart3,
  },
  {
    name: "School Management",
    href: "/admin/school-management",
    icon: School,
  },
  {
    name: "FERPA Compliance", // Add FERPA Compliance link
    href: "/admin/ferpa-compliance",
    icon: Shield,
  },
  {
    name: "System Settings",
    href: "/admin/system-settings",
    icon: Settings,
  },
  {
    name: "LoopBot Logs",
    href: "/admin/loopbot-logs",
    icon: Keyboard,
  },
];
