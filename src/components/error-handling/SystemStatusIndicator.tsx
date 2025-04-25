
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { SystemHealthCheckService } from "@/services/SystemHealthCheckService";
import { useRouter } from "@/components/ui/router";
import { Tooltip } from "@/components/ui/tooltip";
import { Activity } from "lucide-react";

/**
 * A system status indicator that can be shown in the navbar or footer
 * Shows the current health status of the system and allows quick access to the monitoring dashboard
 */
const SystemStatusIndicator: React.FC = () => {
  const [status, setStatus] = useState<'healthy' | 'warning' | 'error' | 'checking'>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Perform a quick health check on mount
    checkSystemStatus();
    
    // Set an interval to check status periodically (every 5 minutes)
    const intervalId = setInterval(checkSystemStatus, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const checkSystemStatus = async () => {
    setStatus('checking');
    
    try {
      const healthCheck = await SystemHealthCheckService.runFullHealthCheck();
      
      if (healthCheck.errorCount > 0) {
        const criticalErrors = healthCheck.checks.some(
          check => check.status === 'failed' && check.name !== 'dead_links'
        );
        setStatus(criticalErrors ? 'error' : 'warning');
      } else {
        setStatus('healthy');
      }
      
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error checking system status:', error);
      setStatus('error');
      setLastChecked(new Date());
    }
  };
  
  const navigateToMonitoringDashboard = () => {
    router.navigate('/admin/system-monitoring');
  };
  
  // Determine badge variant based on status
  const badgeVariant = {
    'healthy': 'outline',
    'warning': 'secondary',
    'error': 'destructive',
    'checking': 'outline'
  }[status];
  
  const tooltipContent = (
    <div className="text-xs">
      <p>System Status: <span className="font-bold capitalize">{status}</span></p>
      {lastChecked && <p className="text-muted-foreground">Last checked: {lastChecked.toLocaleString()}</p>}
      <p className="italic mt-1">Click to view monitoring dashboard</p>
    </div>
  );
  
  return (
    <Tooltip content={tooltipContent}>
      <Badge 
        variant={badgeVariant as any}
        className="cursor-pointer flex items-center gap-1 hover:bg-secondary"
        onClick={navigateToMonitoringDashboard}
      >
        <Activity className="h-3 w-3" />
        {status === 'checking' ? 'Checking...' : 
          status === 'healthy' ? 'All Systems Operational' : 
          status === 'warning' ? 'Minor Issues Detected' : 
          'System Issues Detected'}
      </Badge>
    </Tooltip>
  );
};

export default SystemStatusIndicator;
