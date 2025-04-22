
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { CheckCircle, Calendar, MessageSquare, Users, TrendingUp, TrendingDown, Heart, School, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ParentDashboardEnhanced = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState<string>("child1");
  const childName = "Alex"; // In a real app, this would be fetched from the database

  // Mock data for children
  const children = [
    { 
      id: "child1", 
      name: "Alex Johnson", 
      grade: "10th Grade", 
      school: "Washington High School",
      recentMood: "Good",
      moodTrend: "stable",
      attendance: 92,
      attendanceTrend: "up",
      checkIns: 14,
      academicStanding: "On Track",
      behaviorRisk: 38,
      behaviorRiskLevel: "low",
      behaviorTrend: "down",
      recentNotes: [
        { date: "Apr 21, 2025", note: "Great participation in class discussion today." },
        { date: "Apr 19, 2025", note: "Completed all assignments for the week." },
      ],
      alerts: 0
    },
    { 
      id: "child2", 
      name: "Jordan Johnson", 
      grade: "7th Grade", 
      school: "Lincoln Middle School",
      recentMood: "Okay",
      moodTrend: "down",
      attendance: 85,
      attendanceTrend: "down",
      checkIns: 10,
      academicStanding: "Needs Support",
      behaviorRisk: 65,
      behaviorRiskLevel: "medium",
      behaviorTrend: "up",
      recentNotes: [
        { date: "Apr 20, 2025", note: "Struggled to stay focused in math class." },
        { date: "Apr 18, 2025", note: "Missing one homework assignment this week." },
      ],
      alerts: 1
    },
  ];

  const selectedChildData = children.find(child => child.id === selectedChild) || children[0];

  // Home strategies based on behavior risk level
  const getHomeStrategies = () => {
    if (selectedChildData.behaviorRiskLevel === "medium" || selectedChildData.behaviorRiskLevel === "high") {
      return [
        "Schedule regular check-in conversations with your child about how school is going",
        "Create a consistent homework routine with a dedicated quiet space",
        "Acknowledge small improvements and celebrate successes together",
        "Maintain consistent communication with teachers through the messaging system",
        "Practice mindfulness activities together as a family (see Resources tab)"
      ];
    }
    return [
      "Continue your current supportive approach",
      "Encourage your child to share their daily school experiences",
      "Maintain the consistent homework routine",
      "Participate in school events when possible"
    ];
  };

  // Determine risk indicator color
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Determine trend icon
  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  // Format with parent-friendly language
  const getWellnessSummary = () => {
    if (selectedChildData.behaviorRiskLevel === "high") {
      return {
        title: "Needs Additional Support",
        description: "Our team has noticed some challenges that may need attention.",
        statusColor: "text-red-500"
      };
    }
    if (selectedChildData.behaviorRiskLevel === "medium") {
      return {
        title: "Some Areas Need Support",
        description: "Your child is doing well in some areas but could use extra support in others.",
        statusColor: "text-amber-500"
      };
    }
    return {
      title: "Doing Well Overall",
      description: "Your child is showing positive engagement and wellness at school.",
      statusColor: "text-green-500"
    };
  };

  const wellnessSummary = getWellnessSummary();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome, {user?.name?.split(" ")[0]}!
        </h2>
        {children.length > 1 && (
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              {children.map(child => (
                <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <Card className="border-l-4" style={{ borderLeftColor: selectedChildData.behaviorRiskLevel === "low" ? "rgb(34 197 94)" : selectedChildData.behaviorRiskLevel === "medium" ? "rgb(245 158 11)" : "rgb(239 68 68)" }}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{selectedChildData.name}'s Wellness Summary</CardTitle>
              <CardDescription>
                <span className={wellnessSummary.statusColor + " font-medium"}>{wellnessSummary.title}</span> - {wellnessSummary.description}
              </CardDescription>
            </div>
            {selectedChildData.alerts > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {selectedChildData.alerts} Alert
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">School</div>
              <div className="flex items-center gap-1">
                <School className="h-4 w-4 text-primary" />
                <span>{selectedChildData.school}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-2">Grade</div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>{selectedChildData.grade}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Recent Mood</div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-primary" />
                <span>{selectedChildData.recentMood}</span>
                {getTrendIcon(selectedChildData.moodTrend)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">Academic Standing</div>
              <div className="flex items-center gap-1">
                <Badge className={selectedChildData.academicStanding === "On Track" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                  {selectedChildData.academicStanding}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Attendance</div>
              <div className="flex items-center gap-1">
                <span>{selectedChildData.attendance}%</span>
                {getTrendIcon(selectedChildData.attendanceTrend)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">Check-ins</div>
              <div>{selectedChildData.checkIns} in the last 2 weeks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Mood & Wellness"
          value={selectedChildData.recentMood}
          description="Recent check-ins"
          icon={<Heart className="h-4 w-4" />}
        />
        <StatCard
          title="Attendance"
          value={`${selectedChildData.attendance}%`}
          description="Last 30 days"
          icon={<CheckCircle className="h-4 w-4" />}
          trend={selectedChildData.attendanceTrend === "up" ? "up" : undefined}
          trendValue={selectedChildData.attendanceTrend === "up" ? "Improving" : undefined}
        />
        <StatCard
          title="Messages"
          value="3"
          description="Unread from teachers"
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <StatCard
          title="Upcoming Events"
          value="2"
          description="School events this week"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="wellness">Mood & Wellness</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="resources">Family Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent School Notes</CardTitle>
                <CardDescription>Notes from teachers and staff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedChildData.recentNotes.length > 0 ? (
                  selectedChildData.recentNotes.map((note, idx) => (
                    <div key={idx} className="p-3 border rounded-md">
                      <p className="text-sm">{note.note}</p>
                      <p className="text-xs text-muted-foreground mt-1">{note.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-6">No recent notes</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Notes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested Home Strategies</CardTitle>
                <CardDescription>Ways to support your child at home</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getHomeStrategies().map((strategy, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Family Resource Center</Button>
              </CardFooter>
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
        
        <TabsContent value="wellness" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Overview</CardTitle>
              <CardDescription>Understanding your child's wellness at school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Overall Wellness Score</h3>
                  <Badge className={getRiskColor(selectedChildData.behaviorRiskLevel)}>
                    {selectedChildData.behaviorRiskLevel === "low" ? "Strong" : selectedChildData.behaviorRiskLevel === "medium" ? "Mixed" : "Needs Support"}
                  </Badge>
                </div>
                <Progress value={100 - selectedChildData.behaviorRisk} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  This score summarizes your child's overall wellness at school, including mood, social interactions, and engagement.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-1">Recent Moods</h3>
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">😊</span>
                        <span className="text-sm">Happy</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">🙂</span>
                        <span className="text-sm">Good</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">😐</span>
                        <span className="text-sm">Okay</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">😔</span>
                        <span className="text-sm">Sad</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-1">Social Well-being</h3>
                  <p className="text-sm">
                    {selectedChildData.behaviorRiskLevel === "low" 
                      ? "Your child appears to be connecting well with peers and participating in class activities."
                      : selectedChildData.behaviorRiskLevel === "medium"
                      ? "Your child sometimes engages with peers but may need support with social connections."
                      : "Your child may need additional support with social connections and classroom participation."
                    }
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Monthly Mood Trend</h3>
                <div className="h-40 border rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Mood trend visualization coming soon</p>
                </div>
              </div>
              
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Support at Home</CardTitle>
              <CardDescription>Ways to support your child's emotional well-being</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <h3 className="font-medium">Create Conversation Opportunities</h3>
                  <p className="text-sm mt-1">
                    Find relaxed times to chat, like during car rides or while preparing meals. 
                    Ask open-ended questions about their day and listen without judgment.
                  </p>
                </div>
                <div className="p-3 border rounded-md">
                  <h3 className="font-medium">Establish Consistent Routines</h3>
                  <p className="text-sm mt-1">
                    Predictable routines help children feel secure and reduce stress.
                    Maintain consistent meal times, homework time, and bedtimes.
                  </p>
                </div>
                <div className="p-3 border rounded-md">
                  <h3 className="font-medium">Practice Mindfulness Together</h3>
                  <p className="text-sm mt-1">
                    Take 5 minutes each day for deep breathing or a mindful activity together.
                    This helps develop emotional awareness and coping skills.
                  </p>
                  <Button variant="link" className="px-0 text-sm">View Guided Activities</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academics" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>Your child's performance across subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Mathematics</h3>
                    <span className="font-medium">{selectedChildData.id === "child1" ? "B+" : "C"}</span>
                  </div>
                  <Progress value={selectedChildData.id === "child1" ? 85 : 72} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {selectedChildData.id === "child1" 
                      ? "Strong performance in most areas. Excelling in algebra concepts."
                      : "Showing improvement but struggles with some key concepts."}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Science</h3>
                    <span className="font-medium">{selectedChildData.id === "child1" ? "A-" : "B-"}</span>
                  </div>
                  <Progress value={selectedChildData.id === "child1" ? 92 : 82} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {selectedChildData.id === "child1" 
                      ? "Excellent participation and understanding of concepts."
                      : "Good understanding but needs to complete all assignments."}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">English Language Arts</h3>
                    <span className="font-medium">{selectedChildData.id === "child1" ? "A" : "B"}</span>
                  </div>
                  <Progress value={selectedChildData.id === "child1" ? 95 : 85} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {selectedChildData.id === "child1" 
                      ? "Strong reader with excellent writing skills."
                      : "Good participation but needs help organizing written work."}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Upcoming Assignments</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span>Science Project</span>
                      <span className="text-muted-foreground">Due Apr 28</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>Math Quiz</span>
                      <span className="text-muted-foreground">Apr 30</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>English Essay</span>
                      <span className="text-muted-foreground">May 5</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Academic Support Tips</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>Review weekly math concepts together</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>Encourage reading 20 minutes daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>Help break down large assignments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full">
            Schedule Teacher Conference
          </Button>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Resources</CardTitle>
              <CardDescription>Tools and resources to support your child</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Emotional Well-being</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Resources to support your child's emotional health
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Conversation Guides
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Mood Activities
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Crisis Support
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Wellness Apps
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Academic Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tools to help your child succeed academically
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Homework Help
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Study Skills
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Online Tutoring
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Learning Apps
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">School Community</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ways to get involved in your child's school
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Volunteer Opportunities
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      School Events
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Parent Groups
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      School Contacts
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Family Activities</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fun ways to support learning at home
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Weekend Projects
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Educational Games
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Reading Lists
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto py-2">
                      Local Activities
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Webinars & Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Supporting Teen Mental Health</h3>
                    <Badge>Virtual</Badge>
                  </div>
                  <p className="text-sm mt-1">
                    Learn strategies to support your teen's emotional well-being during challenging times.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Thursday, May 12 • 7:00-8:30 PM
                  </p>
                  <Button size="sm" className="mt-2">Register</Button>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Helping with Math Homework</h3>
                    <Badge>In-Person</Badge>
                  </div>
                  <p className="text-sm mt-1">
                    Tips and strategies for parents to help with middle and high school math.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tuesday, May 17 • 6:00-7:30 PM • School Library
                  </p>
                  <Button size="sm" className="mt-2">Register</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboardEnhanced;
