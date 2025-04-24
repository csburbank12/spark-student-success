
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowUp } from "lucide-react";

const AlertsRiskWidget: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Alerts</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <ArrowUp className="mr-1 h-4 w-4 text-red-500" />
          <span>4 new alerts today</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsRiskWidget;
