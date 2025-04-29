
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEmotionScheduler } from '@/hooks/useEmotionScheduler';

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
          <p>This is where the emotion scheduling UI would go.</p>
          {/* Add additional UI components for emotion scheduling */}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionSchedulingUI;
