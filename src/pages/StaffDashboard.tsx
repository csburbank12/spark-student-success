
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { Users, Bell, Calendar, Activity, FileText } from "lucide-react";

const StaffDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Staff Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            My Schedule
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Student Check-ins"
          value="142"
          description="Last 24 hours"
          icon={<Activity className="h-4 w-4" />}
          trend="up"
          trendValue="12% more than yesterday"
        />
        <StatCard
          title="Staff Tasks"
          value="28"
          description="8 due today"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Meetings Today"
          value="3"
          description="Next: 11:30 AM"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Student Alerts"
          value="5"
          description="Requiring attention"
          icon={<Bell className="h-4 w-4" />}
          trend="down"
          trendValue="2 fewer than yesterday"
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Daily Overview</TabsTrigger>
          <TabsTrigger value="students">Student Monitoring</TabsTrigger>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Priorities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-100">
                    <div>
                      <p className="font-medium">Follow-up: Alex Johnson</p>
                      <p className="text-sm text-muted-foreground">Missed check-ins for 3 days</p>
                    </div>
                    <Button size="sm" variant="destructive">Action</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50 border-amber-100">
                    <div>
                      <p className="font-medium">SEL Pathway Review</p>
                      <p className="text-sm text-muted-foreground">Grade 9 effectiveness assessment</p>
                    </div>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Staff Meeting Preparation</p>
                      <p className="text-sm text-muted-foreground">Wellness program update slides</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                      <span className="text-sm font-medium">9:00 AM</span>
                      <span className="text-xs text-muted-foreground">1 hour</span>
                    </div>
                    <div>
                      <p className="font-medium">Morning Check-in</p>
                      <p className="text-sm text-muted-foreground">Student support team</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                      <span className="text-sm font-medium">11:30 AM</span>
                      <span className="text-xs text-muted-foreground">30 min</span>
                    </div>
                    <div>
                      <p className="font-medium">Student Review: Lily Chen</p>
                      <p className="text-sm text-muted-foreground">With Ms. Thompson</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                      <span className="text-sm font-medium">2:00 PM</span>
                      <span className="text-xs text-muted-foreground">1 hour</span>
                    </div>
                    <div>
                      <p className="font-medium">SEL Program Planning</p>
                      <p className="text-sm text-muted-foreground">Conference Room B</p>
                    </div>
                  </div>
                </div>
                <Button variant="link" className="mt-4 px-0">View Full Calendar</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>School Wellness Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Overall Student Mood</p>
                  <div className="flex items-center gap-1">
                    <span className="text-3xl">😊</span>
                    <span className="text-lg font-semibold">Good</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Based on today's check-ins</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Check-in Completion</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">78%</span>
                    <span className="text-xs text-green-600">↑ 5%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "78%" }} />
                  </div>
                  <p className="text-sm text-muted-foreground">Target: 85%</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Support Requests</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">12</span>
                    <span className="text-xs text-amber-600">Pending</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }} />
                    <div className="h-2 bg-amber-500 rounded-full" style={{ width: "100%" }} />
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: "100%" }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 Low</span>
                    <span>5 Medium</span>
                    <span>2 High</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-muted/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Today's Focus Areas</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                    <span>Grade 10 anxiety levels have increased - follow up with counseling team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                    <span>Positive response to new mindfulness activities - consider expansion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                    <span>Parent engagement in SEL home activities up 12% - share success in staff meeting</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Student Monitoring Dashboard</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-2">
                    Track student wellness, academic performance, and social-emotional 
                    learning progress across all grade levels.
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button>View Dashboard</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Task Management</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-2">
                    View, manage and track your assigned tasks and responsibilities.
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button>View Tasks</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Resources Library</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-2">
                    Access training materials, SEL resources, and support documentation.
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button>Browse Resources</Button>
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

export default StaffDashboard;
