
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export const EmotionFilterSection: React.FC = () => {
  // Query to fetch emotion distribution data
  const { data: emotionData, isLoading } = useQuery({
    queryKey: ["class-emotion-distribution"],
    queryFn: async () => {
      // In a real app, this would fetch from Supabase
      // For demo purposes, returning mock data
      return [
        { emotion: "Happy", count: 12, color: "bg-green-500" },
        { emotion: "Good", count: 8, color: "bg-blue-500" },
        { emotion: "Okay", count: 5, color: "bg-yellow-500" },
        { emotion: "Tired", count: 3, color: "bg-purple-500" },
        { emotion: "Sad", count: 2, color: "bg-red-500" },
      ];
    },
    refetchOnWindowFocus: false,
  });

  // Calculate total for percentages
  const totalStudents = emotionData?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Class Mood Today</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {emotionData?.map((emotion) => (
              <div key={emotion.emotion} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <span className="mr-2">{emotion.emotion}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((emotion.count / totalStudents) * 100)}%
                    </span>
                  </div>
                  <span className="font-medium">{emotion.count}</span>
                </div>
                <Progress
                  value={(emotion.count / totalStudents) * 100}
                  className={emotion.color}
                />
              </div>
            ))}

            <div className="pt-2 text-xs text-muted-foreground">
              Based on {totalStudents} student check-ins today
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
