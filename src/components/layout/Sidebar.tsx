
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Home,
  Book,
  Calendar,
  MessageSquare,
  Settings,
  Users,
  LayoutDashboard,
  BrainCircuit,
  Activity,
  Heart,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ["student", "teacher", "admin", "parent"],
  },
  {
    title: "Student Dashboard",
    href: "/student-dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["student"],
  },
  {
    title: "Teacher Dashboard",
    href: "/teacher-dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["teacher"],
  },
  {
    title: "Admin Dashboard",
    href: "/admin-dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Parent Dashboard",
    href: "/parent-dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["parent"],
  },
  {
    title: "Student Management",
    href: "/student-management",
    icon: <Users className="h-5 w-5" />,
    roles: ["teacher", "admin"],
  },
  {
    title: "Check-In",
    href: "/check-in",
    icon: <Book className="h-5 w-5" />,
    roles: ["student"],
  },
  {
    title: "Child Activity",
    href: "/parent/child-activity",
    icon: <Activity className="h-5 w-5" />,
    roles: ["parent"],
  },
  {
    title: "Child Wellness",
    href: "/parent/child-wellness",
    icon: <Heart className="h-5 w-5" />,
    roles: ["parent"],
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: <Calendar className="h-5 w-5" />,
    roles: ["student", "teacher"],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ["student", "teacher"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["student", "teacher", "admin"],
  },
  {
    title: "Predictive Support Engine",
    href: "/predictive-support",
    icon: <BrainCircuit className="h-5 w-5" />,
    roles: ["teacher", "admin"],
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role || "student")
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("md:hidden", className)}>
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-64 p-6">
        <SheetHeader className="text-left mb-4">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Explore the platform and access key features.
          </SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2.5">
          {filteredNavigation.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground",
                location.pathname === item.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-foreground"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        {(user?.role === "teacher" || user?.role === "admin") && (
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="data-management">
              <AccordionTrigger className="hover:bg-secondary hover:text-secondary-foreground">
                Data Management
              </AccordionTrigger>
              <AccordionContent>
                <nav className="grid gap-2">
                  <Link
                    to="/student-management"
                    className={cn(
                      "flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground",
                      location.pathname === "/student-management"
                        ? "bg-secondary text-secondary-foreground"
                        : "text-foreground"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    <span>Students</span>
                  </Link>
                  {/* Add more data management links here */}
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => logout()}
        >
          Sign Out
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
