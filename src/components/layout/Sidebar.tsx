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
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isTeacherOrAdmin =
    user?.role === "teacher" || user?.role === "administrator";
  const isStudent = user?.role === "student";

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
  ];

  return (
    <div className="w-64 flex-shrink-0 border-r bg-gray-50 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-14 items-center px-6">
        <p className="font-semibold">Beacon</p>
      </div>
      <div className="flex flex-col space-y-1 px-2">
        {isTeacherOrAdmin &&
          teacherAdminRoutes.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-50 ${
                  isActive
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.name}
            </NavLink>
          ))}
        {isStudent &&
          studentRoutes.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-50 ${
                  isActive
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.name}
            </NavLink>
          ))}
      </div>
      <div className="mt-auto border-t p-4 dark:border-gray-700">
        <button
          onClick={logout}
          className="group relative w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
