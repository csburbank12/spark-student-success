
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, Users, BrainCircuit } from "lucide-react";
import { useEmotionScheduler } from "@/hooks/useEmotionScheduler";
import OptimalTimesCard from "@/components/emotion-scheduling/OptimalTimesCard";
import MoodPatternsCard from "@/components/emotion-scheduling/MoodPatternsCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EmotionAwareScheduling: React.FC = () => {
  const { user } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(user?.id || '');
  const { emotionAnalysis, isLoading } = useEmotionScheduler(selectedStudentId);

  const handleScheduleEvent = () => {
    // In a real implementation, this would integrate with a calendar system
    toast.success("Event scheduled successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold">Emotion-Aware Scheduling</h2>
          <p className="text-muted-foreground">
            AI-powered timing recommendations based on mood patterns
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select defaultValue={selectedStudentId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={user?.id || ''}>Current User</SelectItem>
              {/* Additional students would be populated here */}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BrainCircuit className="h-4 w-4" />
            <span>AI Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Student Groups</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
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
              <CardTitle>Schedule Teacher Interventions</CardTitle>
              <CardDescription>
                Use AI recommendations to schedule check-ins or interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emotionAnalysis?.optimalCheckInTimes && emotionAnalysis.optimalCheckInTimes.length > 0 ? (
                  <div className="grid gap-4">
                    {emotionAnalysis.optimalCheckInTimes.map((time, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 border rounded">
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{time.day} • {time.timeRange}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{time.reason}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3 md:mt-0">
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Intervention Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="check-in">Mood Check-in</SelectItem>
                              <SelectItem value="meeting">One-on-One Meeting</SelectItem>
                              <SelectItem value="feedback">Feedback Session</SelectItem>
                              <SelectItem value="skills">Skill Practice</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" onClick={handleScheduleEvent}>Schedule</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      {isLoading ? "Loading recommendations..." : "Not enough data to make scheduling recommendations"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-6">
                <p>Calendar integration will be displayed here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Connect your calendar to view and schedule events based on emotional patterns
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Group Analysis</CardTitle>
              <CardDescription>View class-wide emotional patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-center text-muted-foreground py-6">
                  Select student groups or classes to view aggregated mood patterns and optimal times for class activities
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionAwareScheduling;
