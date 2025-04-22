
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CirclePlay, Lightbulb, BookOpen, Edit, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MentalHealthToolkit = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Mental Health Toolkit</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Feeling right now?</CardTitle>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Personalized</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Your recent check-ins show you might be feeling stressed about school. Here are some resources that might help:</p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <CirclePlay className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="font-medium">5-Minute Destress Meditation</div>
                    <div className="text-xs text-muted-foreground">Quick guided exercise to reset your mind</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="font-medium">Stress Management Techniques</div>
                    <div className="text-xs text-muted-foreground">Practical tips for managing academic pressure</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Daily Wellness Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Building consistent habits can improve your mental health over time:</p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <HeartPulse className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <div className="font-medium">Box Breathing Exercise</div>
                    <div className="text-xs text-muted-foreground">4-second breathe technique for instant calm</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Edit className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <div className="font-medium">Gratitude Journal Prompt</div>
                    <div className="text-xs text-muted-foreground">Daily writing to focus on positive aspects</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breathing">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="meditation">Meditation</TabsTrigger>
          <TabsTrigger value="journaling">Journaling</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breathing" className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mt-4">
          <h3 className="text-xl font-medium mb-4">Breathing Exercises</h3>
          
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Box Breathing</h4>
              <p className="text-muted-foreground mb-4">A technique used by Navy SEALs to reduce stress and improve concentration:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Breathe in counting to four</li>
                <li>Hold your breath for a count of four</li>
                <li>Exhale through your mouth for a count of four</li>
                <li>Hold your breath for a count of four</li>
                <li>Repeat for at least 5 cycles</li>
              </ol>
              <Button className="mt-4">Start Guided Exercise</Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">4-7-8 Breathing</h4>
              <p className="text-muted-foreground mb-4">Helps reduce anxiety and helps with sleep:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Exhale completely through your mouth</li>
                <li>Close your mouth and inhale through your nose for 4 seconds</li>
                <li>Hold your breath for 7 seconds</li>
                <li>Exhale completely through your mouth for 8 seconds</li>
                <li>Repeat for four full breaths</li>
              </ol>
              <Button className="mt-4">Start Guided Exercise</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="meditation" className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg mt-4">
          <h3 className="text-xl font-medium mb-4">Guided Meditations</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <CirclePlay className="h-10 w-10 text-primary" />
                </div>
                <h4 className="font-medium">5-Minute Calming Meditation</h4>
                <p className="text-sm text-muted-foreground">A quick reset for busy days</p>
                <Button variant="outline" size="sm" className="mt-2">Play</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <CirclePlay className="h-10 w-10 text-primary" />
                </div>
                <h4 className="font-medium">Focus & Concentration</h4>
                <p className="text-sm text-muted-foreground">Prepare your mind for studying</p>
                <Button variant="outline" size="sm" className="mt-2">Play</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <CirclePlay className="h-10 w-10 text-primary" />
                </div>
                <h4 className="font-medium">Sleep & Relaxation</h4>
                <p className="text-sm text-muted-foreground">Wind down before bedtime</p>
                <Button variant="outline" size="sm" className="mt-2">Play</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
                  <CirclePlay className="h-10 w-10 text-primary" />
                </div>
                <h4 className="font-medium">Test Anxiety Relief</h4>
                <p className="text-sm text-muted-foreground">Calm your nerves before exams</p>
                <Button variant="outline" size="sm" className="mt-2">Play</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="journaling" className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg mt-4">
          <h3 className="text-xl font-medium mb-4">Journaling Prompts</h3>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Gratitude Practice</h4>
                    <p className="text-sm text-muted-foreground mb-2">Write about three things you're grateful for today and why.</p>
                  </div>
                  <Badge>5 minutes</Badge>
                </div>
                <Button className="mt-2">Start Writing</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Stress Release</h4>
                    <p className="text-sm text-muted-foreground mb-2">What's one thing causing you stress right now? How can you address it?</p>
                  </div>
                  <Badge>10 minutes</Badge>
                </div>
                <Button className="mt-2">Start Writing</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Goal Setting</h4>
                    <p className="text-sm text-muted-foreground mb-2">What's one small goal you can accomplish today?</p>
                  </div>
                  <Badge>5 minutes</Badge>
                </div>
                <Button className="mt-2">Start Writing</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg mt-4">
          <h3 className="text-xl font-medium mb-4">Helpful Resources</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">Crisis Support</h4>
              <div className="flex flex-col space-y-3 mt-2">
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <div>
                    <p className="font-medium">Crisis Text Line</p>
                    <p className="text-sm text-muted-foreground">Text HOME to 741741</p>
                  </div>
                  <Button variant="outline" size="sm">Text Now</Button>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <div>
                    <p className="font-medium">School Counselor</p>
                    <p className="text-sm text-muted-foreground">Schedule an appointment</p>
                  </div>
                  <Button variant="outline" size="sm">Contact</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">Informational Resources</h4>
              <div className="flex flex-col space-y-3 mt-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">Understanding Anxiety</p>
                    <p className="text-sm text-muted-foreground">Learn about symptoms and management</p>
                  </div>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
                
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">Healthy Sleep Guide</p>
                    <p className="text-sm text-muted-foreground">Tips for better sleep habits</p>
                  </div>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentalHealthToolkit;
