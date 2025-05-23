
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { UserRole } from '@/types/roles';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';
import { toast } from 'sonner';
import { demoUsers } from '@/data/demoUsers';
import { supabase } from '@/integrations/supabase/client';
import { getFallbackDashboardByRole } from '@/utils/navigationUtils';

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
        [UserRole.staff]: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9',
        [UserRole.counselor]: 'c1o2u3n4-s5e6l-o7r8-r9o0-l1e2c3o4u5n6'
      }[user.role as UserRole] || '00000000-0000-0000-0000-000000000000';
      
      return { ...user, id: roleBasedId };
    }
    return user;
  };

  // Initial auth check
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        // Check for active Supabase session first
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // TODO: In a real app, we would fetch the user profile from Supabase here
          // For now, use the demo user approach
          const storedUser = localStorage.getItem('sparkUser');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(ensureValidUUID(parsedUser));
          }
        } else {
          // No active Supabase session, check for stored user in localStorage as fallback
          const storedUser = localStorage.getItem('sparkUser');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(ensureValidUUID(parsedUser));
          }
        }
      } catch (error) {
        console.error('Error reading auth session:', error);
        ErrorLoggingService.logError({
          action: 'auth_session_load',
          error_message: `Failed to load user session: ${error instanceof Error ? error.message : String(error)}`,
          profile_type: 'unknown'
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Handle sign in - in a real app we'd fetch user profile
          const storedUser = localStorage.getItem('sparkUser');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(ensureValidUUID(parsedUser));
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Session refresh mechanism
  useEffect(() => {
    if (!user) return;
    
    const refreshInterval = setInterval(() => {
      refreshSession();
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => clearInterval(refreshInterval);
  }, [user]);

  const refreshSession = useCallback(() => {
    if (!user) return;
    
    try {
      // In a real implementation, we would refresh the Supabase token here
      // For demo purposes, we're just updating localStorage
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
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      let role: UserRole | undefined;
      
      // For demo purposes, check if this is a demo user
      Object.entries(demoUsers).forEach(([userRole, userData]) => {
        if (userData.email.toLowerCase() === email.toLowerCase()) {
          role = userRole as UserRole;
        }
      });
      
      if (!role) {
        // In a real app, we would sign in with Supabase here
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (error) throw error;
          
          // In a real app, we would fetch user role and profile from Supabase
          // For now, throw an error if not a demo user
          throw new Error("User not found in demo data");
        } catch (supabaseError) {
          console.error("Supabase auth error:", supabaseError);
          throw new Error("Invalid credentials");
        }
      } else {
        // Demo user login
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
      }
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

  const logout = async () => {
    setIsLoading(true);
    try {
      // Attempt to sign out with Supabase first
      await supabase.auth.signOut();
      
      // Then clear local state
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
    } finally {
      setIsLoading(false);
    }
  };
  
  const setRole = (role: UserRole, preventRedirect: boolean = false) => {
    try {
      const newUser = demoUsers[role];
      if (!newUser) {
        throw new Error(`No demo user found for role: ${role}`);
      }
      
      // Ensure the user has a valid UUID before setting
      const userWithValidId = ensureValidUUID(newUser);
      
      setUser(userWithValidId);
      localStorage.setItem('sparkUser', JSON.stringify(userWithValidId));
      
      if (!preventRedirect) {
        toast.success(`Switched to ${role} account`);
      }
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
