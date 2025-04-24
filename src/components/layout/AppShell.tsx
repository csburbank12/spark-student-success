
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  SidebarProvider,
  SidebarInset,
  SidebarRail
} from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import { Navbar } from './Navbar';
import { Loader } from '@/components/ui/loader';
import { useLocation } from 'react-router-dom';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isLoading } = useAuth();
  const location = useLocation();
  
  // Determine if we're on a public page that doesn't need the full shell
  const isPublicPage = location.pathname === '/login' || 
                      location.pathname === '/signup' ||
                      location.pathname.includes('/auth/');

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }
  
  // For public pages, render without the sidebar and navbar
  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <SidebarRail />
        <SidebarInset>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
