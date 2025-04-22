
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMoodTrends } from "@/hooks/useMoodCheckIns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MoodChart = () => {
  const { user } = useAuth();
  const { data: moodTrends = [] } = useMoodTrends(user?.id, 7);

  const moodData = moodTrends.length
    ? moodTrends.map((d: any) => ({
        name: d.date?.slice(5),
        value: ["happy", "good", "okay", "sad", "stressed"].indexOf(d.mood_type) + 1 || 3,
      }))
    : [
        { name: "Mon", value: 3 },
        { name: "Tue", value: 4 },
        { name: "Wed", value: 2 },
        { name: "Thu", value: 5 },
        { name: "Fri", value: 4 },
        { name: "Sat", value: 3 },
        { name: "Sun", value: 4 },
      ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: "12px"
                }}
                formatter={(value) => {
                  const moods = ["Very Low", "Low", "Neutral", "Good", "Great"];
                  return [moods[Number(value) - 1]];
                }}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart;
