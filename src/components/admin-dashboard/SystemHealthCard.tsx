
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SystemHealthCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">API Status</p>
              <p className="text-sm text-muted-foreground">All systems operational</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600">✓</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Database Performance</p>
              <p className="text-sm text-muted-foreground">94% efficiency</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600">✓</span>
            </div>
          </div>
        </div>
        <Button variant="link" className="mt-4 px-0">View system logs</Button>
      </CardContent>
    </Card>
  );
};

export default SystemHealthCard;
