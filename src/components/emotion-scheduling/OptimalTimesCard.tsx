
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeSlot {
  day: string;
  timeRange: string;
  confidence: number;
  reason: string;
}

interface OptimalTimesCardProps {
  optimalTimes?: TimeSlot[];
  stressPeriods?: TimeSlot[];
  isLoading: boolean;
}

const OptimalTimesCard: React.FC<OptimalTimesCardProps> = ({
  optimalTimes = [],
  stressPeriods = [],
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
          <CardDescription><Skeleton className="h-4 w-60" /></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimal Engagement Times</CardTitle>
        <CardDescription>
          Based on mood analysis and emotional patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="flex items-center text-sm font-medium">
            <Clock className="mr-2 h-4 w-4 text-green-500" />
            Best Times for Check-ins
          </h3>
          <div className="mt-2 space-y-2">
            {optimalTimes && optimalTimes.length > 0 ? (
              optimalTimes.map((slot, index) => (
                <div key={index} className="p-3 border rounded bg-green-50/40 dark:bg-green-950/20">
                  <div className="flex justify-between">
                    <div className="font-medium">{slot.day}, {slot.timeRange}</div>
                    <div className="text-sm font-medium text-green-600">{slot.confidence}% confidence</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{slot.reason}</p>
                </div>
              ))
            ) : (
              <div className="p-3 border rounded">
                <p className="text-sm text-muted-foreground">
                  Not enough data to determine optimal times yet.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="flex items-center text-sm font-medium">
            <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
            Potential Stress Periods
          </h3>
          <div className="mt-2 space-y-2">
            {stressPeriods && stressPeriods.length > 0 ? (
              stressPeriods.map((slot, index) => (
                <div key={index} className="p-3 border rounded bg-amber-50/40 dark:bg-amber-950/20">
                  <div className="flex justify-between">
                    <div className="font-medium">{slot.day}, {slot.timeRange}</div>
                    <div className="text-sm font-medium text-amber-600">{slot.confidence}% confidence</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{slot.reason}</p>
                </div>
              ))
            ) : (
              <div className="p-3 border rounded">
                <p className="text-sm text-muted-foreground">
                  No significant stress periods detected.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimalTimesCard;
