
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
  Calendar,
  ClipboardCheck,
  FileText,
  Headphones,
  MessageSquare,
  Users,
  Heart,
  BookOpen,
} from "lucide-react";
import { User } from "@/types";

interface StaffProfileProps {
  user: User;
}

const StaffProfile: React.FC<StaffProfileProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Staff overview tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Staff Information</CardTitle>
                <CardDescription>Your professional details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Position</div>
                      <div className="font-medium">School Counselor</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Department</div>
                      <div className="font-medium">Student Support Services</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">School</div>
                      <div className="font-medium">Westfield High</div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="font-medium mb-2">Qualifications & Certifications</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="border rounded-lg p-2">
                        <div className="font-medium text-sm">M.Ed Counseling</div>
                        <div className="text-xs text-muted-foreground">State University</div>
                      </div>
                      <div className="border rounded-lg p-2">
                        <div className="font-medium text-sm">Licensed Counselor</div>
                        <div className="text-xs text-muted-foreground">State Board #12345</div>
                      </div>
                      <div className="border rounded-lg p-2">
                        <div className="font-medium text-sm">Crisis Response</div>
                        <div className="text-xs text-muted-foreground">Certified</div>
                      </div>
                      <div className="border rounded-lg p-2">
                        <div className="font-medium text-sm">Trauma-Informed Care</div>
                        <div className="text-xs text-muted-foreground">Advanced Certificate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <CardDescription>Appointments and meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Student Check-in: Alex J.</div>
                      <Badge variant="outline">9:00 - 9:30</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Individual meeting • Room 105</div>
                  </div>
                  
                  <div className="border rounded-lg p-3 bg-muted/30">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Support Team Meeting</div>
                      <Badge variant="outline">11:00 - 12:00</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Conference Room • 8 attendees</div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Group Session: Stress Management</div>
                      <Badge variant="outline">2:00 - 3:00</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Room 105 • 12 students</div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Schedule
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
                  <ClipboardCheck className="h-5 w-5 mb-1" />
                  <span className="text-xs">Log Intervention</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs">Student Directory</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <Headphones className="h-5 w-5 mb-1" />
                  <span className="text-xs">Staff Assist</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span className="text-xs">Messages</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          {/* Student support tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Priority Students</CardTitle>
              <CardDescription>Students requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border rounded-lg p-3 bg-red-50">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-medium">AJ</span>
                    </div>
                    <div>
                      <div className="font-medium">Alex Johnson</div>
                      <div className="text-sm text-muted-foreground">Grade 9 • Last check-in: Stressed</div>
                    </div>
                    <Badge className="ml-auto" variant="outline">High Priority</Badge>
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
                    <Badge className="ml-auto" variant="outline">Medium Priority</Badge>
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
              
              <Button variant="outline" className="w-full">
                View All Flagged Students
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Intervention Tools</CardTitle>
              <CardDescription>Resources for student support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    <div className="font-medium">Check-in Protocols</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Standardized assessment tools and conversation guides
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">Access Tools</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    <div className="font-medium">Crisis Response</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Protocols and resources for urgent situations
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">View Protocols</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                    <div className="font-medium">SEL Resources</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Social-emotional learning materials and activities
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">Browse Library</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-500" />
                    <div className="font-medium">Group Activities</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Structured group sessions and workshop materials
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">View Activities</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {/* Resources tab */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Professional Resources</CardTitle>
              <CardDescription>Tools and resources for student support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 divide-y">
                <div className="pb-3">
                  <div className="font-medium mb-2">Recent Resources</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        <span className="font-medium">Trauma-Responsive Practices Guide</span>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-green-500" />
                        <span className="font-medium">Anxiety Intervention Toolkit</span>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-amber-500" />
                        <span className="font-medium">Academic Stress Support Strategies</span>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                </div>
                
                <div className="py-3">
                  <div className="font-medium mb-2">Resource Categories</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Heart className="mr-2 h-4 w-4" />
                      Mental Health
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Academic Support
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Social Skills
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Communication
                    </Button>
                  </div>
                </div>
                
                <div className="pt-3">
                  <Button variant="outline" className="w-full">Browse All Resources</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Professional Development</CardTitle>
              <CardDescription>Learning opportunities and certification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-2">Current Training</div>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium">Advanced Crisis Intervention</div>
                        <Badge variant="outline">In Progress</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Complete 3 modules to earn certification
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">3/4 Modules</span>
                        <span className="text-xs text-muted-foreground">Due Oct 25</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="font-medium mb-2">Recommended Training</div>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Trauma-Responsive Schools</div>
                          <div className="text-sm text-muted-foreground">8-hour professional development course</div>
                        </div>
                        <Button size="sm" variant="outline">Enroll</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Mental Health First Aid</div>
                          <div className="text-sm text-muted-foreground">Certification program - 2 days</div>
                        </div>
                        <Button size="sm" variant="outline">Enroll</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Development Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffProfile;
