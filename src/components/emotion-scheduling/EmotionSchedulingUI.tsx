
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { 
  useEmotionScheduler, 
  TimeSlot, 
  MoodPattern 
} from '@/hooks/useEmotionScheduler';
import { Clock, Brain, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmotionSchedulingUIProps {
  studentId: string;
}

export const EmotionSchedulingUI: React.FC<EmotionSchedulingUIProps> = ({ studentId }) => {
  const { emotionAnalysis, isLoading, error } = useEmotionScheduler(studentId);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading emotion analysis...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">Error loading emotion analysis: {error.message}</div>;
  }

  if (!emotionAnalysis) {
    return <div className="text-muted-foreground p-8">No emotion analysis data available</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Emotion-Aware Scheduling</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Optimal Learning Times
            </CardTitle>
            <CardDescription>
              Recommended times for instruction based on emotional patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emotionAnalysis.optimalTimes.map((slot, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "p-3 border rounded",
                    "bg-blue-50/40 dark:bg-blue-950/20"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{slot.day}</p>
                      <p className="text-sm text-muted-foreground">{slot.timeRange}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600 font-medium">
                        {Math.round(slot.confidence * 100)}% confident
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {slot.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Mood Patterns
            </CardTitle>
            <CardDescription>
              Recurring emotional states throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emotionAnalysis.patterns.map((pattern, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "p-3 border rounded",
                    "bg-purple-50/40 dark:bg-purple-950/20"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{pattern.day} - {pattern.mood}</p>
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        <span className={cn(
                          "inline-flex items-center",
                          pattern.trend === "increasing" && "text-green-600",
                          pattern.trend === "decreasing" && "text-red-600",
                          pattern.trend === "stable" && "text-amber-600"
                        )}>
                          {pattern.trend.charAt(0).toUpperCase() + pattern.trend.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Recommendations
          </CardTitle>
          <CardDescription>
            Suggested actions based on emotional intelligence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            {emotionAnalysis.recommendations.map((recommendation, index) => (
              <li key={index} className="text-muted-foreground">
                {recommendation}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionSchedulingUI;
