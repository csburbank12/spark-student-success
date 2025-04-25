
import { 
  Users, 
  BarChart3, 
  School, 
  Shield, 
  Settings, 
  Keyboard, 
  ScanSearch, 
  AlertCircle 
} from "lucide-react";

export const adminRoutes = [
  {
    name: "User Management",
    href: "/admin/user-management",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/admin/data-analytics",
    icon: BarChart3,
  },
  {
    name: "Schools",
    href: "/admin/school-management",
    icon: School,
  },
  {
    name: "Compliance",
    href: "/admin/ferpa-compliance",
    icon: Shield,
  },
  {
    name: "System",
    href: "/admin/system-settings",
    icon: Settings,
  },
  {
    name: "LoopBot",
    href: "/admin/loopbot-logs",
    icon: Keyboard,
  },
  {
    name: "Audit",
    href: "/admin/audit-dashboard",
    icon: ScanSearch,
  },
  {
    name: "Error Logs",
    href: "/admin/error-logs",
    icon: AlertCircle,
  },
];
