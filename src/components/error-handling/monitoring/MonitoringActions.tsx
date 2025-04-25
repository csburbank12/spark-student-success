
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  RefreshCcw, 
  AlertTriangle, 
  Database, 
  RotateCcw,
  DownloadCloud
} from "lucide-react";

interface MonitoringActionsProps {
  handleRestartSystem: () => Promise<void>;
}

export const MonitoringActions: React.FC<MonitoringActionsProps> = ({
  handleRestartSystem
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            These actions can affect system performance and availability. 
            Use with caution and only when necessary.
          </AlertDescription>
        </Alert>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Button variant="outline" onClick={handleRestartSystem} className="flex items-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Restart System
          </Button>
          
          <Button variant="outline" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            Clear Cache
          </Button>
          
          <Button variant="outline" className="flex items-center">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore Defaults
          </Button>
          
          <Button variant="outline" className="flex items-center">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export System Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
