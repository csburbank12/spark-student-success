
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MoodTracker } from "@/components/student/MoodTracker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SuggestionList from "./student-dashboard/SuggestionList";
import AchievementGrid from "./student-dashboard/AchievementGrid";
import MoodChart from "./student-dashboard/MoodChart";
import StatCardsRow from "./student-dashboard/StatCardsRow";
import { Calendar, Users, Bell, Award } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-card/60 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
        <div>
          <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground mt-1">Track your progress and explore new activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hover:bg-primary-50">
            <Calendar className="mr-1 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-primary-600 hover:brightness-110 transition-all">
            <Bell className="mr-1 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>
      
      <StatCardsRow />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-t-4 border-t-primary transition-all hover:shadow-md">
          <CardHeader className="bg-card/50 backdrop-blur-sm">
            <CardTitle className="flex items-center text-xl">
              <span className="mr-2 p-1 rounded-full bg-primary-100 text-primary-800">
                <Users className="h-4 w-4" />
              </span>
              Your Mood Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MoodChart />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-t-4 border-t-amber-500 transition-all hover:shadow-md">
          <CardHeader className="bg-card/50 backdrop-blur-sm">
            <CardTitle className="flex items-center text-xl">
              <span className="mr-2 p-1 rounded-full bg-amber-100 text-amber-800">
                <Award className="h-4 w-4" />
              </span>
              Daily Check-In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MoodTracker />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold flex items-center">
            <span className="mr-2 p-1 rounded-full bg-teal-100 text-teal-800">
              <Award className="h-4 w-4" />
            </span>
            Your Achievements
          </h3>
          <Button variant="link" className="text-primary hover:text-primary-700 transition-colors">View All</Button>
        </div>
        <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-lg shadow-sm border p-4">
          <AchievementGrid />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold flex items-center">
            <span className="mr-2 p-1 rounded-full bg-blue-100 text-blue-800">
              <Users className="h-4 w-4" />
            </span>
            Suggested Activities
          </h3>
          <Button variant="link" className="text-primary hover:text-primary-700 transition-colors">View More</Button>
        </div>
        <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-lg shadow-sm border p-4">
          <SuggestionList />
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
