
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { MoodPattern } from "@/hooks/useEmotionScheduler";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodPatternsCardProps {
  moodPatterns: MoodPattern[] | undefined;
  isLoading: boolean;
}

const MoodPatternsCard: React.FC<MoodPatternsCardProps> = ({ moodPatterns, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood Patterns</CardTitle>
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

  if (!moodPatterns || moodPatterns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood Patterns</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No mood patterns have been identified yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
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
          {moodPatterns.map((pattern, index) => (
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
  );
};

export default MoodPatternsCard;
