
import React from "react";
import { Calendar, Clock, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ScheduledAction {
  id: string;
  title: string;
  datetime: string;
  type: "meeting" | "followup" | "assessment" | "checkin";
}

const UpcomingScheduledActionsSection: React.FC = () => {
  // Mock data for scheduled actions
  const scheduledActions: ScheduledAction[] = [
    {
      id: "sa1",
      title: "Parent-Teacher Conference",
      datetime: "Apr 28, 3:15PM",
      type: "meeting"
    },
    {
      id: "sa2",
      title: "Progress Assessment",
      datetime: "May 5, 10:00AM",
      type: "assessment"
    },
    {
      id: "sa3",
      title: "Student Check-in",
      datetime: "Apr 25, 9:30AM",
      type: "checkin"
    },
    {
      id: "sa4",
      title: "Intervention Follow-up",
      datetime: "Apr 30, 2:00PM",
      type: "followup"
    }
  ];

  const getIconForActionType = (type: string) => {
    switch (type) {
      case "meeting":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "assessment":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "followup":
        return <Calendar className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Scheduled Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scheduledActions.map((action) => (
            <div key={action.id} className="flex items-center justify-between p-2 border rounded hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2">
                {getIconForActionType(action.type)}
                <span>{action.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{action.datetime}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <Button variant="outline" size="sm">View Calendar</Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule Action
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingScheduledActionsSection;
