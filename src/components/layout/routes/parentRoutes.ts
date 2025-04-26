
import {
  LayoutDashboard,
  Users,
  Activity,
  Heart,
  MessageSquare,
  Calendar,
  BookOpen,
  Shield,
  FileText,
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
  }
];
