
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Users, School, Activity, Bell } from "lucide-react";

const DashboardStatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value="2,590"
        description="Across all schools"
        icon={<Users className="h-5 w-5" />}
        trend="up"
        trendValue="43 new this month"
        className="animate-fade-in"
      />
      <StatCard
        title="Schools"
        value="3"
        description="Connected to platform"
        icon={<School className="h-5 w-5" />}
        className="animate-fade-in delay-100"
      />
      <StatCard
        title="Active Interventions"
        value="127"
        description="Across all schools"
        icon={<Activity className="h-5 w-5" />}
        trend="up"
        trendValue="12 new this week"
        className="animate-fade-in delay-200"
      />
      <StatCard
        title="System Alerts"
        value="24"
        description="Requiring attention"
        icon={<Bell className="h-5 w-5" />}
        trend="up"
        trendValue="8 new today"
        className="animate-fade-in delay-300"
      />
    </div>
  );
};

export default DashboardStatsGrid;
