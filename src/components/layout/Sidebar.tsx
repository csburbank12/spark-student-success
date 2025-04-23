
import React from "react";
import {
  LayoutDashboard,
  GraduationCap,
  Target,
  Headphones,
  ClipboardCheck,
  BarChartBig,
  BrainCircuit,
  Calendar,
  Settings,
  Users,
  School,
  Activity,
  Heart,
  FileText,
  MessageSquare,
  User,
  BookOpen,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Sidebar as SidebarContainer, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();

  const isTeacherOrAdmin =
    user?.role === "teacher" || user?.role === "administrator";
  const isStudent = user?.role === "student";
  const isAdmin = user?.role === "admin";
  const isParent = user?.role === "parent";

  const teacherAdminRoutes = [
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

  const studentRoutes = [
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

  const adminRoutes = [
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

  const parentRoutes = [
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

  // Determine which routes to show based on user role
  let routes = [];
  if (isTeacherOrAdmin) {
    routes = teacherAdminRoutes;
  } else if (isStudent) {
    routes = studentRoutes;
  } else if (isAdmin) {
    routes = adminRoutes;
  } else if (isParent) {
    routes = parentRoutes;
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <span className="font-semibold text-xl">Beacon</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === route.href} 
                tooltip={state === "collapsed" ? route.name : undefined}
              >
                <NavLink to={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.name}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === "/profile"}
              tooltip={state === "collapsed" ? "Profile" : undefined}
            >
              <NavLink to="/profile">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip={state === "collapsed" ? "Sign Out" : undefined}>
              <User className="h-5 w-5" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
