
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useErrorLogs } from "@/hooks/useErrorLogs";
import { ErrorMonitoringService } from "@/services/ErrorMonitoringService";
import { SystemHealthCheckService, HealthCheckResult } from "@/services/SystemHealthCheckService";
import { AlertCircle, CheckCircle, RefreshCw, Settings, Activity, Shield } from "lucide-react";
import GlobalErrorBoundary from '@/components/error-handling/GlobalErrorBoundary';
import { toast } from "sonner";

const SystemMonitoringDashboard = () => {
  const [configValues, setConfigValues] = useState({
    autoRepairEnabled: true,
    notificationMethod: 'popup',
    minSeverityToNotify: 'error',
    heartbeatIntervalMinutes: 10
  });
  const [monitoringStats, setMonitoringStats] = useState<any>(null);
  const [healthCheckResult, setHealthCheckResult] = useState<HealthCheckResult | null>(null);
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
                {monitoringStats?.totalErrors || logs.length || 0}
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

        {healthCheckResult && (
          <Card className="border-2 border-primary/10">
            <CardHeader>
              <CardTitle>Health Check Results</CardTitle>
              <CardDescription>
                Completed in {healthCheckResult.duration}ms at {new Date(healthCheckResult.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {healthCheckResult.checks.map((check, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      check.status === 'passed' ? 'bg-green-500/10' : 
                      check.status === 'warning' ? 'bg-amber-500/10' : 
                      'bg-destructive/10'
                    }`}
                  >
                    <div className="flex items-center">
                      {check.status === 'passed' ? (
                        <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      ) : check.status === 'warning' ? (
                        <AlertCircle className="text-amber-500 mr-2 h-4 w-4" />
                      ) : (
                        <AlertCircle className="text-destructive mr-2 h-4 w-4" />
                      )}
                      <span className="font-medium">{check.name.replace(/_/g, ' ')}</span>
                    </div>
                    <span className="text-sm capitalize">{check.status}</span>
                  </div>
                ))}
              </div>
              {'warnings' in healthCheckResult && healthCheckResult.warnings.length > 0 && (
                <div className="mt-4 p-3 bg-amber-500/10 rounded-md">
                  <h3 className="font-medium mb-1">Warnings</h3>
                  <ul className="text-sm space-y-1">
                    {healthCheckResult.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
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
            <Card>
              <CardHeader>
                <CardTitle>System Monitoring Settings</CardTitle>
                <CardDescription>
                  Configure how the monitoring system operates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-repair">Auto-Repair System</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically attempt to fix common errors
                      </p>
                    </div>
                    <Switch 
                      id="auto-repair" 
                      checked={configValues.autoRepairEnabled}
                      onCheckedChange={(checked) => 
                        setConfigValues({...configValues, autoRepairEnabled: checked})
                      }
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="notification-method">Notification Method</Label>
                    <Select 
                      value={configValues.notificationMethod}
                      onValueChange={(value) => 
                        setConfigValues({...configValues, notificationMethod: value as any})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select notification method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popup">In-app Popup</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="all">All Methods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="min-severity">Minimum Severity to Notify</Label>
                    <Select 
                      value={configValues.minSeverityToNotify}
                      onValueChange={(value) => 
                        setConfigValues({...configValues, minSeverityToNotify: value as any})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info (All Messages)</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="heartbeat-interval">Heartbeat Check Interval (minutes)</Label>
                    <Select 
                      value={configValues.heartbeatIntervalMinutes.toString()}
                      onValueChange={(value) => 
                        setConfigValues({...configValues, heartbeatIntervalMinutes: parseInt(value)})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select heartbeat interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Disabled</SelectItem>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="10">Every 10 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={handleSaveConfig}>
                    <Settings className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Run Pre-deployment Checklist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Runs a comprehensive check to ensure the system is ready for deployment.
                      Verifies routes, authentication flows, API endpoints, and more.
                    </p>
                    <Button onClick={handleRunPreDeployCheck}>
                      <Shield className="mr-2 h-4 w-4" />
                      Run Pre-deploy Check
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Export Error Logs</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download all error logs for offline analysis or backup purposes.
                    </p>
                    <Button variant="outline">
                      Export Logs
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
