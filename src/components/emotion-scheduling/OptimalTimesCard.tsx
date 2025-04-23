
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OptimalTimeSlot {
  day: string;
  timeRange: string;
  confidence: number;
  reason: string;
}

interface OptimalTimesCardProps {
  optimalTimes?: OptimalTimeSlot[];
  stressPeriods?: OptimalTimeSlot[];
  isLoading?: boolean;
}

const OptimalTimesCard: React.FC<OptimalTimesCardProps> = ({
  optimalTimes = [],
  stressPeriods = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Optimal Check-in Times</CardTitle>
          <CardDescription>Loading mood analysis...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[200px]">
          <div className="animate-pulse flex space-y-4 flex-col">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!optimalTimes.length && !stressPeriods.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Optimal Check-in Times</CardTitle>
          <CardDescription>Not enough data to analyze mood patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            More mood check-ins are needed to generate personalized scheduling recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Emotion-Aware Scheduling</CardTitle>
        <CardDescription>AI-recommended timing based on mood patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {optimalTimes.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4 text-green-500" />
              <span>Recommended Check-in Times</span>
            </h3>
            {optimalTimes.map((time, idx) => (
              <div key={idx} className="p-3 border rounded-md bg-green-50/50 dark:bg-green-950/20">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{time.day}</span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {time.confidence}% confidence
                  </Badge>
                </div>
                <div className="mt-1 text-sm">{time.timeRange}</div>
                <p className="mt-2 text-xs text-muted-foreground">{time.reason}</p>
              </div>
            ))}
          </div>
        )}

        {stressPeriods.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Avoid These Stress Windows</span>
            </h3>
            {stressPeriods.map((time, idx) => (
              <div key={idx} className="p-3 border rounded-md bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{time.day}</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    {time.confidence}% confidence
                  </Badge>
                </div>
                <div className="mt-1 text-sm">{time.timeRange}</div>
                <p className="mt-2 text-xs text-muted-foreground">{time.reason}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OptimalTimesCard;
