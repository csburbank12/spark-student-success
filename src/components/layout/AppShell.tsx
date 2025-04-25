
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { SidebarRail } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import { Navbar } from './Navbar';
import { Loader } from '@/components/ui/loader';
import { useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Log page navigation for monitoring - Fixed by removing logNavigation which doesn't exist
  React.useEffect(() => {
    if (user && location.pathname) {
      try {
        ErrorLoggingService.logError({
          action: 'page_navigation',
          error_message: `User navigated to: ${location.pathname}`,
          profile_type: user?.role as any || 'unauthenticated'
        });
      } catch (error) {
        console.error('Failed to log navigation:', error);
      }
    }
  }, [location.pathname, user]);
  
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
  
  // Redirect to login if not authenticated and not on a public page
  if (!user && !isPublicPage) {
    return <Navigate to="/login" replace />;
  }
  
  // For public pages, render without the sidebar and navbar
  if (isPublicPage) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={!isSidebarOpen}>
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar />
          <SidebarRail />
          <SidebarInset enableScroll={true}>
            <div className="flex flex-1 flex-col h-full">
              <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
              <main className="flex-1 bg-background p-4 md:p-6">
                {children}
              </main>
              <footer className="border-t py-4 px-6 bg-card">
                <div className="container flex flex-col md:flex-row justify-between items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Student Success Platform. All rights reserved.
                  </div>
                  <div className="flex gap-4 text-sm">
                    <a href="/help" className="text-muted-foreground hover:text-foreground">Help</a>
                    <a href="/privacy-policy" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
                    <a href="/terms" className="text-muted-foreground hover:text-foreground">Terms</a>
                  </div>
                </div>
              </footer>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};
