
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
  // Common dashboards for different roles
  {
    title: "Student Dashboard",
    href: "/student-dashboard",
    icon: "LayoutDashboard",
    roles: [UserRole.student],
  },
  {
    title: "Parent Dashboard",
    href: "/parent-dashboard",
    icon: "LayoutDashboard",
    roles: [UserRole.parent],
  },
  {
    title: "Teacher Dashboard",
    href: "/teacher-dashboard",
    icon: "LayoutDashboard",
    roles: [UserRole.teacher],
  },
  {
    title: "Counselor Dashboard",
    href: "/counselor-dashboard",
    icon: "LayoutDashboard",
    roles: [UserRole.counselor],
  },
  {
    title: "Admin Dashboard",
    href: "/admin-dashboard",
    icon: "LayoutDashboard",
    roles: [UserRole.admin],
  },
  {
    title: "Staff Dashboard",
    href: "/staff-dashboard",
    icon: "LayoutDashboard",
    roles: [UserRole.staff],
  },
  
  // Analytics section - primarily for admin and staff
  {
    title: "Analytics",
    href: "/analytics",
    icon: "BarChart4",
    roles: [UserRole.admin, UserRole.staff],
  },
  
  // Student Success section - for educators
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
  
  // Student Support section - for educators
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
  
  // Student-specific sections
  {
    title: "My Check-Ins",
    href: "/check-in",
    icon: "Heart",
    roles: [UserRole.student],
  },
  {
    title: "SEL Journeys",
    href: "/sel-pathways",
    icon: "BookOpen",
    roles: [UserRole.student],
  },
  {
    title: "My Journal",
    href: "/digital-journal",
    icon: "FileText",
    roles: [UserRole.student],
  },
  {
    title: "Reset Room",
    href: "/reset-room",
    icon: "Armchair",
    roles: [UserRole.student],
  },
  {
    title: "Trusted Adults",
    href: "/trusted-adults",
    icon: "Users",
    roles: [UserRole.student],
  },
  
  // Parent-specific sections
  {
    title: "My Children",
    href: "/my-children",
    icon: "Users",
    roles: [UserRole.parent],
  },
  {
    title: "Child Activity",
    href: "/child-activity",
    icon: "Activity",
    roles: [UserRole.parent],
  },
  {
    title: "Child Wellness",
    href: "/child-wellness",
    icon: "Heart",
    roles: [UserRole.parent],
  },
  {
    title: "Meetings & Events",
    href: "/meetings",
    icon: "Calendar",
    roles: [UserRole.parent],
  },
  {
    title: "Parent Resources",
    href: "/parent-resources",
    icon: "BookOpen",
    roles: [UserRole.parent],
  },
  
  // Admin tools section - admin only
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
  
  // Common sections for all roles
  {
    title: "Messages",
    href: "/messages",
    icon: "MessageSquare",
    roles: [UserRole.admin, UserRole.staff, UserRole.teacher, UserRole.counselor, UserRole.student, UserRole.parent],
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
