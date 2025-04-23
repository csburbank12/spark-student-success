
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Heart, Activity } from "lucide-react";

const ParentResources = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Parent Resources</h2>
      </div>
      
      <Tabs defaultValue="academic">
        <TabsList>
          <TabsTrigger value="academic">
            <BookOpen className="mr-2 h-4 w-4" />
            Academic Support
          </TabsTrigger>
          <TabsTrigger value="wellbeing">
            <Heart className="mr-2 h-4 w-4" />
            Wellbeing
          </TabsTrigger>
          <TabsTrigger value="activities">
            <Activity className="mr-2 h-4 w-4" />
            Home Activities
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Support Guides</CardTitle>
              <CardDescription>Resources to help your child succeed academically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Academic Support Resources */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Supporting Homework Routines</h3>
                        <p className="text-sm text-muted-foreground mt-1">Learn how to establish effective homework habits and create a productive study environment.</p>
                        <Button variant="link" className="p-0 h-auto mt-2">Download PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Understanding School Curriculum</h3>
                        <p className="text-sm text-muted-foreground mt-1">Get insights into what your child is learning and how you can support their education.</p>
                        <Button variant="link" className="p-0 h-auto mt-2">Download PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-md bg-blue-50 p-4">
                <h3 className="font-medium text-blue-800">Academic Support Webinars</h3>
                <p className="text-sm text-blue-700 mt-1">Join our upcoming live sessions with education specialists:</p>
                <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
                  <li>May 15, 7:00 PM - "Supporting Learning Differences at Home"</li>
                  <li>May 22, 6:30 PM - "Technology Tools for Academic Success"</li>
                  <li>May 29, 7:00 PM - "Preparing for End-of-Year Assessments"</li>
                </ul>
                <Button className="mt-4">Register for Webinars</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wellbeing" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Child Wellbeing Resources</CardTitle>
              <CardDescription>Support your child's emotional and mental health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Wellbeing Resources */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Teen Mental Health Guide</h3>
                        <p className="text-sm text-muted-foreground mt-1">Understanding the teenage brain and supporting emotional well-being.</p>
                        <Button variant="link" className="p-0 h-auto mt-2">Download PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Healthy Digital Habits</h3>
                        <p className="text-sm text-muted-foreground mt-1">Guide to helping your child maintain a healthy relationship with technology.</p>
                        <Button variant="link" className="p-0 h-auto mt-2">Download PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-md bg-green-50 p-4">
                <h3 className="font-medium text-green-800">Mental Health Resources</h3>
                <p className="text-sm text-green-700 mt-1">Additional support resources for families:</p>
                <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
                  <li>National Crisis Text Line: Text HOME to 741741</li>
                  <li>School Counselor: counselor@school.edu | (555) 123-4567</li>
                  <li>Community Mental Health Center: (555) 987-6543</li>
                </ul>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">Access Resource Directory</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Home Activities</CardTitle>
              <CardDescription>Engaging activities to support learning and well-being at home</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Home Activities */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                        <Activity className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-medium">Mindfulness Activities</h3>
                      <p className="text-sm text-muted-foreground mt-1">5-minute exercises for the whole family</p>
                      <Button variant="outline" className="mt-4">View Activities</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                        <Activity className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-medium">Communication Games</h3>
                      <p className="text-sm text-muted-foreground mt-1">Strengthen family bonds through conversation</p>
                      <Button variant="outline" className="mt-4">View Activities</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                        <Activity className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-medium">Educational Projects</h3>
                      <p className="text-sm text-muted-foreground mt-1">Fun learning activities for different ages</p>
                      <Button variant="outline" className="mt-4">View Activities</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-md bg-amber-50 p-4">
                <h3 className="font-medium text-amber-800">Featured Activity: Family Emotion Check-Ins</h3>
                <p className="text-sm text-amber-700 mt-1">Learn how to create regular family check-ins to discuss feelings and emotional well-being:</p>
                <ol className="list-decimal list-inside text-sm text-amber-700 mt-2 space-y-1">
                  <li>Set aside 15 minutes each day at a consistent time</li>
                  <li>Use simple emotion words and visual aids for younger children</li>
                  <li>Practice active listening without judgment</li>
                  <li>Share your own appropriate emotional experiences</li>
                  <li>End with a positive affirmation or gratitude practice</li>
                </ol>
                <Button className="mt-4 bg-amber-600 hover:bg-amber-700">Download Activity Guide</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentResources;
