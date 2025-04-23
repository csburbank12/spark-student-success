
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { UserRole } from '@/types/roles';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';
import { toast } from 'sonner';
import { demoUsers } from '@/data/demoUsers';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      let role: UserRole = UserRole.student;
      
      if (email.includes('nguyen')) {
        role = UserRole.teacher;
      } else if (email.includes('rodriguez')) {
        role = UserRole.admin;
      } else if (email.includes('sarah') || email.includes('family')) {
        role = UserRole.parent;
      } else if (email.includes('chen')) {
        role = UserRole.staff;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password !== "password") {
        throw new Error("Invalid credentials");
      }
      
      const loggedInUser = demoUsers[role];
      
      if (!loggedInUser) {
        throw new Error("User not found");
      }
      
      setUser(loggedInUser);
      localStorage.setItem('sparkUser', JSON.stringify(loggedInUser));
      
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      
      return loggedInUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown login error';
      
      ErrorLoggingService.logError({
        action: 'auth_login',
        error_message: `Login failed: ${errorMessage}`,
        profile_type: email.includes('@') ? email.split('@')[0] : 'unknown'
      });
      
      throw error;
    } finally {
      setIsLoading(false);
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
      const newUser = demoUsers[role];
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

  return {
    user,
    isLoading,
    login,
    logout,
    setRole,
    refreshSession
  };
};
