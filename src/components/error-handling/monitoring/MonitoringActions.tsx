
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface MonitoringActionsProps {
  handleRestartSystem: () => void;
}

export const MonitoringActions = ({ handleRestartSystem }: MonitoringActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual System Actions</CardTitle>
        <CardDescription>
          Perform manual maintenance and repair actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">System Restart</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Completely restart the system. This will reload the application, clear caches,
              and reestablish all connections.
            </p>
            <Button 
              variant="destructive" 
              onClick={handleRestartSystem}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Restart System
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
