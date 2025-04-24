
import React, { createContext, useContext, useEffect } from 'react';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { AuthContextType } from '@/types/auth';
import { initializeDemoData } from '@/utils/demoDataManager';
import { UserRole } from '@/types/roles';
import { supabase } from '@/integrations/supabase/client';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          // Handle sign out events
          ErrorLoggingService.logError({
            action: 'auth_event',
            error_message: 'User signed out',
            profile_type: auth.user?.role as any || 'unknown'
          });
        } else if (event === 'TOKEN_REFRESHED') {
          // Log token refresh events
          console.log('Auth token refreshed');
        }
      }
    );
    
    // Initialize demo data if needed
    if (auth.user?.id && auth.user?.role) {
      initializeDemoData(auth.user.id, auth.user.role as UserRole);
    }
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [auth.user]);
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
