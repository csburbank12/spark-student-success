
import {
  LayoutDashboard,
  Target,
  ClipboardCheck,
  Heart,
  FileText,
  Users,
  User,
  Settings,
  HelpCircle,
  Armchair,
} from "lucide-react";

export const studentRoutes = [
  {
    name: "Dashboard",
    href: "/student-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "SEL Pathways",
    href: "/sel-pathways",
    icon: Target,
  },
  {
    name: "Daily Check-In",
    href: "/check-in",
    icon: ClipboardCheck,
  },
  {
    name: "Wellness Tools",
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
    icon: Armchair,
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
