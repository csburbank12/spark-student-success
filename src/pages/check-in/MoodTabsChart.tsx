
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface MoodTabsChartProps {
  moodTrends: any[];
}

const MoodTabsChart: React.FC<MoodTabsChartProps> = ({ moodTrends }) => {
  const weeklyMood = moodTrends.map((d: any) => ({
    name: d.date?.slice(5),
    value: ["happy", "good", "okay", "sad", "stressed"].indexOf(d.mood_type) + 1 || 3,
  }));

  const weeklyEnergy = moodTrends.map((d: any) => ({
    name: d.date?.slice(5),
    value: d.energy_level,
  }));
  
  // Check if data is empty
  const hasData = moodTrends && moodTrends.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Weekly Patterns</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mood">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="mood" className="flex-1">Mood</TabsTrigger>
            <TabsTrigger value="energy" className="flex-1">Energy</TabsTrigger>
          </TabsList>
          <TabsContent value="mood">
            <div className="h-64">
              {!hasData ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No mood data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyMood}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} width={30}
                      tickFormatter={(value) => {
                        const moods = ["😣", "😔", "😐", "🙂", "😃"];
                        return moods[value - 1];
                      }} />
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
              )}
            </div>
          </TabsContent>
          <TabsContent value="energy">
            <div className="h-64">
              {!hasData ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No energy data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyEnergy}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis domain={[1, 10]} ticks={[2, 4, 6, 8, 10]} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                        fontSize: "12px"
                      }}
                      formatter={(value) => [`Energy: ${value}/10`]}
                      labelFormatter={(label) => `Day: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MoodTabsChart;
