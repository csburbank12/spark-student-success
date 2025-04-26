
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaffDashboardTabs } from "@/components/staff-dashboard/StaffDashboardTabs";

const StaffDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Staff Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            My Schedule
          </Button>
        </div>
      </div>

      <StaffDashboardTabs />
    </div>
  );
};

export default StaffDashboard;
