
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { SidebarRail } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import { RoleBasedHeader } from './RoleBasedHeader';
import { Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { isPublicPath } from '@/utils/navigationUtils';
import { NavBreadcrumbs } from './NavBreadcrumbs';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isPublicPage = isPublicPath(location.pathname);

  if (isPublicPage) {
    return (
      <ThemeProvider>
        <div className="min-h-screen w-full bg-background">
          {children}
        </div>
      </ThemeProvider>
    );
  }
  
  if (!isLoading && !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex h-screen w-full overflow-hidden bg-background/95">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="relative flex w-full">
            <Sidebar />
            <SidebarRail />
            <SidebarInset>
              <div className="flex h-full flex-col">
                <RoleBasedHeader />
                <div className="border-b bg-card/50 backdrop-blur-sm px-4 md:px-6 py-2">
                  <NavBreadcrumbs path={location.pathname} />
                </div>
                <main className="flex-1 overflow-auto bg-background/60 p-4 md:p-6 lg:p-8">
                  <div className="mx-auto max-w-7xl animate-fade-in">
                    {children}
                  </div>
                </main>
              </div>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Layout;
