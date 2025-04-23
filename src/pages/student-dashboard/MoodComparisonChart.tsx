
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMoodTrends } from "@/hooks/useMoodCheckIns";
import { useTeacherMoodTrends } from "@/hooks/useTeacherMoodCheckIns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Visualize student vs. teacher perception of mood for the last 7 days
const MoodComparisonChart = () => {
  const { user } = useAuth();
  const { data: studentMood = [] } = useMoodTrends(user?.id, 7);
  const { data: teacherMood = [] } = useTeacherMoodTrends(user?.id, 7);

  // Map for chart: [{name (date)}, studentValue, teacherValue]
  const allDates = Array.from(
    new Set([
      ...studentMood.map((d: any) => d.date),
      ...teacherMood.map((d: any) => d.date),
    ])
  ).sort();

  const moodIndex = (mood: string) =>
    ["happy", "good", "okay", "sad", "stressed"].indexOf(mood) + 1 || 3;

  const data = allDates.map((date) => ({
    name: date?.slice(5), // show MM-DD
    studentMood:
      studentMood.find((d: any) => d.date === date)?.mood_type ?? null,
    studentValue:
      moodIndex(studentMood.find((d: any) => d.date === date)?.mood_type),
    teacherMood:
      teacherMood.find((d: any) => d.date === date)?.mood_type ?? null,
    teacherValue:
      moodIndex(teacherMood.find((d: any) => d.date === date)?.mood_type),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Mood Disconnect Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => {
                  const moods = ["😣", "😔", "😐", "🙂", "😃"];
                  return moods[value - 1];
                }}
                width={30}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const moods = [
                    "Very Low",
                    "Low",
                    "Neutral",
                    "Good",
                    "Great",
                  ];
                  return [
                    moods[Number(value) - 1],
                    name === "studentValue"
                      ? "Student Mood"
                      : "Teacher Mood",
                  ];
                }}
              />
              <Line
                type="monotone"
                dataKey="studentValue"
                stroke="hsl(var(--primary))"
                name="Student"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="teacherValue"
                stroke="#f59e0b"
                name="Teacher"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          This chart shows your self-reported mood alongside your teacher's perception. Gaps may reveal disconnects, offering a chance for conversation.
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodComparisonChart;
