
import {
  Activity,
  Heart,
  MessageSquare,
  BookOpen,
  Shield,
  FileText
} from "lucide-react";

export const parentRoutes = [
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
