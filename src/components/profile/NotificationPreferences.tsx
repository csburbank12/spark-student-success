
import React from "react";
import { Switch } from "@/components/ui/switch";

const NotificationPreferences: React.FC = () => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-medium">Email Notifications</h4>
          <p className="text-sm text-muted-foreground">
            Receive email notifications for important updates
          </p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-medium">App Notifications</h4>
          <p className="text-sm text-muted-foreground">
            Receive in-app notifications and alerts
          </p>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  );
};

export default NotificationPreferences;
