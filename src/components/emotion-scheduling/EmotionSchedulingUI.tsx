
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmotionScheduler } from "@/hooks/useEmotionScheduler";
import OptimalTimesCard from "./OptimalTimesCard";
import MoodPatternsCard from "./MoodPatternsCard";
import { Loader } from "@/components/ui/loader";
import { useStudentMoodData } from "@/hooks/useStudentMoodData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { UserCircle } from "lucide-react";

const EmotionSchedulingUI: React.FC = () => {
  const { user } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState<string | undefined>(undefined);
  const { emotionAnalysis, isLoading, error } = useEmotionScheduler(selectedStudentId);
  const { data: moodData, isLoading: isMoodLoading } = useStudentMoodData(selectedStudentId);

  // Mock student list for demonstration
  const studentList = [
    { id: "s1", name: "Alex Johnson" },
    { id: "s2", name: "Jamie Smith" },
    { id: "s3", name: "Taylor Williams" }
  ];
  
  // Only show student selector for teacher/admin roles
  const showStudentSelector = user?.role === UserRole.teacher || 
                             user?.role === UserRole.admin || 
                             user?.role === UserRole.staff;

  if (isLoading || isMoodLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error loading emotion scheduling data</AlertTitle>
        <AlertDescription>
          {error.message || "There was an error loading the emotion scheduling data. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Emotion-Aware Scheduling</h2>
        {showStudentSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Select Student:</span>
            <Select
              value={selectedStudentId}
              onValueChange={setSelectedStudentId}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {studentList.map(student => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Profile integration banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <UserCircle className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm">
                <span className="font-medium">WellLens Profile:</span> Emotion scheduling utilizes your universal profile data to provide personalized insights
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="optimal-times">
        <TabsList>
          <TabsTrigger value="optimal-times">Optimal Check-in Times</TabsTrigger>
          <TabsTrigger value="mood-patterns">Mood Patterns</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="optimal-times" className="space-y-4">
          <OptimalTimesCard
            optimalTimes={emotionAnalysis?.optimalTimes}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="mood-patterns" className="space-y-4">
          <MoodPatternsCard
            moodPatterns={emotionAnalysis?.patterns}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emotionAnalysis?.recommendations?.map((recommendation, index) => (
                <div key={index} className="p-3 border rounded bg-background">
                  <p className="font-medium">{recommendation}</p>
                </div>
              ))}
              
              {emotionAnalysis?.optimalTimes && emotionAnalysis.optimalTimes.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-md">
                  <p className="font-medium text-green-800 dark:text-green-300">Pro Tip</p>
                  <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                    Consider scheduling important tasks during {emotionAnalysis.optimalTimes[0].day} at {emotionAnalysis.optimalTimes[0].timeRange} when 
                    emotional engagement is highest.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionSchedulingUI;
