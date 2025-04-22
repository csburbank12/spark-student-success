
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMoodCheckIns, useMoodTrends } from "@/hooks/useMoodCheckIns";
import { MoodTracker } from "@/components/student/MoodTracker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MoodTabsChart from "./check-in/MoodTabsChart";
import CheckInList from "./check-in/CheckInList";

const CheckIn = () => {
  const { user } = useAuth();
  const { data: checkIns = [], isLoading: isCheckInsLoading } = useMoodCheckIns(user?.id, 14);
  const { data: moodTrends = [], isLoading: isMoodLoading } = useMoodTrends(user?.id, 7);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Daily Check-In</h2>
        <Button variant="outline">Check-In History</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <MoodTracker />
        <MoodTabsChart moodTrends={moodTrends} />
      </div>
      <CheckInList checkIns={checkIns} isLoading={isCheckInsLoading} />
    </div>
  );
};

export default CheckIn;
