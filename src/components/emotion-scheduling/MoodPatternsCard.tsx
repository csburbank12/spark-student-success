
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SunMoon, Sun, Moon, Calendar, Clock } from "lucide-react";

interface MoodPatterns {
  morningTrend: string;
  afternoonTrend: string;
  eveningTrend: string;
  weekdayTrend: string;
  weekendTrend: string;
}

interface MoodPatternsCardProps {
  moodPatterns?: MoodPatterns;
  isLoading?: boolean;
}

const MoodPatternsCard: React.FC<MoodPatternsCardProps> = ({
  moodPatterns,
  isLoading = false,
}) => {
  const getTrendColor = (trend: string) => {
    switch(trend) {
      case "Very positive": return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "Positive": return "text-green-500 bg-green-50 dark:bg-green-900/20 dark:text-green-300";
      case "Neutral": return "text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300";
      case "Negative": return "text-orange-500 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-300";
      case "Very negative": return "text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-300";
      default: return "text-gray-500 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mood Pattern Analysis</CardTitle>
          <CardDescription>Loading mood patterns...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[200px]">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!moodPatterns) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mood Pattern Analysis</CardTitle>
          <CardDescription>Not enough data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            More mood check-ins are needed to analyze mood patterns.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mood Pattern Analysis</CardTitle>
        <CardDescription>Emotional trends by time of day and week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-1 mb-3">
            <Clock className="h-4 w-4" />
            <span>Time of Day Patterns</span>
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md p-3 border">
              <div className="flex items-center gap-1 mb-2">
                <Sun className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium">Morning</span>
              </div>
              <div className={`text-sm font-medium rounded-full px-2 py-1 text-center ${getTrendColor(moodPatterns.morningTrend)}`}>
                {moodPatterns.morningTrend}
              </div>
            </div>
            
            <div className="rounded-md p-3 border">
              <div className="flex items-center gap-1 mb-2">
                <SunMoon className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium">Afternoon</span>
              </div>
              <div className={`text-sm font-medium rounded-full px-2 py-1 text-center ${getTrendColor(moodPatterns.afternoonTrend)}`}>
                {moodPatterns.afternoonTrend}
              </div>
            </div>
            
            <div className="rounded-md p-3 border">
              <div className="flex items-center gap-1 mb-2">
                <Moon className="h-4 w-4 text-purple-500" />
                <span className="text-xs font-medium">Evening</span>
              </div>
              <div className={`text-sm font-medium rounded-full px-2 py-1 text-center ${getTrendColor(moodPatterns.eveningTrend)}`}>
                {moodPatterns.eveningTrend}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-1 mb-3">
            <Calendar className="h-4 w-4" />
            <span>Weekly Patterns</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md p-3 border">
              <div className="flex items-center gap-1 mb-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium">Weekdays</span>
              </div>
              <div className={`text-sm font-medium rounded-full px-2 py-1 text-center ${getTrendColor(moodPatterns.weekdayTrend)}`}>
                {moodPatterns.weekdayTrend}
              </div>
            </div>
            
            <div className="rounded-md p-3 border">
              <div className="flex items-center gap-1 mb-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium">Weekends</span>
              </div>
              <div className={`text-sm font-medium rounded-full px-2 py-1 text-center ${getTrendColor(moodPatterns.weekendTrend)}`}>
                {moodPatterns.weekendTrend}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodPatternsCard;
