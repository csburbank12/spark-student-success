
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Users, AlertCircle, BarChart, Calendar } from "lucide-react";

const stats = [
  {
    title: "Students Being Monitored",
    value: "24",
    description: "Your assigned student count",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Students At Risk",
    value: "4",
    description: "Require your attention",
    icon: <AlertCircle className="h-4 w-4" />,
    trend: "up",
    trendValue: "2 more than yesterday",
  },
  {
    title: "Active Interventions",
    value: "7",
    description: "Currently being applied",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Today's Check-ins",
    value: "18",
    description: "75% completion rate",
    icon: <Calendar className="h-4 w-4" />,
    trend: "up",
    trendValue: "5% higher than average",
  },
];

export const TeacherStatCardsRow = () => (
  <div className="grid gap-4 md:grid-cols-4">
    {stats.map((stat, idx) => (
      <StatCard
        key={idx}
        title={stat.title}
        value={stat.value}
        description={stat.description}
        icon={stat.icon}
        trend={stat.trend as any}
        trendValue={stat.trendValue}
      />
    ))}
  </div>
);

