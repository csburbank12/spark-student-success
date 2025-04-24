import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, MessageSquare, GraduationCap, Activity, 
  Heart, FileText, Bell, Settings, Info, Eye
} from "lucide-react";

const ParentChildrenManager = () => {
  const { user } = useAuth();
  const [activeChild, setActiveChild] = useState(user?.children?.[0]?.id || '');
  
  // Demo children data (would come from API/context in real app)
  const children = user?.children || [];

  if (!children.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <GraduationCap className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">No Children Found</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          No children are currently associated with your account. Please contact your school administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">My Children</h2>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setActiveChild(child.id)}
            className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
              activeChild === child.id ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={`/avatars/student-${child.id.charAt(0)}.png`} />
              <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium">{child.name}</p>
              <p className="text-xs text-muted-foreground">{child.grade}</p>
            </div>
          </button>
        ))}
      </div>

      {children.map((child) => (
        <div key={child.id} className={activeChild === child.id ? "block" : "hidden"}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/avatars/student-${child.id.charAt(0)}.png`} />
                <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-medium">{child.name}</h3>
                <p className="text-muted-foreground">{child.grade} Grade</p>
              </div>
            </div>
            <Badge variant={child.status === "Active" ? "success" : "secondary"}>
              {child.status}
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="wellness">Well-being</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 p-1">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Heart className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Completed Wellness Check-in</p>
                          <p className="text-sm text-muted-foreground">Today, 9:15 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Science Project Submission</p>
                          <p className="text-sm text-muted-foreground">Yesterday, 2:30 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">SEL Activity Completed</p>
                          <p className="text-sm text-muted-foreground">Apr 23, 11:45 AM</p>
                        </div>
                      </div>
                      
                      <Button variant="link" className="px-0">View All Activity</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-auto py-3 flex flex-col">
                        <MessageSquare className="h-5 w-5 mb-2" />
                        <span>Message Teachers</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex flex-col">
                        <Calendar className="h-5 w-5 mb-2" />
                        <span>Schedule Meeting</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex flex-col">
                        <Bell className="h-5 w-5 mb-2" />
                        <span>Notification Settings</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-3 flex flex-col">
                        <Eye className="h-5 w-5 mb-2" />
                        <span>View Reports</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Coming Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex flex-col items-center">
                          <span className="font-bold text-lg">28</span>
                          <span className="text-xs">APR</span>
                        </div>
                        <div>
                          <p className="font-medium">Math Test - Algebra Unit</p>
                          <p className="text-sm text-muted-foreground">Friday, 10:30 AM</p>
                        </div>
                      </div>
                      <Badge>Academic</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex flex-col items-center">
                          <span className="font-bold text-lg">30</span>
                          <span className="text-xs">APR</span>
                        </div>
                        <div>
                          <p className="font-medium">Field Trip Permission Due</p>
                          <p className="text-sm text-muted-foreground">Sunday, 11:59 PM</p>
                        </div>
                      </div>
                      <Badge variant="outline">Due Date</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex flex-col items-center">
                          <span className="font-bold text-lg">5</span>
                          <span className="text-xs">MAY</span>
                        </div>
                        <div>
                          <p className="font-medium">Parent-Teacher Conference</p>
                          <p className="text-sm text-muted-foreground">Friday, 4:00 PM - 4:30 PM</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Meeting</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="academics" className="space-y-4 p-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Academic Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Mathematics</h4>
                        <span>B+</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: "85%" }} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Strong in algebra concepts, needs more practice with geometry.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Science</h4>
                        <span>A-</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "92%" }} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Excelling in lab work and theoretical understanding.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">English</h4>
                        <span>A</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "95%" }} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Strong reader with advanced composition skills.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Upcoming Assignments</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Science Project</span>
                        <span className="text-sm text-muted-foreground">Due Apr 28</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span>Math Quiz</span>
                        <span className="text-sm text-muted-foreground">Apr 30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>English Essay</span>
                        <span className="text-sm text-muted-foreground">May 5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="wellness" className="space-y-4 p-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Well-being Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Recent Mood Check-ins</h4>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                            <span className="text-lg">😊</span>
                          </div>
                          <span className="text-xs">Today</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-1">
                            <span className="text-lg">😐</span>
                          </div>
                          <span className="text-xs">Apr 23</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                            <span className="text-lg">😊</span>
                          </div>
                          <span className="text-xs">Apr 22</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
                            <span className="text-lg">😄</span>
                          </div>
                          <span className="text-xs">Apr 21</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-1">
                            <span className="text-lg">😐</span>
                          </div>
                          <span className="text-xs">Apr 20</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">SEL Progress</h4>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span>Current SEL Pathway</span>
                          <span>75% complete</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: "75%" }} />
                        </div>
                        <div className="text-sm">
                          <p><span className="font-medium">Current Focus:</span> Emotional Regulation</p>
                          <p><span className="font-medium">Recent Activity:</span> Completed "Identifying Emotions" module</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Support Recommendations</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm">Discuss test anxiety management strategies</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm">Encourage regular sleep schedule (noted late-night journal entries)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm">Celebrate progress in science class</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4 p-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="h-[400px] flex items-center justify-center border rounded-lg">
                    <div className="text-center p-6">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Calendar View</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
                        View your child's weekly schedule including classes, extracurricular activities, 
                        and upcoming events.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-4 p-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>School Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>EN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Mr. Ethan Nguyen</p>
                          <p className="text-sm text-muted-foreground">Homeroom Teacher</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Ms. Sarah Collins</p>
                          <p className="text-sm text-muted-foreground">School Counselor</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>MR</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Dr. Maria Rodriguez</p>
                          <p className="text-sm text-muted-foreground">Principal</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Meeting
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Emergency Contacts</h4>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Settings</span>
                        </Button>
                      </div>
                      <div className="mt-3 space-y-3 text-sm">
                        <div className="flex justify-between border-b pb-2">
                          <span>School Office</span>
                          <span>(555) 123-4567</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Health Office</span>
                          <span>(555) 123-4568</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security</span>
                          <span>(555) 123-4569</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  );
};

export default ParentChildrenManager;
