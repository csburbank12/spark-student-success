
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, Shield, RefreshCw } from "lucide-react";
import { useErrorLogs } from "@/hooks/useErrorLogs";
import { ErrorMonitoringService } from "@/services/ErrorMonitoringService";
import { SystemHealthCheckService } from "@/services/SystemHealthCheckService";
import { toast } from "sonner";
import GlobalErrorBoundary from '@/components/error-handling/GlobalErrorBoundary';
import { MonitoringStatsCards } from './monitoring/MonitoringStatsCards';
import { HealthCheckResults } from './monitoring/HealthCheckResults';
import { MonitoringSettings } from './monitoring/MonitoringSettings';

const SystemMonitoringDashboard = () => {
  const [configValues, setConfigValues] = useState({
    autoRepairEnabled: true,
    notificationMethod: 'popup',
    minSeverityToNotify: 'error',
    heartbeatIntervalMinutes: 10
  });

  const [monitoringStats, setMonitoringStats] = useState<any>(null);
  const [healthCheckResult, setHealthCheckResult] = useState<any>(null);
  const [isRunningHealthCheck, setIsRunningHealthCheck] = useState(false);
  const { logs, isLoading, refreshLogs } = useErrorLogs(false, 50, 0);

  // Load monitoring stats on mount
  useEffect(() => {
    loadMonitoringStats();
  }, []);

  const loadMonitoringStats = async () => {
    const stats = await ErrorMonitoringService.getMonitoringStats();
    setMonitoringStats(stats);
  };

  const handleRunHealthCheck = async () => {
    setIsRunningHealthCheck(true);
    try {
      const result = await SystemHealthCheckService.runFullHealthCheck();
      setHealthCheckResult(result);
      SystemHealthCheckService.displayHealthCheckResult(result);
    } finally {
      setIsRunningHealthCheck(false);
    }
  };

  const handleRunPreDeployCheck = async () => {
    toast.info('Running Pre-deploy Checks', { description: 'This may take a moment...' });
    try {
      const result = await SystemHealthCheckService.runPreDeployChecklist();
      setHealthCheckResult(result);
      SystemHealthCheckService.displayHealthCheckResult(result);
    } catch (error) {
      toast.error('Pre-deploy Check Failed', { 
        description: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  const handleRestartSystem = async () => {
    if (confirm('Are you sure you want to restart the system? This will reload the page.')) {
      await ErrorMonitoringService.restartSystem();
    }
  };

  const handleSaveConfig = async () => {
    await ErrorMonitoringService.saveConfig(configValues);
    toast.success('Monitoring settings saved');
  };

  return (
    <GlobalErrorBoundary component="SystemMonitoringDashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading font-bold">System Monitoring</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleRunHealthCheck}
              disabled={isRunningHealthCheck}
            >
              <Activity className="mr-2 h-4 w-4" />
              Run Health Check
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRunPreDeployCheck}
            >
              <Shield className="mr-2 h-4 w-4" />
              Pre-deploy Check
            </Button>
          </div>
        </div>

        <MonitoringStatsCards 
          healthCheckResult={healthCheckResult}
          monitoringStats={monitoringStats}
          configValues={configValues}
        />

        {healthCheckResult && (
          <HealthCheckResults healthCheckResult={healthCheckResult} />
        )}

        <Tabs defaultValue="errors">
          <TabsList>
            <TabsTrigger value="errors">Error Logs</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="actions">Manual Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="errors" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Latest Error Logs</CardTitle>
                  <CardDescription>
                    Recent errors detected across the platform
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={refreshLogs}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-6">Loading error logs...</div>
                ) : logs.length > 0 ? (
                  <div className="space-y-4">
                    {logs.map((log) => (
                      <div key={log.id} className="border rounded-md p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{log.action}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{log.error_message}</p>
                        <div className="mt-2 flex gap-2 text-xs">
                          <span className="bg-muted px-2 py-1 rounded-md">
                            Profile: {log.profile_type || "unknown"}
                          </span>
                          {log.status_code && (
                            <span className="bg-muted px-2 py-1 rounded-md">
                              Status: {log.status_code}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No error logs found. Your platform is running smoothly!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 pt-4">
            <MonitoringSettings
              configValues={configValues}
              setConfigValues={setConfigValues}
              handleSaveConfig={handleSaveConfig}
            />
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-4 pt-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </GlobalErrorBoundary>
  );
};

export default SystemMonitoringDashboard;
