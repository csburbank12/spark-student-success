
import { Home, HelpCircle, Settings, UserCircle, LogOut } from "lucide-react";

export const universalRoutes = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircle, 
  },
  {
    name: "User Profiles",
    href: "/profiles",
    icon: UserCircle,
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
