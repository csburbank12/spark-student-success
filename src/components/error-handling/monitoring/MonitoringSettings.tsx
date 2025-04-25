
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";

interface MonitoringSettingsProps {
  configValues: {
    autoRepairEnabled: boolean;
    notificationMethod: 'popup' | 'email' | 'both';
    minSeverityToNotify: 'warning' | 'error' | 'critical';
    heartbeatIntervalMinutes: number;
  };
  setConfigValues: React.Dispatch<React.SetStateAction<{
    autoRepairEnabled: boolean;
    notificationMethod: 'popup' | 'email' | 'both';
    minSeverityToNotify: 'warning' | 'error' | 'critical';
    heartbeatIntervalMinutes: number;
  }>>;
  handleSaveConfig: () => Promise<void>;
}

export const MonitoringSettings: React.FC<MonitoringSettingsProps> = ({
  configValues,
  setConfigValues,
  handleSaveConfig
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Repair</h3>
              <p className="text-sm text-muted-foreground">
                Automatically attempt to fix common system issues
              </p>
            </div>
            <Switch 
              checked={configValues.autoRepairEnabled}
              onCheckedChange={(checked) => setConfigValues({...configValues, autoRepairEnabled: checked})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Notification Method</Label>
            <Select 
              value={configValues.notificationMethod}
              onValueChange={(value: 'popup' | 'email' | 'both') => 
                setConfigValues({...configValues, notificationMethod: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select notification method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popup">Browser Popup</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Minimum Severity to Notify</Label>
            <Select 
              value={configValues.minSeverityToNotify}
              onValueChange={(value: 'warning' | 'error' | 'critical') => 
                setConfigValues({...configValues, minSeverityToNotify: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select minimum severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Heartbeat Interval (minutes)</Label>
            <Input 
              type="number" 
              min="1" 
              max="60"
              value={configValues.heartbeatIntervalMinutes}
              onChange={(e) => setConfigValues({
                ...configValues, 
                heartbeatIntervalMinutes: parseInt(e.target.value) || 5
              })}
            />
            <p className="text-xs text-muted-foreground">
              How often the system performs a health check (1-60 minutes)
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" onClick={handleSaveConfig}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};
