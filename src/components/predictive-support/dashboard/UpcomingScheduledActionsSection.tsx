
import React from "react";
import { Clock } from "lucide-react";

const UpcomingScheduledActionsSection: React.FC = () => (
  <div>
    <h3 className="font-medium mb-2">Upcoming Scheduled Actions</h3>
    <div className="space-y-2">
      <div className="flex items-center justify-between p-2 border rounded">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>Parent-Teacher Conference</span>
        </div>
        <span className="text-sm text-muted-foreground">Apr 28, 3:15PM</span>
      </div>
      <div className="flex items-center justify-between p-2 border rounded">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>Progress Assessment</span>
        </div>
        <span className="text-sm text-muted-foreground">May 5, 10:00AM</span>
      </div>
    </div>
  </div>
);

export default UpcomingScheduledActionsSection;
