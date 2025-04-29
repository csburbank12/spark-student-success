
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEmotionScheduler } from '@/hooks/useEmotionScheduler';
import OptimalTimesCard from './OptimalTimesCard';
import MoodPatternsCard from './MoodPatternsCard';

export interface EmotionSchedulingUIProps {
  studentId: string;
}

const EmotionSchedulingUI: React.FC<EmotionSchedulingUIProps> = ({ studentId }) => {
  const { emotionAnalysis, isLoading, error } = useEmotionScheduler(studentId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load emotion scheduling data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emotion-Aware Scheduling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <OptimalTimesCard optimalTimes={emotionAnalysis?.optimalTimes} isLoading={isLoading} />
            <MoodPatternsCard moodPatterns={emotionAnalysis?.patterns} isLoading={isLoading} />
          </div>
          {emotionAnalysis?.recommendations && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Recommendations</h3>
              <ul className="list-disc pl-5 space-y-1">
                {emotionAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionSchedulingUI;
