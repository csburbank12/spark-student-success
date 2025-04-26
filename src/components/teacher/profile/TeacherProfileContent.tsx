
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
  GraduationCap,
  Headphones,
  MessageSquare,
  Settings,
  Target,
} from "lucide-react";
import { User } from "@/types";
import ProfileHeader from "@/components/profile/ProfileHeader";

interface TeacherProfileContentProps {
  user: User;
}

const TeacherProfileContent: React.FC<TeacherProfileContentProps> = ({ user }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      <ProfileHeader 
        name={user?.name || "Teacher"}
        email={user?.email || ""}
        role={user?.role || "teacher"}
        avatarUrl={user?.avatar_url}
      />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">Classes & Students</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Teacher Information</CardTitle>
                <CardDescription>Your professional details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Position</div>
                      <div className="font-medium">Lead Teacher</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Department</div>
                      <div className="font-medium">Social Studies</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">School</div>
                      <div className="font-medium">Westfield High</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Employee ID</div>
                      <div className="font-medium">T-5391</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <CardDescription>Upcoming classes and meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Period 1: Social Studies</div>
                      <Badge variant="outline">8:30 - 9:20</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Room 203 • 28 students</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Faculty Meeting</div>
                      <Badge variant="outline">12:30 - 1:30</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Conference Room</div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
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
                  <span className="text-xs">Take Attendance</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <GraduationCap className="h-5 w-5 mb-1" />
                  <span className="text-xs">Student Check-in</span>
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

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Classes</CardTitle>
              <CardDescription>Students and class information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-3 font-medium">Period 1: Social Studies</div>
                  <div className="p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Class Details</div>
                        <div className="text-sm text-muted-foreground">28 students • Room 203 • 8:30-9:20am</div>
                      </div>
                      <Button size="sm">View Class</Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-3 font-medium">Period 3: Homeroom</div>
                  <div className="p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Class Details</div>
                        <div className="text-sm text-muted-foreground">24 students • Room 203 • 10:15-11:00am</div>
                      </div>
                      <Button size="sm">View Class</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Teacher Resources</CardTitle>
              <CardDescription>Tools and resources for classroom management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-500" />
                    <div className="font-medium">SEL Resources</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Access social-emotional learning curricula
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">Browse Library</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    <div className="font-medium">Lesson Plans</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Find and create lesson plans
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">View Plans</Button>
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

export default TeacherProfileContent;
