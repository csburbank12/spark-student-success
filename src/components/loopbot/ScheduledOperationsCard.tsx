
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const ScheduledOperationsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Scheduled Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Next daily scan:</span>
            <span className="text-sm font-medium">Midnight (00:00)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Log retention:</span>
            <span className="text-sm font-medium">30 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Auto-repair:</span>
            <span className="text-sm font-medium text-green-600">Enabled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
