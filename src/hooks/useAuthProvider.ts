
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { UserRole } from '@/types/roles';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';
import { toast } from 'sonner';
import { demoUsers } from '@/data/demoUsers';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to ensure IDs are valid UUIDs for database operations
  const ensureValidUUID = (user: User): User => {
    // If the ID is not a valid UUID format, replace it with a valid UUID format
    // This ensures database functions expecting UUIDs will work properly
    if (user && user.id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(user.id)) {
      // Generate a deterministic UUID based on the user role for consistent IDs between sessions
      const roleBasedId = {
        [UserRole.student]: '7f8d2a90-6495-4c41-8e86-86539e961324',
        [UserRole.teacher]: 'b2c5f5d7-3273-4515-b3c4-587d9fd697b4',
        [UserRole.admin]: '9e8c7a6b-5d4e-4f3c-2b1a-0i9o8u7y6t5r',
        [UserRole.parent]: 'a1s2d3f4-g5h6-j7k8-l9z0-x1c2v3b4n5m6',
        [UserRole.staff]: 'q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6'
      }[user.role as UserRole] || '00000000-0000-0000-0000-000000000000';
      
      return { ...user, id: roleBasedId };
    }
    return user;
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('sparkUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the user has a valid UUID before setting
        setUser(ensureValidUUID(parsedUser));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      ErrorLoggingService.logError({
        action: 'auth_session_load',
        error_message: `Failed to load user session: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: 'unknown'
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
        profile_type: user.role as ProfileType
      });
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      let role: UserRole | undefined;
      
      // Find which demo user has this email
      Object.entries(demoUsers).forEach(([userRole, userData]) => {
        if (userData.email.toLowerCase() === email.toLowerCase()) {
          role = userRole as UserRole;
        }
      });
      
      if (!role) {
        throw new Error("User not found");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password !== "password") {
        throw new Error("Invalid credentials");
      }
      
      const loggedInUser = demoUsers[role];
      
      if (!loggedInUser) {
        throw new Error("User not found");
      }
      
      // Ensure the user has a valid UUID before setting
      const userWithValidId = ensureValidUUID(loggedInUser);
      
      setUser(userWithValidId);
      localStorage.setItem('sparkUser', JSON.stringify(userWithValidId));
      
      toast.success(`Welcome back, ${userWithValidId.name}!`);
      
      return userWithValidId;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown login error';
      
      ErrorLoggingService.logError({
        action: 'auth_login',
        error_message: `Login failed: ${errorMessage}`,
        profile_type: email.includes('@') ? (email.split('@')[0] as ProfileType) : 'unknown'
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
        profile_type: user?.role as ProfileType || 'unknown'
      });
    }
  };
  
  const setRole = (role: UserRole) => {
    try {
      const newUser = demoUsers[role];
      if (!newUser) {
        throw new Error(`No demo user found for role: ${role}`);
      }
      
      // Ensure the user has a valid UUID before setting
      const userWithValidId = ensureValidUUID(newUser);
      
      setUser(userWithValidId);
      localStorage.setItem('sparkUser', JSON.stringify(userWithValidId));
      toast.success(`Switched to ${role} account`);
    } catch (error) {
      console.error('Error setting role:', error);
      ErrorLoggingService.logError({
        action: 'auth_role_switch',
        error_message: `Role switch failed: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: user?.role as ProfileType || 'unknown'
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
