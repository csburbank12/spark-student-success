
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MoodTracker } from "@/components/student/MoodTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CheckIn = () => {
  const { user } = useAuth();
  
  // Mock data for previous check-ins
  const previousCheckIns = [
    {
      date: "May 22",
      mood: "happy",
      energyLevel: 8,
      notes: "Had a great day today! Aced my math test.",
    },
    {
      date: "May 21",
      mood: "good",
      energyLevel: 7,
      notes: "Normal day. Study group was helpful.",
    },
    {
      date: "May 20",
      mood: "okay",
      energyLevel: 5,
      notes: "Felt a bit tired in the morning, but got better.",
    },
    {
      date: "May 19",
      mood: "stressed",
      energyLevel: 3,
      notes: "Worried about upcoming exams. Having trouble sleeping.",
    },
    {
      date: "May 18",
      mood: "sad",
      energyLevel: 4,
      notes: "Had an argument with a friend. Feeling down.",
    },
  ];
  
  const weeklyMood = [
    { name: "Mon", value: 2 },
    { name: "Tue", value: 3 },
    { name: "Wed", value: 2 },
    { name: "Thu", value: 4 },
    { name: "Fri", value: 5 },
    { name: "Sat", value: 4 },
    { name: "Sun", value: 3 },
  ];
  
  const weeklyEnergy = [
    { name: "Mon", value: 4 },
    { name: "Tue", value: 5 },
    { name: "Wed", value: 3 },
    { name: "Thu", value: 7 },
    { name: "Fri", value: 8 },
    { name: "Sat", value: 6 },
    { name: "Sun", value: 5 },
  ];

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
          <div className="space-y-4">
            {previousCheckIns.map((checkIn, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="md:w-24">
                  <div className="text-sm font-medium">{checkIn.date}</div>
                </div>
                <div className="flex items-center gap-2 md:w-32">
                  <span className="text-2xl">{getMoodEmoji(checkIn.mood)}</span>
                  <span className="capitalize text-sm">{checkIn.mood}</span>
                </div>
                <div className="md:w-32">
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-primary/20 rounded-full w-24">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${checkIn.energyLevel * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{checkIn.energyLevel}/10</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{checkIn.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckIn;
