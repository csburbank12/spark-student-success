
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  School,
  AlertTriangle,
  Activity,
  CheckCircle,
  Settings,
  BookOpen,
  FileText,
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Admin Dashboard
        </h2>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="2,547"
          description="Active accounts"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="12 new this week"
        />
        <StatCard
          title="Schools"
          value="12"
          description="Connected institutions"
          icon={<School className="h-4 w-4" />}
        />
        <StatCard
          title="Active Alerts"
          value="23"
          description="Requiring attention"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend="down"
          trendValue="5 fewer than last week"
        />
        <StatCard
          title="System Health"
          value="98%"
          description="All systems operational"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-100">
                    <div>
                      <p className="font-medium">Data Import Error</p>
                      <p className="text-sm text-muted-foreground">Westfield High School student import failed</p>
                    </div>
                    <Button size="sm" variant="destructive">Resolve</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50 border-amber-100">
                    <div>
                      <p className="font-medium">API Rate Limit Warning</p>
                      <p className="text-sm text-muted-foreground">External API approaching daily limit</p>
                    </div>
                    <Button size="sm" variant="outline">Details</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">License Renewal</p>
                      <p className="text-sm text-muted-foreground">Premium features expire in 15 days</p>
                    </div>
                    <Button size="sm" variant="outline">Renew</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>System-wide updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <p className="font-medium">Database Backup Completed</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Today, 02:30 AM</p>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <p className="font-medium">25 New Users Created</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Yesterday, 11:15 AM</p>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <p className="font-medium">SEL Content Library Updated</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Apr 24, 2025, 9:45 AM</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <p className="font-medium">System Maintenance Completed</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Apr 22, 2025, 3:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>System Health Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Uptime</span>
                    <span className="font-medium">99.98%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "99.98%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="font-medium">210ms</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "85%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">Average</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span className="font-medium">61.5%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: "61.5%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">38.5% available</p>
                </div>
              </div>
              
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Upcoming Maintenance</h4>
                  <p className="text-sm">Database optimization scheduled for May 1, 2025, 2:00 AM - 4:00 AM EST.</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Security Status</h4>
                  <p className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" /> All security checks passed
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Last scanned: 6 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage system users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">User Management Dashboard</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-2">
                    Create, update, and manage user accounts across all schools and roles.
                    Set permissions and monitor account activity.
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button>View Users</Button>
                    <Button variant="outline">Add New User</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schools" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Schools Management</CardTitle>
              <CardDescription>View and manage connected schools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <School className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">School Management Dashboard</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-2">
                    Configure school settings, manage integrations, and review
                    performance metrics for all connected institutions.
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button>View Schools</Button>
                    <Button variant="outline">Add New School</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
              <CardDescription>Analytics and usage metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Reports Dashboard</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-2">
                    Generate custom reports on system usage, user engagement,
                    and wellness program effectiveness across all schools.
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button>View Reports</Button>
                    <Button variant="outline">Export Data</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
