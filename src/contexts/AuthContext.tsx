
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { UserRole } from '@/types/roles';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  refreshSession: () => void;
}

const sampleUsers: Record<string, User> = {
  [UserRole.student]: {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex@school.edu',
    role: UserRole.student,
    avatarUrl: '/student-avatar.png',
    schoolId: 'school1',
  },
  [UserRole.teacher]: {
    id: 't1',
    name: 'Ms. Rodriguez',
    email: 'rodriguez@school.edu',
    role: UserRole.teacher,
    avatarUrl: '/teacher-avatar.png',
    schoolId: 'school1',
  },
  [UserRole.admin]: {
    id: 'a1',
    name: 'Principal Wilson',
    email: 'wilson@district.edu',
    role: UserRole.admin,
    avatarUrl: '/admin-avatar.png',
  },
  [UserRole.parent]: {
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah@family.com',
    role: UserRole.parent,
    avatarUrl: '/parent-avatar.png',
    schoolId: 'school1',
  },
  [UserRole.staff]: {
    id: 's2',
    name: 'Jamie Smith',
    email: 'jamie@school.edu',
    role: UserRole.staff,
    avatarUrl: '/staff-avatar.png',
    schoolId: 'school1',
  },
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('sparkUser');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      ErrorLoggingService.logError({
        action: 'auth_session_load',
        error_message: `Failed to load user session: ${error instanceof Error ? error.message : String(error)}`
      });
      setIsLoading(false);
    }
  }, []);

  // Set up session refresh timer (every 30 minutes)
  useEffect(() => {
    if (!user) return;
    
    const refreshInterval = setInterval(() => {
      refreshSession();
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => clearInterval(refreshInterval);
  }, [user]);

  const refreshSession = () => {
    if (!user) return;
    
    try {
      // In a real app with JWT tokens, this would validate/refresh the token
      // For demo purposes, we just re-save the user to reset expiry
      localStorage.setItem('sparkUser', JSON.stringify(user));
      console.log('Session refreshed successfully');
    } catch (error) {
      console.error('Error refreshing session:', error);
      ErrorLoggingService.logError({
        action: 'auth_session_refresh',
        error_message: `Failed to refresh session: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: user.role
      });
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate with sample users
      // First determine which role from the email
      let role: UserRole = UserRole.student;
      
      if (email.includes('teacher') || email.includes('rodriguez')) {
        role = UserRole.teacher;
      } else if (email.includes('admin') || email.includes('principal') || email.includes('wilson')) {
        role = UserRole.admin;
      } else if (email.includes('parent') || email.includes('family')) {
        role = UserRole.parent;
      } else if (email.includes('staff') || email.includes('jamie')) {
        role = UserRole.staff;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate password - for demo all passwords should be "password"
      if (password !== "password") {
        throw new Error("Invalid credentials");
      }
      
      const loggedInUser = sampleUsers[role];
      
      if (!loggedInUser) {
        throw new Error("User not found");
      }
      
      setUser(loggedInUser);
      localStorage.setItem('sparkUser', JSON.stringify(loggedInUser));
      
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      
      setIsLoading(false);
      
      return loggedInUser;
    } catch (error) {
      setIsLoading(false);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown login error';
      
      ErrorLoggingService.logError({
        action: 'auth_login',
        error_message: `Login failed: ${errorMessage}`,
        profile_type: email.includes('@') ? email.split('@')[0] : 'unknown'
      });
      
      throw error;
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('sparkUser');
      toast.info("You've been signed out");
    } catch (error) {
      console.error('Error during logout:', error);
      ErrorLoggingService.logError({
        action: 'auth_logout',
        error_message: `Logout failed: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: user?.role
      });
    }
  };
  
  const setRole = (role: UserRole) => {
    try {
      const newUser = sampleUsers[role];
      if (!newUser) {
        throw new Error(`No demo user found for role: ${role}`);
      }
      
      setUser(newUser);
      localStorage.setItem('sparkUser', JSON.stringify(newUser));
      toast.success(`Switched to ${role} account`);
    } catch (error) {
      console.error('Error setting role:', error);
      ErrorLoggingService.logError({
        action: 'auth_role_switch',
        error_message: `Role switch failed: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: user?.role
      });
      toast.error(`Failed to switch roles`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setRole, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
