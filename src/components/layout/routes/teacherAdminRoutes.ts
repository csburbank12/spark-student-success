
import {
  GraduationCap,
  Target,
  Headphones,
  ClipboardCheck,
  BrainCircuit,
  Calendar,
  BarChart3
} from "lucide-react";

export const teacherAdminRoutes = [
  {
    name: "Dashboard",
    href: "/teacher-dashboard",
    icon: BarChart3,
  },
  {
    name: "Students",
    href: "/students",
    icon: GraduationCap,
  },
  {
    name: "SEL Activities",
    href: "/sel-pathway-management",
    icon: Target,
  },
  {
    name: "Staff Assist",
    href: "/staff-assist",
    icon: Headphones,
  },
  {
    name: "Check-In",
    href: "/check-in",
    icon: ClipboardCheck,
  },
  {
    name: "Predictive Support",
    href: "/predictive-support",
    icon: BrainCircuit,
  },
  {
    name: "Scheduling",
    href: "/emotion-aware-scheduling",
    icon: Calendar,
  },
];
