
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface MonitoringSettingsProps {
  configValues: any;
  setConfigValues: (values: any) => void;
  handleSaveConfig: () => void;
}

export const MonitoringSettings = ({ 
  configValues, 
  setConfigValues, 
  handleSaveConfig 
}: MonitoringSettingsProps) => {
  return (
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
              onValueChange={(value: 'popup' | 'email' | 'slack' | 'all') => 
                setConfigValues({...configValues, notificationMethod: value})
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
              onValueChange={(value: 'info' | 'warning' | 'error' | 'critical') => 
                setConfigValues({...configValues, minSeverityToNotify: value})
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
  );
};
