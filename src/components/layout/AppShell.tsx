
import React, { useState, useEffect, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { SidebarRail } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import { Navbar } from './Navbar';
import { useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';

interface AppShellProps {
  children: React.ReactNode;
}

// Use memo to prevent unnecessary re-renders
const MemoizedSidebar = memo(Sidebar);

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Determine if we're on a public page that doesn't need the full shell
  const isPublicPage = location.pathname === '/login' || 
                      location.pathname === '/signup' ||
                      location.pathname === '/404' ||
                      location.pathname === '/privacy-policy' ||
                      location.pathname === '/terms' ||
                      location.pathname === '/help' ||
                      location.pathname.includes('/auth/');

  // Public pages use simplified layout
  if (isPublicPage) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }
  
  // For authenticated pages, ensure the user is logged in - immediate redirect
  if (!isLoading && !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <MemoizedSidebar />
          <SidebarRail />
          <SidebarInset enableScroll={true}>
            <div className="flex flex-1 flex-col h-full">
              <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
              <main className="flex-1 bg-background p-4 md:p-6 overflow-auto">
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
