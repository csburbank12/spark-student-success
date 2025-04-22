
import { StatCard } from "@/components/ui/stat-card";
import { CheckCircle, ListChecks, Award, Users } from "lucide-react";
import React from "react";

const StatCardsRow = () => (
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
);

export default StatCardsRow;
