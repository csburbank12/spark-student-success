
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { CheckCircle, Calendar, MessageSquare, Users } from "lucide-react";

const ParentDashboard = () => {
  const { user } = useAuth();
  const childName = "Alex"; // In a real app, this would be fetched from the database

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome, {user?.name?.split(" ")[0]}!
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Check-in Streak"
          value="5 days"
          description={`${childName}'s current streak`}
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
          trendValue="2 days more than last week"
        />
        <StatCard
          title="Upcoming Events"
          value="2"
          description="School events this week"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Unread Messages"
          value="3"
          description="From teachers and staff"
          icon={<MessageSquare className="h-4 w-4" />}
          trend="up"
          trendValue="New message today"
        />
        <StatCard
          title="Support Sessions"
          value="1"
          description="Upcoming parent-teacher meetings"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="wellness">Wellness Trends</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Today</p>
                      <p className="text-sm text-muted-foreground">Feeling good overall</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-lg">😊</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Yesterday</p>
                      <p className="text-sm text-muted-foreground">A bit tired in the morning</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="text-lg">😐</span>
                    </div>
                  </div>
                </div>
                <Button variant="link" className="mt-4 px-0">View all check-ins</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested Conversation Starters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    Ask about the science project that was due today
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    Chat about what made them feel good during this week's activities
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    Discuss the upcoming field trip to the natural history museum
                  </li>
                </ul>
                <Button variant="link" className="mt-4 px-0">More suggestions</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events & Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Parent-Teacher Conference</p>
                    <p className="text-sm text-muted-foreground">Thursday, May 2nd at 4:00 PM</p>
                  </div>
                  <Button size="sm">Add to Calendar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Field Trip Permission Slip</p>
                    <p className="text-sm text-muted-foreground">Due by Friday, May 3rd</p>
                  </div>
                  <Button size="sm" variant="outline">Sign Online</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wellness" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Mood Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Mood trend visualization coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academics" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Academic data coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="communications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Communication history coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;
