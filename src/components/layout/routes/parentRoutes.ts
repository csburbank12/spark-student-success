
import {
  Activity,
  Heart,
  MessageSquare,
  BookOpen,
  Shield,
  FileText,
  User,
  Users,
  Calendar,
} from "lucide-react";

export const parentRoutes = [
  {
    name: "Dashboard",
    href: "/parent-dashboard",
    icon: Activity,
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
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
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
    name: "Data Access",
    href: "/data-access",
    icon: FileText,
  },
  {
    name: "My Profile",
    href: "/profile",
    icon: User,
  }
];
