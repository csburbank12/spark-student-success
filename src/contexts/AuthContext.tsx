
import React, { createContext, useContext } from 'react';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { AuthContextType } from '@/types/auth';
import { initializeDemoData } from '@/utils/demoDataManager';
import { UserRole } from '@/types/roles';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  React.useEffect(() => {
    if (auth.user?.id && auth.user?.role) {
      initializeDemoData(auth.user.id, auth.user.role as UserRole);
    }
  }, [auth.user]);
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
