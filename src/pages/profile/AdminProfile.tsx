
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BarChart,
  Building,
  FileText,
  Settings,
  Users,
  ShieldCheck,
  School,
} from "lucide-react";
import { User } from "@/types";

interface AdminProfileProps {
  user: User;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Admin overview tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Administrator Information</CardTitle>
                <CardDescription>Account details and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Position</div>
                      <div className="font-medium">Principal</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Admin Level</div>
                      <div className="font-medium">Super Admin</div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="font-medium mb-2">Access Permissions</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded-lg p-2 bg-green-50">
                        <div className="text-xs font-medium">User Management</div>
                        <div className="text-xs text-muted-foreground">Full Access</div>
                      </div>
                      <div className="border rounded-lg p-2 bg-green-50">
                        <div className="text-xs font-medium">School Settings</div>
                        <div className="text-xs text-muted-foreground">Full Access</div>
                      </div>
                      <div className="border rounded-lg p-2 bg-green-50">
                        <div className="text-xs font-medium">Data Analytics</div>
                        <div className="text-xs text-muted-foreground">Full Access</div>
                      </div>
                      <div className="border rounded-lg p-2 bg-green-50">
                        <div className="text-xs font-medium">System Settings</div>
                        <div className="text-xs text-muted-foreground">Full Access</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">System Health</CardTitle>
                <CardDescription>Platform status and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">System Status</div>
                        <div className="text-sm text-green-700">All systems operational</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Recent Alerts</div>
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Backup Completed</div>
                        <Badge variant="outline">2 hours ago</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Daily system backup completed successfully.
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">User Import</div>
                        <Badge variant="outline">Yesterday</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        125 new student accounts created successfully.
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admin/error-logs">View System Logs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto flex-col py-4 px-2" asChild>
                  <Link to="/admin/user-management">
                    <Users className="h-5 w-5 mb-1" />
                    <span className="text-xs">Manage Users</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2" asChild>
                  <Link to="/admin/school-management">
                    <Building className="h-5 w-5 mb-1" />
                    <span className="text-xs">School Settings</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2" asChild>
                  <Link to="/admin/data-analytics">
                    <BarChart className="h-5 w-5 mb-1" />
                    <span className="text-xs">Analytics</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2" asChild>
                  <Link to="/admin/system-settings">
                    <Settings className="h-5 w-5 mb-1" />
                    <span className="text-xs">System Config</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          {/* System settings tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">School Management</CardTitle>
              <CardDescription>Manage schools and district settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Schools</div>
                  <div className="border rounded-lg divide-y">
                    <div className="p-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <School className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="font-medium">Westfield High School</div>
                        <div className="text-sm text-muted-foreground">
                          1250 students • 85 staff members
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link to="/admin/school-management">Manage</Link>
                      </Button>
                    </div>
                    <div className="p-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <School className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <div className="font-medium">Eastside Middle School</div>
                        <div className="text-sm text-muted-foreground">
                          850 students • 62 staff members
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link to="/admin/school-management">Manage</Link>
                      </Button>
                    </div>
                    <div className="p-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <School className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="font-medium">Valley Elementary</div>
                        <div className="text-sm text-muted-foreground">
                          620 students • 45 staff members
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link to="/admin/school-management">Manage</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/admin/school-onboarding">
                      <School className="mr-2 h-4 w-4" />
                      Add New School
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/admin/system-settings">
                      <Settings className="mr-2 h-4 w-4" />
                      District Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">System Configuration</CardTitle>
              <CardDescription>Configure platform settings and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-500" />
                    <div className="font-medium">General Settings</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Configure system-wide settings, branding, and defaults
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/admin/system-settings">Configure</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
                    <div className="font-medium">Security Settings</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Manage authentication, permissions, and data policies
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/admin/ferpa-compliance">Configure</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-purple-500" />
                    <div className="font-medium">Content Management</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Manage SEL resources, lessons, and educational content
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/admin/data-analytics">Manage Content</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-amber-500" />
                    <div className="font-medium">Monitoring & Alerts</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Configure system monitoring, alerts, and notifications
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/admin/loopbot-logs">Configure</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          {/* User management tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">User Management</CardTitle>
              <CardDescription>Manage administrators, teachers, and students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">User Overview</div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/user-management">Add New User</Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">25</div>
                    <div className="text-sm text-muted-foreground">Administrators</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">192</div>
                    <div className="text-sm text-muted-foreground">Teachers</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">2720</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">1850</div>
                    <div className="text-sm text-muted-foreground">Parents</div>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="font-medium mb-2">Recent User Activity</div>
                  <div className="border rounded-lg divide-y">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">New Staff Onboarded</div>
                        <Badge variant="outline">Today</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        5 new staff members were added to Westfield High School.
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">Role Changes</div>
                        <Badge variant="outline">Yesterday</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        2 teachers were promoted to administrative roles.
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">User Import</div>
                        <Badge variant="outline">3 days ago</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Bulk import of 125 student accounts completed.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" asChild>
                  <Link to="/admin/user-management">
                    <Users className="mr-2 h-4 w-4" />
                    User Directory
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin/ferpa-compliance">
                    <Settings className="mr-2 h-4 w-4" />
                    Access Control
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Bulk User Operations</CardTitle>
              <CardDescription>Import, export, and manage users in bulk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">Import Users</div>
                  <div className="text-sm text-muted-foreground">
                    Bulk import users from CSV files or via School Information System integration
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/admin/user-management">Import Users</Link>
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">Export Users</div>
                  <div className="text-sm text-muted-foreground">
                    Export user data for reporting or backup purposes
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/admin/user-management">Export Users</Link>
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">Batch Actions</div>
                  <div className="text-sm text-muted-foreground">
                    Perform actions on multiple user accounts at once
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/admin/user-management">Batch Operations</Link>
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">User Templates</div>
                  <div className="text-sm text-muted-foreground">
                    Create templates for different user types and permissions
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/admin/user-management">Manage Templates</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">System Analytics</CardTitle>
              <CardDescription>Platform usage and performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Platform Usage</div>
                  <div className="h-64 border rounded-lg p-4 flex items-end space-x-2">
                    <div className="flex-1 h-full flex flex-col justify-end">
                      <div className="bg-blue-500 h-2/3 rounded-t-sm"></div>
                      <div className="text-xs text-center mt-1">Mon</div>
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-end">
                      <div className="bg-blue-500 h-4/5 rounded-t-sm"></div>
                      <div className="text-xs text-center mt-1">Tue</div>
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-end">
                      <div className="bg-blue-500 h-full rounded-t-sm"></div>
                      <div className="text-xs text-center mt-1">Wed</div>
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-end">
                      <div className="bg-blue-500 h-3/4 rounded-t-sm"></div>
                      <div className="text-xs text-center mt-1">Thu</div>
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-end">
                      <div className="bg-blue-500 h-2/3 rounded-t-sm"></div>
                      <div className="text-xs text-center mt-1">Fri</div>
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-end">
                      <div className="bg-blue-500 h-1/3 rounded-t-sm"></div>
                      <div className="text-xs text-center mt-1">Sat</div>
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-end">
                      <div className="bg-blue-500 h-1/4 rounded-t-sm"></div>
                      <div className="text-xs text-center mt-1">Sun</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">Active Users</div>
                    <div className="text-2xl font-bold">3,842</div>
                    <div className="text-xs text-green-600">↑12% from last week</div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">Check-ins</div>
                    <div className="text-2xl font-bold">2,156</div>
                    <div className="text-xs text-green-600">↑8% from last week</div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">SEL Lessons</div>
                    <div className="text-2xl font-bold">945</div>
                    <div className="text-xs text-green-600">↑15% from last week</div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">Support Requests</div>
                    <div className="text-2xl font-bold">78</div>
                    <div className="text-xs text-red-600">↑23% from last week</div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/admin/data-analytics">
                  <BarChart className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Wellness Trends</CardTitle>
              <CardDescription>School-wide emotional health metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">School Climate Pulse</div>
                    <Badge className="bg-blue-50 text-blue-800">Updated Today</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Student Wellbeing Index</span>
                        <span className="font-medium">72/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "72%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Teacher Wellbeing Index</span>
                        <span className="font-medium">68/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>School Safety Perception</span>
                        <span className="font-medium">85/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium text-sm mb-1">Mood Distribution</div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm">Happy/Content</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm">Neutral</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm">Stressed</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm">Struggling</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" asChild>
                    <Link to="/admin/pulse-trends">View Detailed Wellness Report</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProfile;
