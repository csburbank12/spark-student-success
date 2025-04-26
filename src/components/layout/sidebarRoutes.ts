
import { UserRole } from "@/types/roles";

export interface SidebarRoute {
  title: string;
  href: string;
  icon?: string;
  roles: UserRole[];
  submenu?: {
    title: string;
    href: string;
    icon?: string;
    beta?: boolean;
  }[];
  beta?: boolean;
  external?: boolean;
}

export const sidebarRoutes: SidebarRoute[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    roles: [UserRole.admin, UserRole.staff, UserRole.teacher, UserRole.counselor],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: "BarChart4",
    roles: [UserRole.admin],
  },
  {
    title: "Student Success",
    href: "#",
    icon: "Users2",
    roles: [UserRole.admin, UserRole.staff, UserRole.teacher, UserRole.counselor],
    submenu: [
      {
        title: "Student Profiles",
        href: "/students",
        icon: "User",
      },
      {
        title: "Students At Risk",
        href: "/students-at-risk",
        icon: "AlertCircle",
      },
      {
        title: "Behavior Prediction",
        href: "/behavior-prediction",
        icon: "Brain",
      },
      {
        title: "Emotion-Aware Scheduling",
        href: "/emotion-aware-scheduling",
        icon: "CalendarClock",
        beta: true,
      },
    ],
  },
  {
    title: "Student Support",
    href: "#",
    icon: "HeartHandshake",
    roles: [UserRole.teacher, UserRole.admin, UserRole.staff, UserRole.counselor],
    submenu: [
      {
        title: "Well-Being Dashboard",
        href: "/well-lens",
        icon: "Activity",
      },
      {
        title: "Student Support Heatmap",
        href: "/student-support-heatmap",
        icon: "GridIcon",
        beta: true,
      },
      {
        title: "Predictive Support",
        href: "/predictive-support",
        icon: "Lightbulb",
      },
      {
        title: "SEL Pathways",
        href: "/sel-pathways-management", 
        icon: "Footprints",
      },
    ],
  },
  {
    title: "Admin Tools",
    href: "#",
    icon: "Settings",
    roles: [UserRole.admin],
    submenu: [
      {
        title: "User Management",
        href: "/admin/users",
        icon: "UserCog",
      },
      {
        title: "System Configuration",
        href: "/admin/system",
        icon: "SlidersHorizontal",
      },
      {
        title: "Data Management",
        href: "/admin/data",
        icon: "Database",
      },
    ],
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: "HelpCircle",
    roles: [UserRole.admin, UserRole.staff, UserRole.teacher, UserRole.counselor, UserRole.student, UserRole.parent],
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: "UserCircle",
    roles: [UserRole.admin, UserRole.staff, UserRole.teacher, UserRole.counselor, UserRole.student, UserRole.parent],
  },
];
