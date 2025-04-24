
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface MoodPattern {
  pattern: string;
  description: string;
  confidence: number;
  trend: 'improving' | 'declining' | 'stable';
}

interface MoodPatternsCardProps {
  moodPatterns?: MoodPattern[];
  isLoading: boolean;
}

const MoodPatternsCard: React.FC<MoodPatternsCardProps> = ({
  moodPatterns = [],
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
          <CardDescription><Skeleton className="h-4 w-56" /></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend === 'declining') {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Patterns & Triggers</CardTitle>
        <CardDescription>
          Detected emotional patterns and potential triggers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {moodPatterns && moodPatterns.length > 0 ? (
          moodPatterns.map((pattern, index) => (
            <div key={index} className="p-3 border rounded">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{pattern.pattern}</h4>
                <div className="flex items-center text-sm">
                  {getTrendIcon(pattern.trend)}
                  <span className="ml-1">
                    {pattern.trend.charAt(0).toUpperCase() + pattern.trend.slice(1)}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{pattern.description}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Pattern confidence</span>
                  <span>{pattern.confidence}%</span>
                </div>
                <Progress value={pattern.confidence} className="h-1" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">
              Not enough data to identify significant mood patterns yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Continue collecting mood check-ins to improve pattern detection.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodPatternsCard;
