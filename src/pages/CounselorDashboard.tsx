
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { Calendar, Users, FileText, Heart, Bell } from "lucide-react";

const CounselorDashboard = () => {
  const { user } = useAuth();

  // Mock data for students needing support
  const studentsNeedingSupport = [
    { id: "s1", name: "Alex Johnson", grade: "10th", concern: "Mood decline", urgency: "high" },
    { id: "s2", name: "Lily Chen", grade: "9th", concern: "Stress levels", urgency: "medium" },
    { id: "s3", name: "Emma Davis", grade: "11th", concern: "No recent check-in", urgency: "medium" },
    { id: "s4", name: "Noah Williams", grade: "8th", concern: "Behavioral incident", urgency: "high" },
  ];
  
  // Mock data for upcoming meetings
  const upcomingMeetings = [
    { id: "m1", title: "Student Support Team", time: "Today, 11:30 AM", participants: 5 },
    { id: "m2", title: "Parent Conference: Alex J.", time: "Today, 3:15 PM", participants: 3 },
    { id: "m3", title: "SEL Program Planning", time: "Tomorrow, 10:00 AM", participants: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome, {user?.name?.split(" ")[0]}!
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Students Flagged"
          value="12"
          description="Requiring attention"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="3 more than last week"
        />
        <StatCard
          title="Active Cases"
          value="28"
          description="Currently being managed"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Meetings Today"
          value="5"
          description="Scheduled sessions"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Wellness Trend"
          value="Improving"
          description="School-wide average"
          icon={<Heart className="h-4 w-4" />}
          trend="up"
          trendValue="2% increase"
        />
      </div>

      <Tabs defaultValue="priority">
        <TabsList>
          <TabsTrigger value="priority">Priority Students</TabsTrigger>
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
          <TabsTrigger value="resources">Support Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="priority" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students Needing Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentsNeedingSupport.map((student) => (
                  <div key={student.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{student.name} - {student.grade} Grade</p>
                      <p className="text-sm text-muted-foreground">{student.concern}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.urgency === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {student.urgency === 'high' ? 'Urgent' : 'Follow-up'}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0">View all flagged students</Button>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Check-in Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Mood trend visualization</p>
                </div>
                <div className="mt-4 text-sm">
                  <p>Overall school mood has shown improvement in the last week, with 68% of students reporting positive emotions.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intervention Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span>SEL Pathways</span>
                      <span>87% effective</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span>1:1 Check-ins</span>
                      <span>92% effective</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "92%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span>Group Sessions</span>
                      <span>74% effective</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "74%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground">{meeting.time} • {meeting.participants} participants</p>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 border rounded-md bg-muted/30">
                <h4 className="font-medium mb-2">Daily Focus</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                    <span>Follow up with grade 9 teachers about mood assessment results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                    <span>Prepare materials for tomorrow's resilience workshop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                    <span>Review intervention plans for high-priority students</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>SEL Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="border-b pb-2">
                    <a href="#" className="text-blue-600 hover:underline">Emotion Regulation Activities</a>
                    <p className="text-sm text-muted-foreground">For grades 7-12</p>
                  </li>
                  <li className="border-b pb-2">
                    <a href="#" className="text-blue-600 hover:underline">Stress Management Techniques</a>
                    <p className="text-sm text-muted-foreground">All grade levels</p>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">Mindfulness Practices</a>
                    <p className="text-sm text-muted-foreground">For staff and students</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Crisis Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="border-b pb-2">
                    <a href="#" className="text-blue-600 hover:underline">Emergency Protocol Guide</a>
                    <p className="text-sm text-muted-foreground">Updated March 2025</p>
                  </li>
                  <li className="border-b pb-2">
                    <a href="#" className="text-blue-600 hover:underline">Mental Health Crisis Contacts</a>
                    <p className="text-sm text-muted-foreground">Local and national</p>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">Suicide Prevention Resources</a>
                    <p className="text-sm text-muted-foreground">Training materials</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Professional Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="border-b pb-2">
                    <a href="#" className="text-blue-600 hover:underline">Trauma-Informed Practices</a>
                    <p className="text-sm text-muted-foreground">Online course</p>
                  </li>
                  <li className="border-b pb-2">
                    <a href="#" className="text-blue-600 hover:underline">SEL Integration Strategies</a>
                    <p className="text-sm text-muted-foreground">Workshop materials</p>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">Mental Health First Aid</a>
                    <p className="text-sm text-muted-foreground">Certification program</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CounselorDashboard;
