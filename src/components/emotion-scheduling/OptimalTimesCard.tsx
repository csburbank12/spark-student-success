
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimeSlot } from "@/hooks/useEmotionScheduler";

interface OptimalTimesCardProps {
  optimalTimes: TimeSlot[] | undefined;
  isLoading: boolean;
}

const OptimalTimesCard: React.FC<OptimalTimesCardProps> = ({ optimalTimes, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Optimal Learning Times</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!optimalTimes || optimalTimes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Optimal Learning Times</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No optimal times have been identified yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
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
          {optimalTimes.map((slot, index) => (
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
  );
};

export default OptimalTimesCard;
