
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle, Users } from "lucide-react";
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
  const { emotionAnalysis, isLoading, error } = useEmotionScheduler(studentId);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <OptimalTimesCard
          optimalTimes={emotionAnalysis?.optimalTimes}
          isLoading={isLoading}
        />
        <MoodPatternsCard
          moodPatterns={emotionAnalysis?.patterns}
          isLoading={isLoading}
        />
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Based on student's emotional patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {emotionAnalysis?.recommendations?.map((recommendation, index) => (
            <div key={index} className="p-3 border rounded bg-green-50/40 dark:bg-green-950/20">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{recommendation}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">Apply</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionAwareTeacherDashboard;
