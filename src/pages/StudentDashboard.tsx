
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/ui/stat-card";
import { AchievementCard } from "@/components/student/AchievementCard";
import { MoodTracker } from "@/components/student/MoodTracker";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ListChecks, Award, Users, Heart } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();
  
  // Mock data
  const moodData = [
    { name: "Mon", value: 3 },
    { name: "Tue", value: 4 },
    { name: "Wed", value: 2 },
    { name: "Thu", value: 5 },
    { name: "Fri", value: 4 },
    { name: "Sat", value: 3 },
    { name: "Sun", value: 4 },
  ];
  
  const achievements = [
    {
      id: "1",
      title: "Consistency Champion",
      description: "Complete 7 consecutive daily check-ins",
      progress: 100,
      icon: "check" as const,
      completed: true,
    },
    {
      id: "2",
      title: "Reflection Master",
      description: "Write journal entries for 5 days",
      progress: 80,
      icon: "star" as const,
      completed: false,
    },
    {
      id: "3",
      title: "Activity Explorer",
      description: "Try 3 different recommended activities",
      progress: 66,
      icon: "award" as const,
      completed: false,
    },
  ];

  const suggestions = [
    {
      title: "5-Minute Mindfulness",
      description: "Quick breathing exercise to center yourself",
      tags: ["Stress Relief", "Quick Activity"]
    },
    {
      title: "Gratitude Journal",
      description: "Write down three things you're grateful for today",
      tags: ["Positivity", "Reflection"]
    },
    {
      title: "Study Break Walk",
      description: "Take a 10-minute walk to refresh your mind",
      tags: ["Physical", "Energy Boost"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Check-in Streak"
          value="7 days"
          description="You're on a roll! Keep it up."
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
          trendValue="2 more than last week"
        />
        <StatCard
          title="Activities Completed"
          value="12"
          description="You've been busy this month!"
          icon={<ListChecks className="h-4 w-4" />}
          trend="up"
          trendValue="5 more than last month"
        />
        <StatCard
          title="Achievements"
          value="5"
          description="You've earned 5 badges so far"
          icon={<Award className="h-4 w-4" />}
          trend="neutral"
          trendValue="Same as last month"
        />
        <StatCard
          title="Support Check-ins"
          value="2"
          description="Upcoming teacher meetings"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

        <MoodTracker />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold">Your Achievements</h3>
          <Button variant="link">View All</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold">Suggested Activities</h3>
          <Button variant="link">View More</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((suggestion, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-md transition-all card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">{suggestion.title}</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                <div className="flex flex-wrap gap-1">
                  {suggestion.tags.map((tag) => (
                    <span key={tag} className="badge-primary text-xs">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
