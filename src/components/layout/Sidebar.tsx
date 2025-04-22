
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  GraduationCap, 
  Layout, 
  CalendarCheck, 
  Users, 
  BarChart, 
  Settings, 
  MessageSquare,
  BookCheck,
  Heart,
  Activity,
  User,
  School,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all",
          "hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent text-accent-foreground" : "text-foreground/70"
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </NavLink>
  );
};

export const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || 'student';

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-heading font-semibold">Spark</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Main
        </div>
        
        <NavItem to="/dashboard" icon={Layout}>
          Dashboard
        </NavItem>
        
        {/* Student Navigation */}
        {role === 'student' && (
          <>
            <NavItem to="/check-in" icon={Heart}>
              Daily Check-in
            </NavItem>
            <NavItem to="/activities" icon={BookCheck}>
              Activities
            </NavItem>
            <NavItem to="/progress" icon={BarChart}>
              My Progress
            </NavItem>
          </>
        )}

        {/* Teacher Navigation */}
        {role === 'teacher' && (
          <>
            <NavItem to="/students" icon={Users}>
              Students
            </NavItem>
            <NavItem to="/planner" icon={CalendarCheck}>
              Lesson Planner
            </NavItem>
            <NavItem to="/collaboration" icon={MessageSquare}>
              Collaboration
            </NavItem>
          </>
        )}

        {/* Admin Navigation */}
        {role === 'admin' && (
          <>
            <NavItem to="/schools" icon={School}>
              Schools
            </NavItem>
            <NavItem to="/users" icon={Users}>
              Users
            </NavItem>
            <NavItem to="/analytics" icon={BarChart}>
              Analytics
            </NavItem>
          </>
        )}

        {/* Parent Navigation */}
        {role === 'parent' && (
          <>
            <NavItem to="/child-activity" icon={Activity}>
              Child Activity
            </NavItem>
            <NavItem to="/child-wellness" icon={Heart}>
              Wellness Tracker
            </NavItem>
            <NavItem to="/messages" icon={MessageSquare}>
              Messages
            </NavItem>
          </>
        )}

        <div className="mt-6 mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Settings
        </div>
        
        <NavItem to="/settings" icon={Settings}>
          Settings
        </NavItem>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
