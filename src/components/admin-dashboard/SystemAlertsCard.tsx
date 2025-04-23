
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SystemAlertsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System-wide Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div>
              <p className="font-medium text-amber-800">Data Sync Required</p>
              <p className="text-sm text-amber-700">Roosevelt Elementary data needs synchronization</p>
            </div>
            <Button size="sm" variant="outline">Sync Now</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
            <div>
              <p className="font-medium text-red-800">User Access Issues</p>
              <p className="text-sm text-red-700">5 staff members at Lincoln Middle School reporting access problems</p>
            </div>
            <Button size="sm">Investigate</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemAlertsCard;
