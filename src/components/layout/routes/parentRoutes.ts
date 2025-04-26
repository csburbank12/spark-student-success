
import {
  LayoutDashboard,
  Users,
  Activity,
  Heart,
  Calendar,
  BookOpen,
  Shield,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export const parentRoutes = [
  {
    name: "Dashboard",
    href: "/parent-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Children",
    href: "/my-children",
    icon: Users,
  },
  {
    name: "Child Activity",
    href: "/child-activity",
    icon: Activity,
  },
  {
    name: "Child Wellness",
    href: "/child-wellness",
    icon: Heart,
  },
  {
    name: "Meetings & Events",
    href: "/meetings",
    icon: Calendar,
  },
  {
    name: "Resources",
    href: "/parent-resources",
    icon: BookOpen,
  },
  {
    name: "Privacy Settings",
    href: "/privacy-settings",
    icon: Shield,
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
