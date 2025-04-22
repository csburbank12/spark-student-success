
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CirclePlus, Trophy, Target, Calendar, Clock, ArrowUp, Clock1, CheckCircle } from "lucide-react";

const FutureMe = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Future Me</h2>
        <Button>
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-blue-700">College & Career</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-medium">3</span>
              <span className="text-sm text-muted-foreground">goals in progress</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-green-700">Academic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-green-500" />
              <span className="text-lg font-medium">5</span>
              <span className="text-sm text-muted-foreground">goals in progress</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-purple-700">Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-medium">4</span>
              <span className="text-sm text-muted-foreground">goals in progress</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="suggested">Suggested Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">College & Career</Badge>
                      <span className="text-sm text-muted-foreground">Due in 60 days</span>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Research 5 colleges that match my interests</h3>
                    <p className="text-sm text-muted-foreground">Complete profile on College Board and find matching schools</p>
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span>Progress</span>
                        <span>2/5 completed</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Log Progress
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-green-100 text-green-700 border-green-200">Academic</Badge>
                      <span className="text-sm text-muted-foreground">Due in 14 days</span>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Improve Algebra grade to a B+</h3>
                    <p className="text-sm text-muted-foreground">Study 30 minutes daily and complete all homework assignments</p>
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span>Progress</span>
                        <span>75% complete</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Log Progress
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">Personal</Badge>
                      <span className="text-sm text-muted-foreground">Ongoing</span>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Practice mindfulness 10 minutes daily</h3>
                    <p className="text-sm text-muted-foreground">Use guided meditations from the Mental Health Toolkit</p>
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span>Progress</span>
                        <span>5-day streak</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-2 w-full bg-purple-500 rounded-sm"></div>
                        <div className="h-2 w-full bg-purple-500 rounded-sm"></div>
                        <div className="h-2 w-full bg-purple-500 rounded-sm"></div>
                        <div className="h-2 w-full bg-purple-500 rounded-sm"></div>
                        <div className="h-2 w-full bg-purple-500 rounded-sm"></div>
                        <div className="h-2 w-full bg-muted rounded-sm"></div>
                        <div className="h-2 w-full bg-muted rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Check In
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-green-100 text-green-700 border-green-200">Academic</Badge>
                  <div className="flex items-center text-green-600">
                    <Trophy className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Completed</span>
                  </div>
                </div>
                <h3 className="text-base font-medium mb-1">Complete Science Project</h3>
                <p className="text-xs text-muted-foreground mb-3">Finished 2 days early</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Mar 15, 2025</span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">College & Career</Badge>
                  <div className="flex items-center text-green-600">
                    <Trophy className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">Completed</span>
                  </div>
                </div>
                <h3 className="text-base font-medium mb-1">Take PSAT Practice Test</h3>
                <p className="text-xs text-muted-foreground mb-3">Score: 1280</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Feb 20, 2025</span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="suggested">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">Personal</Badge>
                  <Badge variant="outline">Suggested</Badge>
                </div>
                <h3 className="text-base font-medium mb-1">Join a Club or Team</h3>
                <p className="text-xs text-muted-foreground mb-3">Extracurricular activities build skills and look great on college applications</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm">Add Goal</Button>
                  <Button variant="outline" size="sm">Dismiss</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">College & Career</Badge>
                  <Badge variant="outline">Suggested</Badge>
                </div>
                <h3 className="text-base font-medium mb-1">Schedule College Counselor Meeting</h3>
                <p className="text-xs text-muted-foreground mb-3">Get personalized advice for your college search</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm">Add Goal</Button>
                  <Button variant="outline" size="sm">Dismiss</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-green-100 text-green-700 border-green-200">Academic</Badge>
                  <Badge variant="outline">Suggested</Badge>
                </div>
                <h3 className="text-base font-medium mb-1">Create Study Schedule</h3>
                <p className="text-xs text-muted-foreground mb-3">Plan dedicated time for each subject</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm">Add Goal</Button>
                  <Button variant="outline" size="sm">Dismiss</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Goal Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mb-2">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xl font-bold">5</span>
              <span className="text-xs text-center text-muted-foreground">Goals Completed</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full mb-2">
                <ArrowUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xl font-bold">12</span>
              <span className="text-xs text-center text-muted-foreground">Days of Progress</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg">
              <div className="bg-amber-100 p-2 rounded-full mb-2">
                <Clock1 className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-xl font-bold">5</span>
              <span className="text-xs text-center text-muted-foreground">Day Streak</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full mb-2">
                <Badge className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xl font-bold">3</span>
              <span className="text-xs text-center text-muted-foreground">Badges Earned</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FutureMe;
