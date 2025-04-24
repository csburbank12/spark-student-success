
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useMoodCheckIns } from "@/hooks/useMoodCheckIns";
import { useAuth } from "@/contexts/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export function MoodHistory() {
  const { user } = useAuth();
  const { data: moodData } = useMoodCheckIns(user?.id, 30);

  const chartData = moodData?.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    value: ["happy", "good", "okay", "sad", "stressed"].indexOf(entry.mood_type) + 1
  })) || [];

  const streakCount = chartData.filter((_, i) => i < 5).length;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Your Mood Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {streakCount > 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            🎯 You've checked in for {streakCount} days straight!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
