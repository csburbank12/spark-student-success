
import {
  LayoutDashboard,
  BarChartBig,
  GraduationCap,
  Target,
  Headphones,
  ClipboardCheck,
  BrainCircuit,
  Calendar,
  User,
} from "lucide-react";

export const teacherAdminRoutes = [
  {
    name: "Dashboard",
    href: "/teacher-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Enhanced Dashboard",
    href: "/teacher-dashboard-enhanced",
    icon: BarChartBig,
  },
  {
    name: "Students",
    href: "/students",
    icon: GraduationCap,
  },
  {
    name: "SEL Pathways",
    href: "/sel-pathway-management",
    icon: Target,
  },
  {
    name: "Staff Assist Mode",
    href: "/staff-assist",
    icon: Headphones,
  },
  {
    name: "Check-In",
    href: "/check-in",
    icon: ClipboardCheck,
  },
  {
    name: "Predictive Support",
    href: "/predictive-support",
    icon: BrainCircuit,
  },
  {
    name: "Emotion Scheduling",
    href: "/emotion-aware-scheduling",
    icon: Calendar,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];
