
import {
  LayoutDashboard,
  AlertCircle,
  Heart,
  Clipboard,
  Calendar,
  BookOpen,
  User,
  Settings,
  HelpCircle
} from "lucide-react";

export const counselorRoutes = [
  {
    name: "Dashboard",
    href: "/counselor-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Students at Risk",
    href: "/students-at-risk",
    icon: AlertCircle,
  },
  {
    name: "Wellness Monitoring",
    href: "/wellness-monitoring",
    icon: Heart,
  },
  {
    name: "Student Check-ins",
    href: "/counselor-check-ins",
    icon: Clipboard,
  },
  {
    name: "Appointment Calendar",
    href: "/appointment-calendar",
    icon: Calendar,
  },
  {
    name: "Resources",
    href: "/counselor-resources",
    icon: BookOpen,
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
