
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, AlertTriangle, Users } from "lucide-react";
import OptimalTimesCard from "@/components/emotion-scheduling/OptimalTimesCard";
import MoodPatternsCard from "@/components/emotion-scheduling/MoodPatternsCard";
import { Button } from "@/components/ui/button";
import { useEmotionScheduler } from "@/hooks/useEmotionScheduler";

interface EmotionAwareTeacherDashboardProps {
  studentId: string;
}

const EmotionAwareTeacherDashboard: React.FC<EmotionAwareTeacherDashboardProps> = ({
  studentId,
}) => {
  const { emotionAnalysis, isLoading } = useEmotionScheduler(studentId);

  // Mock data for class-wide patterns
  const classTimeSlots = [
    {
      day: "Tuesday",
      timeRange: "9:00 AM - 10:30 AM",
      confidence: 83,
      reason: "Majority of students show higher energy levels and better mood",
    },
    {
      day: "Thursday",
      timeRange: "1:00 PM - 2:30 PM",
      confidence: 75,
      reason: "Good time slot for most students across mood metrics",
    }
  ];
  
  const classStressPeriods = [
    {
      day: "Monday",
      timeRange: "8:00 AM - 10:00 AM",
      confidence: 78,
      reason: "Many students show lower energy and negative mood indicators",
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="student">
        <TabsList>
          <TabsTrigger value="student">Individual Student</TabsTrigger>
          <TabsTrigger value="class">Class-Wide Patterns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student" className="space-y-6 pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <OptimalTimesCard
              optimalTimes={emotionAnalysis?.optimalCheckInTimes}
              stressPeriods={emotionAnalysis?.stressPeriods}
              isLoading={isLoading}
            />
            <MoodPatternsCard
              moodPatterns={emotionAnalysis?.moodPatterns}
              isLoading={isLoading}
            />
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>Based on student's emotional patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded bg-green-50/40 dark:bg-green-950/20">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Schedule Check-in</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Plan a one-on-one session during student's optimal time
                    </p>
                  </div>
                  <Button size="sm">Schedule</Button>
                </div>
              </div>
              
              <div className="p-3 border rounded bg-amber-50/40 dark:bg-amber-950/20">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Avoid Stress Window</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reschedule challenging discussions away from known stress periods
                    </p>
                  </div>
                  <Button size="sm" variant="outline">View Calendar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="class" className="space-y-6 pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <OptimalTimesCard
              optimalTimes={classTimeSlots}
              stressPeriods={classStressPeriods}
              isLoading={false}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Class Activity Recommendations</CardTitle>
                <CardDescription>Based on class-wide emotional patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Group Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Best scheduled on Thursdays afternoons when collaborative energy is highest
                  </p>
                </div>
                
                <div className="p-3 border rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Tests & Assessments</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optimal on Tuesday mornings when focus and energy levels are highest
                  </p>
                </div>
                
                <div className="p-3 border rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">High-Stress Activities</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Avoid scheduling on Monday mornings when mood metrics are lowest
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button className="w-full">
            Schedule Class Activities Based on Mood Patterns
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionAwareTeacherDashboard;
