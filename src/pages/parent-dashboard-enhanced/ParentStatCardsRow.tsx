
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Heart, CheckCircle, MessageSquare, Calendar } from "lucide-react";

interface ParentStatCardsRowProps {
  selectedChildData: any;
}

const ParentStatCardsRow: React.FC<ParentStatCardsRowProps> = ({ selectedChildData }) => (
  <div className="grid gap-4 md:grid-cols-4">
    <StatCard
      title="Mood & Wellness"
      value={selectedChildData.recentMood}
      description="Recent check-ins"
      icon={<Heart className="h-4 w-4" />}
    />
    <StatCard
      title="Attendance"
      value={`${selectedChildData.attendance}%`}
      description="Last 30 days"
      icon={<CheckCircle className="h-4 w-4" />}
      trend={selectedChildData.attendanceTrend === "up" ? "up" : undefined}
      trendValue={selectedChildData.attendanceTrend === "up" ? "Improving" : undefined}
    />
    <StatCard
      title="Messages"
      value="3"
      description="Unread from teachers"
      icon={<MessageSquare className="h-4 w-4" />}
    />
    <StatCard
      title="Upcoming Events"
      value="2"
      description="School events this week"
      icon={<Calendar className="h-4 w-4" />}
    />
  </div>
);

export default ParentStatCardsRow;
