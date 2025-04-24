
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { Loader } from "@/components/ui/loader";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardManager = () => {
  const { user, isLoading, setRole } = useAuth();
  const { toast } = useToast();

  React.useEffect(() => {
    // Show welcome toast when dashboard loads
    if (user) {
      toast({
        title: `Welcome, ${user.name || 'User'}`,
        description: `You're logged in as ${user.role}`,
      });
    }
  }, [user, toast]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Display role selection for main dashboard path
  if (window.location.pathname === "/dashboard") {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading font-bold">
            Welcome, {user?.name}!
          </h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Select Dashboard View</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>Choose which dashboard view you'd like to access:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center" 
                onClick={() => setRole(UserRole.student)}
              >
                <span className="text-lg font-medium">Student Dashboard</span>
                <span className="text-xs text-muted-foreground mt-1">View student learning tools</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center" 
                onClick={() => setRole(UserRole.teacher)}
              >
                <span className="text-lg font-medium">Teacher Dashboard</span>
                <span className="text-xs text-muted-foreground mt-1">Monitor student progress</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center" 
                onClick={() => setRole(UserRole.admin)}
              >
                <span className="text-lg font-medium">Admin Dashboard</span>
                <span className="text-xs text-muted-foreground mt-1">Manage system settings</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center" 
                onClick={() => setRole(UserRole.parent)}
              >
                <span className="text-lg font-medium">Parent Dashboard</span>
                <span className="text-xs text-muted-foreground mt-1">Track child's progress</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center" 
                onClick={() => setRole(UserRole.staff)}
              >
                <span className="text-lg font-medium">Staff Dashboard</span>
                <span className="text-xs text-muted-foreground mt-1">Access support tools</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="border-t pt-6">
          <p className="text-muted-foreground">
            You can switch between dashboard views at any time using the user menu in the top-right corner.
          </p>
        </div>
      </div>
    );
  }

  // For specific role dashboards, show that role's dashboard
  return <DashboardSelector userRole={user.role as UserRole} />;
};

export default DashboardManager;
