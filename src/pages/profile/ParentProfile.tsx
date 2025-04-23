
import React from "react";
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
  Calendar,
  FileText,
  Heart,
  MessageSquare,
  BarChart,
  BookOpen,
} from "lucide-react";
import { User } from "@/types";

interface ParentProfileProps {
  user: User;
}

const ParentProfile: React.FC<ParentProfileProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="student">Child Information</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Parent overview tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Parent Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Parent Name</div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-medium">(555) 123-4567</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Relationship</div>
                      <div className="font-medium">Mother</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      Update Contact Information
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Child Overview</CardTitle>
                <CardDescription>Quick status of your child</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-medium">AJ</span>
                    </div>
                    <div>
                      <div className="font-medium">Alex Johnson</div>
                      <div className="text-sm text-muted-foreground">Grade 9 • Student ID: S-12345</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Today's Mood</div>
                        <div className="text-xl">😊</div>
                      </div>
                      <Badge className="ml-2">Good</Badge>
                    </div>
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Attendance</div>
                        <div className="text-sm">Present today</div>
                      </div>
                      <Badge variant="outline" className="bg-green-50">98%</Badge>
                    </div>
                    <div className="border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">Upcoming</div>
                        <div className="text-sm">Science project due Friday</div>
                      </div>
                      <Badge variant="outline">3 days</Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View Complete Profile
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
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span className="text-xs">Message Teacher</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs">Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <Activity className="h-5 w-5 mb-1" />
                  <span className="text-xs">View Activity</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <BookOpen className="h-5 w-5 mb-1" />
                  <span className="text-xs">Resources</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student" className="space-y-4">
          {/* Child information tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Student Details</CardTitle>
              <CardDescription>Academic and personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-lg font-medium">AJ</span>
                </div>
                <div>
                  <div className="font-medium text-lg">Alex Johnson</div>
                  <div className="text-sm text-muted-foreground">9th Grade • Homeroom: Ms. Rodriguez</div>
                  <div className="text-sm text-muted-foreground">Student ID: S-12345</div>
                </div>
              </div>
              
              <div className="pt-3 border-t space-y-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Date of Birth</div>
                    <div className="font-medium">April 15, 2009</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Grade Level</div>
                    <div className="font-medium">9th Grade</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">School</div>
                    <div className="font-medium">Westfield High School</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Counselor</div>
                    <div className="font-medium">Dr. Johnson</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <div className="font-medium mb-2">Academic Information</div>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="text-sm font-medium mb-1">Current Classes</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>• English 9</div>
                      <div>• Algebra I</div>
                      <div>• Biology</div>
                      <div>• World History</div>
                      <div>• Art</div>
                      <div>• Physical Education</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="text-sm font-medium mb-1">Academic Support</div>
                    <div className="text-sm text-muted-foreground">No current support plans</div>
                    <Button size="sm" variant="outline" className="mt-2">
                      Request Support
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Schedule & Assignments</CardTitle>
              <CardDescription>Current and upcoming work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="font-medium">Upcoming Assignments</div>
                <div className="space-y-2">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Biology: Ecosystem Project</div>
                        <div className="text-sm text-muted-foreground">Due Friday, October 15</div>
                      </div>
                      <Badge>Important</Badge>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Algebra: Chapter 3 Problems</div>
                        <div className="text-sm text-muted-foreground">Due Thursday, October 14</div>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t space-y-3">
                <div className="font-medium">Recent Grades</div>
                <div className="space-y-2">
                  <div className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">English: Essay</div>
                      <div className="text-sm text-muted-foreground">Completed Oct 8</div>
                    </div>
                    <Badge variant="outline" className="bg-green-50">A</Badge>
                  </div>
                  <div className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium">History: Quiz</div>
                      <div className="text-sm text-muted-foreground">Completed Oct 6</div>
                    </div>
                    <Badge variant="outline" className="bg-amber-50">B</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <BarChart className="mr-2 h-4 w-4" />
                  View All Academic Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          {/* Wellness tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Emotional Well-being</CardTitle>
              <CardDescription>Tracking your child's emotional health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Mood Check-in Trends</div>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                      <span>Past 7 Days</span>
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-green-400 inline-block"></span>
                        <span>Happy</span>
                        <span className="h-3 w-3 rounded-full bg-amber-400 inline-block"></span>
                        <span>Okay</span>
                        <span className="h-3 w-3 rounded-full bg-red-400 inline-block"></span>
                        <span>Struggling</span>
                      </div>
                    </div>
                    <div className="h-24 flex items-end space-x-2">
                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="bg-amber-400 h-1/2 rounded-t-sm"></div>
                        <div className="text-xs text-center mt-1">Mon</div>
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="bg-green-400 h-3/4 rounded-t-sm"></div>
                        <div className="text-xs text-center mt-1">Tue</div>
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="bg-green-400 h-4/5 rounded-t-sm"></div>
                        <div className="text-xs text-center mt-1">Wed</div>
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="bg-amber-400 h-2/5 rounded-t-sm"></div>
                        <div className="text-xs text-center mt-1">Thu</div>
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="bg-red-400 h-1/4 rounded-t-sm"></div>
                        <div className="text-xs text-center mt-1">Fri</div>
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="bg-amber-400 h-1/2 rounded-t-sm"></div>
                        <div className="text-xs text-center mt-1">Sat</div>
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="bg-green-400 h-3/4 rounded-t-sm"></div>
                        <div className="text-xs text-center mt-1">Sun</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-4">
                      Note: Alex has shown some mood fluctuations this past week.
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="font-medium mb-2">SEL Progress</div>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Self-awareness</span>
                        <span>75%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Relationship skills</span>
                        <span>62%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Self-regulation</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground pt-2">
                      <p>SEL lessons are helping Alex develop emotional awareness and regulation skills.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Access Wellness Resources
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Parent Resources</CardTitle>
              <CardDescription>Support materials for parents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">SEL at Home</div>
                  <div className="text-sm text-muted-foreground">
                    Activities and conversations to support your child's social-emotional development
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Access Guide
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">Mental Health Support</div>
                  <div className="text-sm text-muted-foreground">
                    Resources for supporting your child's mental health and well-being
                  </div>
                  <Button variant="outline" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    View Resources
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">Parent Education</div>
                  <div className="text-sm text-muted-foreground">
                    Webinars and articles on adolescent development and parenting strategies
                  </div>
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explore Content
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="font-medium">Community Support</div>
                  <div className="text-sm text-muted-foreground">
                    Connect with other parents and access community resources
                  </div>
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Join Network
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          {/* Communication tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">School Communication</CardTitle>
              <CardDescription>Message teachers and staff</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Teacher Contacts</div>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="font-medium">MR</span>
                      </div>
                      <div>
                        <div className="font-medium">Ms. Rodriguez</div>
                        <div className="text-sm text-muted-foreground">Homeroom Teacher</div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="font-medium">DJ</span>
                      </div>
                      <div>
                        <div className="font-medium">Dr. Johnson</div>
                        <div className="text-sm text-muted-foreground">School Counselor</div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="font-medium mb-2">Recent Messages</div>
                  <div className="border rounded-lg divide-y">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">Field Trip Permission</div>
                        <Badge variant="outline">2 days ago</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        From Ms. Rodriguez regarding next week's science museum trip.
                      </div>
                      <Button variant="outline" size="sm">View Message</Button>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">Parent-Teacher Conference</div>
                        <Badge variant="outline">1 week ago</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        School-wide announcement about upcoming conferences.
                      </div>
                      <Button variant="outline" size="sm">View Message</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Schedule Meetings</CardTitle>
              <CardDescription>Plan conferences and appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Parent-Teacher Conferences</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Schedule a meeting with your child's teachers for October 20-22
                  </div>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-1">Counselor Meeting</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Request a meeting with Dr. Johnson to discuss your child's progress
                  </div>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
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

export default ParentProfile;

// For the Users component that doesn't exist
function Users(props: any) {
  return <div {...props} />;
}
