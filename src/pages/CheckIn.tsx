import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMoodCheckIns, useMoodTrends } from "@/hooks/useMoodCheckIns";
import { MoodTracker } from "@/components/student/MoodTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CheckIn = () => {
  const { user } = useAuth();

  const { data: checkIns = [], isLoading: isCheckInsLoading } = useMoodCheckIns(user?.id, 14);
  const { data: moodTrends = [], isLoading: isMoodLoading } = useMoodTrends(user?.id, 7);

  const weeklyMood = moodTrends.map((d: any) => ({
    name: d.date?.slice(5),
    value: ["happy", "good", "okay", "sad", "stressed"].indexOf(d.mood_type) + 1 || 3,
  }));

  const weeklyEnergy = moodTrends.map((d: any) => ({
    name: d.date?.slice(5),
    value: d.energy_level,
  }));

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy": return "😃";
      case "good": return "🙂";
      case "okay": return "😐";
      case "sad": return "😔";
      case "stressed": return "😣";
      default: return "😐";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Daily Check-In</h2>
        <Button variant="outline">Check-In History</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MoodTracker />

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
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyMood}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[1, 5]} 
                        ticks={[1, 2, 3, 4, 5]} 
                        axisLine={false}
                        tickLine={false}
                        width={30}
                        tickFormatter={(value) => {
                          const moods = ["😣", "😔", "😐", "🙂", "😃"];
                          return moods[value - 1];
                        }}
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
              </TabsContent>
              
              <TabsContent value="energy">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyEnergy}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[1, 10]} 
                        ticks={[2, 4, 6, 8, 10]} 
                        axisLine={false}
                        tickLine={false}
                      />
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
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Previous Check-Ins</CardTitle>
        </CardHeader>
        <CardContent>
          {isCheckInsLoading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : (
            <div className="space-y-4">
              {checkIns.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center">
                  No check-ins yet. Complete your first mood check-in above!
                </div>
              ) : (
                checkIns.map((checkIn: any, index: number) => (
                  <div 
                    key={checkIn.id || index}
                    className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="md:w-24">
                      <div className="text-sm font-medium">
                        {new Date(checkIn.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:w-32">
                      <span className="text-2xl">{getMoodEmoji(checkIn.mood_type)}</span>
                      <span className="capitalize text-sm">{checkIn.mood_type}</span>
                    </div>
                    <div className="md:w-32">
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-primary/20 rounded-full w-24">
                          <div 
                            className="h-2 bg-primary rounded-full" 
                            style={{ width: `${checkIn.energy_level * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{checkIn.energy_level}/10</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{checkIn.notes}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckIn;
