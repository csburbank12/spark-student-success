
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ClipboardCheck,
  FileText,
  Calendar,
  MessageSquare,
  Users,
  Filter,
  Heart,
  Brain,
  Clock,
  BarChart3,
  BookOpen,
  PlusCircle
} from "lucide-react";

const StaffSupportTools = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Support Tools</h2>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="students">Student Support</TabsTrigger>
          <TabsTrigger value="resources">Resources Library</TabsTrigger>
          <TabsTrigger value="intervention">Intervention Tools</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Student Directory</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search students..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Student 1 */}
                <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium">AJ</span>
                      </div>
                      <div>
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-sm text-muted-foreground">Grade 9 • Last check-in: Stressed</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High Priority</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Check-in
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Records
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>

                {/* Student 2 */}
                <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="font-medium">JT</span>
                      </div>
                      <div>
                        <p className="font-medium">Jada Thompson</p>
                        <p className="text-sm text-muted-foreground">Grade 10 • Last check-in: Happy</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Stable</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Check-in
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Records
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>

                {/* Student 3 */}
                <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="font-medium">LC</span>
                      </div>
                      <div>
                        <p className="font-medium">Lily Chen</p>
                        <p className="text-sm text-muted-foreground">Grade 10 • Last check-in: Worried</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Monitoring</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Check-in
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Records
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="w-full max-w-xs">View All Students</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium">AJ</span>
                      </div>
                      <div>
                        <p className="font-medium">Alex Johnson</p>
                        <p className="text-xs text-muted-foreground">Today, 9:15 AM</p>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-sm">😔</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-sm font-medium">JT</span>
                      </div>
                      <div>
                        <p className="font-medium">Jada Thompson</p>
                        <p className="text-xs text-muted-foreground">Today, 8:30 AM</p>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm">😊</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-sm font-medium">LC</span>
                      </div>
                      <div>
                        <p className="font-medium">Lily Chen</p>
                        <p className="text-xs text-muted-foreground">Yesterday, 3:45 PM</p>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-sm">😐</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 border-b pb-3">
                    <div className="mt-1 flex flex-col items-center">
                      <span className="font-bold text-lg">25</span>
                      <span className="text-xs">APR</span>
                    </div>
                    <div>
                      <p className="font-medium">1:1 Check-in: Alex Johnson</p>
                      <p className="text-sm text-muted-foreground">10:30 AM - 11:00 AM</p>
                      <p className="text-xs text-muted-foreground mt-1">Focus: Stress management strategies</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 border-b pb-3">
                    <div className="mt-1 flex flex-col items-center">
                      <span className="font-bold text-lg">25</span>
                      <span className="text-xs">APR</span>
                    </div>
                    <div>
                      <p className="font-medium">Group Session: Anxiety Management</p>
                      <p className="text-sm text-muted-foreground">1:00 PM - 2:00 PM</p>
                      <p className="text-xs text-muted-foreground mt-1">Room 105 - 8 students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex flex-col items-center">
                      <span className="font-bold text-lg">26</span>
                      <span className="text-xs">APR</span>
                    </div>
                    <div>
                      <p className="font-medium">Staff Support Meeting</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</p>
                      <p className="text-xs text-muted-foreground mt-1">Conference Room - Weekly updates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Resources Library</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search resources..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium">Mental Health First Aid</h3>
                      <p className="text-sm text-muted-foreground">
                        Resources for identifying and supporting students in crisis
                      </p>
                      <Button variant="outline">Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Brain className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-medium">Trauma-Informed Practices</h3>
                      <p className="text-sm text-muted-foreground">
                        Approaches for supporting students with trauma backgrounds
                      </p>
                      <Button variant="outline">Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-medium">SEL Curriculum Library</h3>
                      <p className="text-sm text-muted-foreground">
                        Ready-to-use social emotional learning materials
                      </p>
                      <Button variant="outline">Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-medium">Group Activities</h3>
                      <p className="text-sm text-muted-foreground">
                        Facilitator guides and materials for group sessions
                      </p>
                      <Button variant="outline">Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="font-medium">Assessment Tools</h3>
                      <p className="text-sm text-muted-foreground">
                        Standardized measures and screening instruments
                      </p>
                      <Button variant="outline">Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <PlusCircle className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h3 className="font-medium">Community Resources</h3>
                      <p className="text-sm text-muted-foreground">
                        Local referral options and support services
                      </p>
                      <Button variant="outline">Access Resources</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">View Recent Updates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intervention" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Intervention Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <ClipboardCheck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Behavior Log</h3>
                        <p className="text-sm text-muted-foreground">Record and track student behaviors</p>
                      </div>
                    </div>
                    <Button className="w-full">Use Tool</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Support Plan Builder</h3>
                        <p className="text-sm text-muted-foreground">Create customized intervention plans</p>
                      </div>
                    </div>
                    <Button className="w-full">Use Tool</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Coping Skills Wizard</h3>
                        <p className="text-sm text-muted-foreground">Generate tailored coping strategies</p>
                      </div>
                    </div>
                    <Button className="w-full">Use Tool</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Progress Monitoring</h3>
                        <p className="text-sm text-muted-foreground">Track intervention effectiveness</p>
                      </div>
                    </div>
                    <Button className="w-full">Use Tool</Button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Recent Interventions</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium">AJ</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Alex Johnson</p>
                            <Badge>High Priority</Badge>
                          </div>
                          <p className="text-sm mt-1">Daily check-in system for anxiety management</p>
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Started: Apr 18</span>
                            <span>Status: Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-sm font-medium">LC</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Lily Chen</p>
                            <Badge variant="outline">Medium Priority</Badge>
                          </div>
                          <p className="text-sm mt-1">Test anxiety reduction strategies</p>
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Started: Apr 15</span>
                            <span>Status: Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mood Trend Analysis</h3>
                      <p className="text-sm text-muted-foreground">School-wide emotional wellbeing data</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">View Report</Button>
                </div>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Support Services Utilization</h3>
                      <p className="text-sm text-muted-foreground">Track intervention usage and outcomes</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">View Report</Button>
                </div>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Monthly Summary</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive monthly metrics</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">View Report</Button>
                </div>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Custom Report Builder</h3>
                      <p className="text-sm text-muted-foreground">Create tailored analytics reports</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">Create Report</Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 border rounded-lg">
                <h3 className="font-medium mb-4">Recent Reports</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>April Wellness Trends</span>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Q1 Intervention Effectiveness</span>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Grade 9-10 Mood Analysis</span>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
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

export default StaffSupportTools;
