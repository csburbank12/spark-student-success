
import {
  LayoutDashboard,
  GraduationCap,
  Target,
  ClipboardCheck,
  BrainCircuit,
  Calendar,
  Activity,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export const teacherAdminRoutes = [
  {
    name: "Dashboard",
    href: "/teacher-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    href: "/students",
    icon: GraduationCap,
  },
  {
    name: "SEL Activities",
    href: "/sel-pathway-management",
    icon: Target,
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
    name: "Scheduling",
    href: "/emotion-aware-scheduling",
    icon: Calendar,
  },
  {
    name: "Well-Being Dashboard",
    href: "/well-lens",
    icon: Activity,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  }
];
