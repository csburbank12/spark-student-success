
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoReset } from "@/hooks/useDemoReset";
import DashboardStatsGrid from "@/components/admin-dashboard/DashboardStatsGrid";
import SystemHealthCard from "@/components/admin-dashboard/SystemHealthCard";
import RecentActivityCard from "@/components/admin-dashboard/RecentActivityCard";
import SystemAlertsCard from "@/components/admin-dashboard/SystemAlertsCard";
import RepairToolkit from "@/components/admin-dashboard/repair-toolkit/RepairToolkit";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { resetDemoEnvironment } = useDemoReset();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome, {user?.name?.split(" ")[0]}!
        </h2>
        <Button 
          variant="outline" 
          onClick={resetDemoEnvironment}
          className="bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
        >
          Reset Demo Environment
        </Button>
      </div>

      <DashboardStatsGrid />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="repair">Repair & Recovery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SystemHealthCard />
            <RecentActivityCard />
          </div>
          <SystemAlertsCard />
        </TabsContent>
        
        <TabsContent value="schools" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>School Management</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">School management dashboard coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">User management dashboard coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">System analytics dashboard coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repair" className="pt-4">
          <RepairToolkit />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
