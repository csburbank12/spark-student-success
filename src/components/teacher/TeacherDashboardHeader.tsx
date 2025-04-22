
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface TeacherDashboardHeaderProps {
  onScheduleCheckIn: () => void;
}

export const TeacherDashboardHeader: React.FC<TeacherDashboardHeaderProps> = ({ onScheduleCheckIn }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-3xl font-heading font-bold">Teacher Dashboard</h2>
    <Button onClick={onScheduleCheckIn}>
      <Calendar className="h-4 w-4 mr-2" />
      Schedule Check-in
    </Button>
  </div>
);
