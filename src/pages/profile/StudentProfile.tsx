
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, FileText, Heart, MessagesSquare, Target, Users2 } from "lucide-react";
import { User } from "@/types";

interface StudentProfileProps {
  user: User;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Student overview tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">SEL Progress</CardTitle>
                <CardDescription>Social-emotional learning pathways</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Self-awareness</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Self-regulation</span>
                      <span className="text-sm text-muted-foreground">62%</span>
                    </div>
                    <Progress value={62} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Social awareness</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Relationship skills</span>
                      <span className="text-sm text-muted-foreground">80%</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <Button className="w-full" variant="outline">
                    <Target className="mr-2 h-4 w-4" />
                    View SEL Pathways
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Check-ins</CardTitle>
                <CardDescription>Your mood and energy levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-xl">😊</div>
                      <div className="text-xs mt-1">Today</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-xl">😐</div>
                      <div className="text-xs mt-1">Yesterday</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-xl">🙂</div>
                      <div className="text-xs mt-1">2 days ago</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-2">Energy Level Trend</div>
                    <div className="h-10 bg-muted rounded-md overflow-hidden flex">
                      <div className="h-full w-1/5 bg-amber-400"></div>
                      <div className="h-full w-1/5 bg-amber-500"></div>
                      <div className="h-full w-1/5 bg-green-500"></div>
                      <div className="h-full w-1/5 bg-green-400"></div>
                      <div className="h-full w-1/5 bg-green-500"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">5 days ago</span>
                      <span className="text-xs text-muted-foreground">Today</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
                    Check in Now
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
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs">Journal Entry</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <Users2 className="h-5 w-5 mb-1" />
                  <span className="text-xs">Trusted Adults</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <MessagesSquare className="h-5 w-5 mb-1" />
                  <span className="text-xs">Request Support</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 px-2">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs">Schedule</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academics" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Academic Progress</CardTitle>
              <CardDescription>Current courses and assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Current Courses</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {["Mathematics", "English", "Science", "Social Studies"].map((course) => (
                      <div key={course} className="flex items-center justify-between border rounded-lg p-3">
                        <span>{course}</span>
                        <Badge variant="outline">In Progress</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Upcoming Assignments</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between border rounded-lg p-3">
                      <div>
                        <div className="font-medium">Mathematics Quiz</div>
                        <div className="text-sm text-muted-foreground">Due in 2 days</div>
                      </div>
                      <Badge>Important</Badge>
                    </div>
                    <div className="flex justify-between border rounded-lg p-3">
                      <div>
                        <div className="font-medium">Science Project</div>
                        <div className="text-sm text-muted-foreground">Due next week</div>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Wellness Resources</CardTitle>
              <CardDescription>Tools for your mental and emotional wellbeing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto justify-start py-6 px-4">
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-2">
                      <Heart className="h-5 w-5 mr-2 text-rose-500" />
                      <span className="font-semibold">Mental Health Toolkit</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Access tools and exercises for stress, anxiety and more
                    </span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto justify-start py-6 px-4">
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="font-semibold">Digital Journal</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Record your thoughts and track your emotional journey
                    </span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto justify-start py-6 px-4">
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-2">
                      <Bell className="h-5 w-5 mr-2 text-amber-500" />
                      <span className="font-semibold">Reset Room</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Take a break and practice mindfulness exercises
                    </span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto justify-start py-6 px-4">
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-2">
                      <Users2 className="h-5 w-5 mr-2 text-green-500" />
                      <span className="font-semibold">Support Network</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Connect with trusted adults or peers for support
                    </span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Support Network</CardTitle>
              <CardDescription>Your trusted adults and support resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Your Trusted Adults</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center border rounded-lg p-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="font-medium">MR</span>
                      </div>
                      <div>
                        <div className="font-medium">Ms. Rodriguez</div>
                        <div className="text-sm text-muted-foreground">Teacher</div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <MessagesSquare className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center border rounded-lg p-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="font-medium">SC</span>
                      </div>
                      <div>
                        <div className="font-medium">School Counselor</div>
                        <div className="text-sm text-muted-foreground">Support Staff</div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <MessagesSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Support Resources</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">Crisis Text Line</span>
                        <span className="text-xs text-muted-foreground">
                          Text HOME to 741741
                        </span>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">School Support Hotline</span>
                        <span className="text-xs text-muted-foreground">
                          Available 8am-4pm weekdays
                        </span>
                      </div>
                    </Button>
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

export default StudentProfile;
