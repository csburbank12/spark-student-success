
import {
  LayoutDashboard,
  BarChartBig,
  Activity,
  Heart,
  MessageSquare,
  BookOpen,
  User,
} from "lucide-react";

export const parentRoutes = [
  {
    name: "Dashboard",
    href: "/parent-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Enhanced Dashboard",
    href: "/parent-dashboard-enhanced",
    icon: BarChartBig,
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
    name: "Resources",
    href: "/parent-resources",
    icon: BookOpen,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];
