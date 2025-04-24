
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { 
  Users, Calendar, ClipboardCheck, Activity,
  MessageSquare, Bell, FileText, Heart, Brain 
} from "lucide-react";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
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
          title="Students Supported"
          value="24"
          description="Active support cases"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="3 more than last month"
        />
        <StatCard
          title="Upcoming Sessions"
          value="8"
          description="Scheduled for this week"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Check-ins Completed"
          value="16"
          description="In the past 7 days"
          icon={<ClipboardCheck className="h-4 w-4" />}
          trend="up"
          trendValue="25% more than avg"
        />
        <StatCard
          title="Support Requests"
          value="5"
          description="Awaiting response"
          icon={<Bell className="h-4 w-4" />}
          trend="down"
          trendValue="2 fewer than yesterday"
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Today</TabsTrigger>
          <TabsTrigger value="students">Priority Students</TabsTrigger>
          <TabsTrigger value="requests">Support Requests</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Student Check-in: Alex J.</p>
                      <p className="text-sm text-muted-foreground">Individual meeting • Room 105</p>
                    </div>
                    <div className="text-sm font-medium">9:00 - 9:30</div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Support Team Meeting</p>
                      <p className="text-sm text-muted-foreground">Conference Room • 8 attendees</p>
                    </div>
                    <div className="text-sm font-medium">11:00 - 12:00</div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Group Session: Stress Management</p>
                      <p className="text-sm text-muted-foreground">Room 105 • 12 students</p>
                    </div>
                    <div className="text-sm font-medium">2:00 - 3:00</div>
                  </div>
                </div>
                <Button variant="link" className="mt-4 px-0">View full schedule</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="h-9 w-9 p-2 bg-blue-100 text-blue-700 rounded-full" />
                      <div>
                        <p className="font-medium">Completed mood check-in</p>
                        <p className="text-sm text-muted-foreground">Alex Johnson • 45 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-9 w-9 p-2 bg-purple-100 text-purple-700 rounded-full" />
                      <div>
                        <p className="font-medium">New message from teacher</p>
                        <p className="text-sm text-muted-foreground">Ms. Garcia • 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-9 w-9 p-2 bg-amber-100 text-amber-700 rounded-full" />
                      <div>
                        <p className="font-medium">Updated support plan</p>
                        <p className="text-sm text-muted-foreground">Lily Chen • Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="link" className="mt-4 px-0">View all activity</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto py-4 flex flex-col" asChild>
                  <Link to="/staff-assist">
                    <Users className="h-5 w-5 mb-2" />
                    <span>Staff Assist</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col" asChild>
                  <Link to="/support-tools">
                    <Heart className="h-5 w-5 mb-2" />
                    <span>Support Tools</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <Brain className="h-5 w-5 mb-2" />
                  <span>Resources</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <MessageSquare className="h-5 w-5 mb-2" />
                  <span>Messages</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Priority Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3 bg-red-50">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-medium">AJ</span>
                    </div>
                    <div>
                      <div className="font-medium">Alex Johnson</div>
                      <div className="text-sm text-muted-foreground">Grade 9 • Last check-in: Stressed</div>
                    </div>
                    <Button size="sm" className="ml-auto" variant="outline">View</Button>
                  </div>
                  <div className="mt-2 pt-2 border-t text-sm text-muted-foreground">
                    Three missed check-ins. Reported high stress levels last week.
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline">
                      <ClipboardCheck className="h-4 w-4 mr-1" />
                      Log Intervention
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 bg-amber-50">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <span className="font-medium">LC</span>
                    </div>
                    <div>
                      <div className="font-medium">Lily Chen</div>
                      <div className="text-sm text-muted-foreground">Grade 10 • Last check-in: Worried</div>
                    </div>
                    <Button size="sm" className="ml-auto" variant="outline">View</Button>
                  </div>
                  <div className="mt-2 pt-2 border-t text-sm text-muted-foreground">
                    Reported anxiety about upcoming exams. Teacher referral received.
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline">
                      <ClipboardCheck className="h-4 w-4 mr-1" />
                      Log Intervention
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Teacher Consultation</p>
                        <p className="text-sm text-muted-foreground">Ms. Garcia • Regarding: Alex Johnson</p>
                      </div>
                    </div>
                    <Button size="sm">Respond</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Parent Meeting Request</p>
                        <p className="text-sm text-muted-foreground">Sarah Thompson • Regarding: Jada Thompson</p>
                      </div>
                    </div>
                    <Button size="sm">Respond</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Student Support Request</p>
                        <p className="text-sm text-muted-foreground">Lily Chen • Type: Academic Stress</p>
                      </div>
                    </div>
                    <Button size="sm">Respond</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Mental Health</h3>
                  <p className="text-sm text-muted-foreground">
                    Resources for supporting student emotional wellbeing
                  </p>
                  <Button variant="outline">Access Resources</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium">SEL Activities</h3>
                  <p className="text-sm text-muted-foreground">
                    Ready-to-use lessons for social emotional learning
                  </p>
                  <Button variant="outline">Access Resources</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium">Assessment Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Screening and progress monitoring instruments
                  </p>
                  <Button variant="outline">Access Resources</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffDashboard;
