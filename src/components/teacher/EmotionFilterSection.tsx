
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SliderProps } from "@/components/ui/slider";
import { Calendar, ChevronsUpDown, BatteryMedium } from "lucide-react";
import { format } from "date-fns";

interface MoodTrendData {
  mood_type: string;
  count: number;
  date: string;
}

export const EmotionFilterSection = () => {
  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);
  
  // Get aggregated mood data for the classroom
  const { data: moodTrends, isLoading } = useQuery({
    queryKey: ["classroom-mood-trends"],
    queryFn: async () => {
      // This would typically be a proper database query to get aggregated mood data
      // For demo, we'll use hardcoded data
      
      const mockMoodTrends: MoodTrendData[] = [
        { mood_type: "happy", count: 12, date: format(today, 'yyyy-MM-dd') },
        { mood_type: "sad", count: 4, date: format(today, 'yyyy-MM-dd') },
        { mood_type: "anxious", count: 6, date: format(today, 'yyyy-MM-dd') },
        { mood_type: "angry", count: 2, date: format(today, 'yyyy-MM-dd') },
        { mood_type: "tired", count: 8, date: format(today, 'yyyy-MM-dd') },
      ];
      
      return mockMoodTrends;
    },
  });
  
  const totalMoods = moodTrends?.reduce((sum, entry) => sum + entry.count, 0) || 0;
  
  const getMoodPercentage = (count: number): number => {
    return Math.round((count / totalMoods) * 100);
  };
  
  const getMoodColor = (moodType: string): string => {
    switch (moodType.toLowerCase()) {
      case 'happy':
        return 'bg-green-100 text-green-800';
      case 'sad':
        return 'bg-blue-100 text-blue-800';
      case 'anxious':
        return 'bg-yellow-100 text-yellow-800';
      case 'angry':
        return 'bg-red-100 text-red-800';
      case 'tired':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const Meter = ({ value, className }: { value: number; className?: string }) => (
    <div className={`h-2 rounded-full bg-gray-200 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-current" 
        style={{ width: `${Math.max(5, value)}%` }}
      />
    </div>
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Class Mood Overview</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Today, {format(new Date(), "MMMM d, yyyy")}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="energy">Energy Levels</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {moodTrends?.map(entry => (
                  <div key={entry.mood_type} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getMoodColor(entry.mood_type)}>
                          {entry.mood_type.charAt(0).toUpperCase() + entry.mood_type.slice(1)}
                        </Badge>
                        <span className="text-sm font-medium">{entry.count} students</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{getMoodPercentage(entry.count)}%</span>
                    </div>
                    <Meter 
                      value={getMoodPercentage(entry.count)} 
                      className={getMoodColor(entry.mood_type)} 
                    />
                  </div>
                ))}

                <div className="flex flex-col pt-2">
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Filter by Mood
                  </Button>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    View Mood Trends
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="energy">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Average Energy Level</h4>
                  <div className="flex items-center gap-2">
                    <BatteryMedium className="h-4 w-4 text-amber-500" />
                    <span className="font-medium text-lg">5.7/10</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">
                    <span className="text-amber-500 mr-1">⬆</span>
                    12% from yesterday
                  </Badge>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <h4 className="text-sm font-medium mb-2">Energy Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>High Energy (7-10)</span>
                    <span>38%</span>
                  </div>
                  <Meter value={38} className="text-green-600" />
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Medium Energy (4-6)</span>
                    <span>45%</span>
                  </div>
                  <Meter value={45} className="text-amber-500" />
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Low Energy (1-3)</span>
                    <span>17%</span>
                  </div>
                  <Meter value={17} className="text-red-500" />
                </div>
              </div>
              
              <div className="flex flex-col pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Filter by Energy Level
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
