
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { Input } from "@/components/ui/input";
import { 
  Users, School, Activity, Bell, Search, 
  BarChart2, Settings, Shield, Database 
} from "lucide-react";

const AdminDashboardEnhanced = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for dashboard
  const schoolData = [
    { id: 1, name: "Washington High School", students: 1250, staff: 85, alerts: 7 },
    { id: 2, name: "Lincoln Middle School", students: 780, staff: 54, alerts: 12 },
    { id: 3, name: "Roosevelt Elementary", students: 560, staff: 42, alerts: 5 },
  ];

  const filteredSchools = schoolData.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-heading font-bold">
          Administration Console
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search schools, users, or settings..."
              className="pl-8 w-[250px] md:w-[350px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
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

      <Tabs defaultValue="schools">
        <TabsList className="grid grid-cols-4 md:w-auto md:inline-flex">
          <TabsTrigger value="schools"><School className="mr-2 h-4 w-4" />Schools</TabsTrigger>
          <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" />Users</TabsTrigger>
          <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
          <TabsTrigger value="system"><Database className="mr-2 h-4 w-4" />System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schools" className="space-y-4 pt-4">
          <div className="flex justify-end">
            <Button>
              <School className="mr-2 h-4 w-4" />
              Add School
            </Button>
          </div>
          
          <div className="grid gap-4">
            {filteredSchools.map(school => (
              <Card key={school.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{school.name}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>{school.students} Students</span>
                        <span>•</span>
                        <span>{school.staff} Staff</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      {school.alerts > 0 && (
                        <Button variant="outline" className="text-amber-600 border-amber-200">
                          <Bell className="mr-2 h-4 w-4" />
                          {school.alerts} Alerts
                        </Button>
                      )}
                      <Button variant="outline">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Role Distribution</h3>
                  <p className="text-sm text-muted-foreground">Overview of user roles across platform</p>
                </div>
                <Button variant="outline">Manage Roles</Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <Card className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">2,590</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">181</p>
                      <p className="text-sm text-muted-foreground">Teachers</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Admins</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">3,245</p>
                      <p className="text-sm text-muted-foreground">Parents</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6">
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Platform Usage</h3>
                  <div className="border rounded-lg p-4">
                    <p className="text-center text-muted-foreground">Analytics visualization coming soon</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Mood Check-in Completion Rate by School</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {schoolData.map(school => (
                      <Card key={school.id} className="p-4">
                        <div className="space-y-2">
                          <p className="font-medium">{school.name}</p>
                          <div className="h-2 bg-gray-100 rounded">
                            <div 
                              className="h-2 bg-blue-600 rounded" 
                              style={{ width: `${75 + Math.floor(Math.random() * 20)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Check-in Rate</span>
                            <span>{75 + Math.floor(Math.random() * 20)}%</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">Generate Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Data Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Database Backup</p>
                          <p className="text-sm text-muted-foreground">Last backup: 12 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm">Run Backup</Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Data Export</p>
                          <p className="text-sm text-muted-foreground">Generate system reports</p>
                        </div>
                        <Button variant="outline" size="sm">Export</Button>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">System Configuration</h3>
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">API Settings</p>
                          <p className="text-sm text-muted-foreground">Configure API access and keys</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Security Settings</p>
                          <p className="text-sm text-muted-foreground">Configure authentication policies</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Email Templates</p>
                          <p className="text-sm text-muted-foreground">Manage notification templates</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardEnhanced;
