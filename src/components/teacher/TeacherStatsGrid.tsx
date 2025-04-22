
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Users, AlertCircle } from "lucide-react";

interface TeacherStatsGridProps {}

export const TeacherStatsGrid: React.FC<TeacherStatsGridProps> = () => (
  <div className="grid gap-4 md:grid-cols-3">
    <StatCard
      title="Students Being Monitored"
      value="24"
      description="Your assigned student count"
      icon={<Users className="h-4 w-4" />}
    />
    <StatCard
      title="Outstanding Alerts"
      value="4"
      description="Require your attention"
      icon={<AlertCircle className="h-4 w-4" />}
      trend="up"
      trendValue="2 more than yesterday"
    />
    <StatCard
      title="Today's Check-ins"
      value="18"
      description="75% of your students"
      trend="up"
      trendValue="5% higher than average"
    />
  </div>
);
