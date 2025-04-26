
import { Settings, Bell, User, MessageSquare, HelpCircle } from "lucide-react";

export const universalRoutes = [
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    name: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
