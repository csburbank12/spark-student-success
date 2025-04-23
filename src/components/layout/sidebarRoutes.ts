
import {
  LayoutDashboard,
  BarChartBig,
  GraduationCap,
  Target,
  Headphones,
  ClipboardCheck,
  BrainCircuit,
  Calendar,
  Heart,
  FileText,
  Users,
  School,
  Activity,
  Settings,
  MessageSquare,
  BookOpen,
} from "lucide-react";

export const teacherAdminRoutes = [
  {
    name: "Dashboard",
    href: "/teacher-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Enhanced Dashboard",
    href: "/teacher-dashboard-enhanced",
    icon: BarChartBig,
  },
  {
    name: "Students",
    href: "/students",
    icon: GraduationCap,
  },
  {
    name: "SEL Pathways",
    href: "/sel-pathways",
    icon: Target,
  },
  {
    name: "Staff Assist Mode",
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
    name: "Emotion Scheduling",
    href: "/emotion-aware-scheduling",
    icon: Calendar,
  },
];

export const studentRoutes = [
  {
    name: "Dashboard",
    href: "/student-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Enhanced Dashboard",
    href: "/student-dashboard-enhanced",
    icon: BarChartBig,
  },
  {
    name: "SEL Pathways",
    href: "/sel-pathways",
    icon: Target,
  },
  {
    name: "Check-In",
    href: "/check-in",
    icon: ClipboardCheck,
  },
  {
    name: "Mental Health Toolkit",
    href: "/mental-health-toolkit",
    icon: Heart,
  },
  {
    name: "Digital Journal",
    href: "/digital-journal",
    icon: FileText,
  },
  {
    name: "Reset Room",
    href: "/reset-room",
    icon: Heart,
  },
  {
    name: "Trusted Adults",
    href: "/trusted-adults",
    icon: Users,
  },
];

export const adminRoutes = [
  {
    name: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Enhanced Dashboard",
    href: "/admin-dashboard-enhanced",
    icon: BarChartBig,
  },
  {
    name: "School Management",
    href: "/school-management",
    icon: School,
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: Users,
  },
  {
    name: "Data Analytics",
    href: "/data-analytics",
    icon: Activity,
  },
  {
    name: "System Settings",
    href: "/system-settings",
    icon: Settings,
  },
];

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
];
