import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, Shield } from "lucide-react";
import { useErrorLogs } from "@/hooks/useErrorLogs";
import { ErrorMonitoringService } from "@/services/ErrorMonitoringService";
import { SystemHealthCheckService } from "@/services/SystemHealthCheckService";
import { toast } from "sonner";
import GlobalErrorBoundary from '@/components/error-handling/GlobalErrorBoundary';
import { MonitoringStatsCards } from './monitoring/MonitoringStatsCards';
import { HealthCheckResults } from './monitoring/HealthCheckResults';
import { MonitoringSettings } from './monitoring/MonitoringSettings';
import { ErrorLogsSection } from './monitoring/ErrorLogsSection';
import { MonitoringActions } from './monitoring/MonitoringActions';

const SystemMonitoringDashboard = () => {
  const [configValues, setConfigValues] = useState({
    autoRepairEnabled: true,
    notificationMethod: 'popup' as const,
    minSeverityToNotify: 'error' as const,
    heartbeatIntervalMinutes: 10
  });

  const [monitoringStats, setMonitoringStats] = useState<any>(null);
  const [healthCheckResult, setHealthCheckResult] = useState<any>(null);
  const [isRunningHealthCheck, setIsRunningHealthCheck] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const { logs, isLoading, refreshLogs, toggleResolution } = useErrorLogs(false, 50, 0);
  const [filteredLogs, setFilteredLogs] = useState(logs);

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
            <ErrorLogsSection 
              isLoading={isLoading}
              filteredLogs={filteredLogs}
              toggleResolution={toggleResolution}
              currentPage={currentPage}
              currentLimit={currentLimit}
              onPageChange={setCurrentPage}
            />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <MonitoringSettings
              configValues={configValues}
              setConfigValues={setConfigValues}
              handleSaveConfig={handleSaveConfig}
            />
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-4 pt-4">
            <MonitoringActions handleRestartSystem={handleRestartSystem} />
          </TabsContent>
        </Tabs>
      </div>
    </GlobalErrorBoundary>
  );
};

export default SystemMonitoringDashboard;
