
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Activity, Shield } from "lucide-react";

interface MonitoringStatsCardsProps {
  healthCheckResult: any;
  monitoringStats: any;
  configValues: any;
}

export const MonitoringStatsCards = ({ 
  healthCheckResult, 
  monitoringStats, 
  configValues 
}: MonitoringStatsCardsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            {healthCheckResult?.success === false ? (
              <>
                <AlertCircle className="text-destructive mr-2 h-5 w-5" />
                Issues Detected
              </>
            ) : (
              <>
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                All Systems Operational
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Last checked: {healthCheckResult?.timestamp ? 
              new Date(healthCheckResult.timestamp).toLocaleString() : 
              'Never'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Error Count (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {monitoringStats?.totalErrors || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {monitoringStats?.resolvedErrors || 0} resolved
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Auto-repair Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            {configValues.autoRepairEnabled ? (
              <>
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                Enabled
              </>
            ) : (
              <>
                <AlertCircle className="text-amber-500 mr-2 h-5 w-5" />
                Disabled
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {configValues.autoRepairEnabled ? 'System will attempt to repair errors' : 'Manual repair only'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Heartbeat Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            {monitoringStats?.lastHeartbeatStatus === 'healthy' ? (
              <>
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                Healthy
              </>
            ) : (
              <>
                <AlertCircle className="text-amber-500 mr-2 h-5 w-5" />
                Issues Detected
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Last check: {monitoringStats?.lastHeartbeatTime ? 
              new Date(monitoringStats.lastHeartbeatTime).toLocaleString() : 
              'Never'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
