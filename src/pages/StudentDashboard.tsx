
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MoodTracker } from "@/components/student/MoodTracker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SuggestionList from "./student-dashboard/SuggestionList";
import AchievementGrid from "./student-dashboard/AchievementGrid";
import MoodChart from "./student-dashboard/MoodChart";
import StatCardsRow from "./student-dashboard/StatCardsRow";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h2>
      </div>
      <StatCardsRow />

      <div className="grid gap-6 md:grid-cols-2">
        <MoodChart />
        <MoodTracker />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold">Your Achievements</h3>
          <Button variant="link">View All</Button>
        </div>
        <AchievementGrid />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold">Suggested Activities</h3>
          <Button variant="link">View More</Button>
        </div>
        <SuggestionList />
      </div>
    </div>
  );
};
export default StudentDashboard;
