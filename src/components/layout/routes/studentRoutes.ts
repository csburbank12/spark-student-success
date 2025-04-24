import {
  LayoutDashboard,
  BarChartBig,
  Target,
  ClipboardCheck,
  Heart,
  FileText,
  Users,
  User,
} from "lucide-react";

export const studentRoutes = [
  {
    name: "Dashboard",
    href: "/student-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Enhanced Dashboard",
    href: "/student-dashboard-enhanced",
    icon: BarChartBig,
  },
  {
    name: "SEL Pathways",
    href: "/sel-pathways",
    icon: Target,
  },
  {
    name: "Check-In",
    href: "/check-in",
    icon: ClipboardCheck,
  },
  {
    name: "Mental Health Toolkit",
    href: "/mental-health-toolkit",
    icon: Heart,
  },
  {
    name: "Digital Journal",
    href: "/digital-journal",
    icon: FileText,
  },
  {
    name: "Reset Room",
    href: "/reset-room",
    icon: Heart,
  },
  {
    name: "Trusted Adults",
    href: "/trusted-adults",
    icon: Users,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default studentRoutes;
