
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Server, 
  ShieldAlert, 
  User, 
  Users 
} from "lucide-react";

interface MonitoringStatsCardsProps {
  healthCheckResult: any;
  monitoringStats: any;
  configValues: {
    autoRepairEnabled: boolean;
    notificationMethod: 'popup' | 'email' | 'both';
    minSeverityToNotify: 'warning' | 'error' | 'critical';
    heartbeatIntervalMinutes: number;
  };
}

export const MonitoringStatsCards: React.FC<MonitoringStatsCardsProps> = ({ 
  healthCheckResult, 
  monitoringStats,
  configValues
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            {healthCheckResult?.success ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : healthCheckResult?.errorCount > 0 ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <Clock className="h-5 w-5 text-muted-foreground" />
            )}
            <div className="text-2xl font-bold">
              {healthCheckResult?.success ? 'Healthy' : 
               healthCheckResult?.errorCount > 0 ? `${healthCheckResult.errorCount} Issues` : 
               'Pending'}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {healthCheckResult ? 
              `Last checked: ${new Date(healthCheckResult.timestamp).toLocaleString()}` : 
              'System health status pending verification'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {monitoringStats?.activeUsers || '0'}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {monitoringStats?.userChange ? 
              `${monitoringStats.userChange > 0 ? '+' : ''}${monitoringStats.userChange}% from last week` : 
              'User activity monitoring enabled'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          <ShieldAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {monitoringStats?.errorRate !== undefined ? `${monitoringStats.errorRate}%` : '0.00%'}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {monitoringStats?.totalRequests ? 
              `${monitoringStats.totalErrors || 0} errors / ${monitoringStats.totalRequests} requests` : 
              'Error monitoring active'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Auto-Repair</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            {configValues.autoRepairEnabled ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-amber-500" />
            )}
            <div className="text-2xl font-bold">
              {configValues.autoRepairEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {`Heartbeat every ${configValues.heartbeatIntervalMinutes} minutes`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
