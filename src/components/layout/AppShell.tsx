
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  SidebarProvider,
} from '@/components/ui/sidebar/sidebar-provider';
import { SidebarInset } from '@/components/ui/sidebar/components/sidebar-inset';
import { SidebarRail } from '@/components/ui/sidebar/components/sidebar-rail';
import Sidebar from './Sidebar';
import { Navbar } from './Navbar';
import { Loader } from '@/components/ui/loader';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';

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
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar />
          <SidebarRail />
          <SidebarInset enableScroll={true}>
            <div className="flex flex-1 flex-col h-full">
              <Navbar />
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
