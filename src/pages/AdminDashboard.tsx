
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { Users, School, Activity, Bell } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome, {user?.name?.split(" ")[0]}!
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="2,590"
          description="Across all schools"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="43 new this month"
        />
        <StatCard
          title="Schools"
          value="3"
          description="Connected to platform"
          icon={<School className="h-4 w-4" />}
        />
        <StatCard
          title="Active Interventions"
          value="127"
          description="Across all schools"
          icon={<Activity className="h-4 w-4" />}
          trend="up"
          trendValue="12 new this week"
        />
        <StatCard
          title="System Alerts"
          value="24"
          description="Requiring attention"
          icon={<Bell className="h-4 w-4" />}
          trend="up"
          trendValue="8 new today"
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Status</p>
                      <p className="text-sm text-muted-foreground">All systems operational</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">✓</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Database Performance</p>
                      <p className="text-sm text-muted-foreground">94% efficiency</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">✓</span>
                    </div>
                  </div>
                </div>
                <Button variant="link" className="mt-4 px-0">View system logs</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    New school onboarded: Washington High School (2 hours ago)
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    System update completed: v2.4.3 (Yesterday)
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    User roles updated for Lincoln Middle School (2 days ago)
                  </li>
                </ul>
                <Button variant="link" className="mt-4 px-0">View all activity</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System-wide Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <div>
                    <p className="font-medium text-amber-800">Data Sync Required</p>
                    <p className="text-sm text-amber-700">Roosevelt Elementary data needs synchronization</p>
                  </div>
                  <Button size="sm" variant="outline">Sync Now</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                  <div>
                    <p className="font-medium text-red-800">User Access Issues</p>
                    <p className="text-sm text-red-700">5 staff members at Lincoln Middle School reporting access problems</p>
                  </div>
                  <Button size="sm">Investigate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
