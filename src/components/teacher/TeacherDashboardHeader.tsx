
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BellRing, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { useNavigate } from "react-router-dom";
import SystemStatusIndicator from "@/components/error-handling/SystemStatusIndicator";

interface TeacherDashboardHeaderProps {
  onScheduleCheckIn?: () => void;
}

export const TeacherDashboardHeader: React.FC<TeacherDashboardHeaderProps> = ({
  onScheduleCheckIn
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-heading font-bold">
            Welcome, {user?.name?.split(" ")[0] || "Teacher"}!
          </h2>
          <SystemStatusIndicator />
        </div>
        <p className="text-muted-foreground">
          Your dashboard shows classroom insights and student wellbeing data
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/students")}>
          <Users className="mr-2 h-4 w-4" />
          View Students
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate("/sel-pathway-management")}>
          <BookOpen className="mr-2 h-4 w-4" />
          SEL Activities
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate("/notifications")}>
          <BellRing className="mr-2 h-4 w-4" />
          Alerts
        </Button>
        <Button size="sm" onClick={onScheduleCheckIn}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Check-in
        </Button>
      </div>
    </div>
  );
};
