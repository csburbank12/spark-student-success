
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SystemDiagnostics } from "@/types/admin";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

interface DiagnosticsSummaryProps {
  diagnostics: SystemDiagnostics | null;
}

export const DiagnosticsSummary: React.FC<DiagnosticsSummaryProps> = ({ diagnostics }) => {
  if (!diagnostics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Diagnostics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No diagnostic data available. Run a system scan to see results.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate health percentages
  const totalSystems = Object.keys(diagnostics).length;
  const passedSystems = Object.values(diagnostics).filter(system => system.status === 'passed').length;
  const warningSystems = Object.values(diagnostics).filter(system => system.status === 'warning').length;
  const failedSystems = Object.values(diagnostics).filter(system => system.status === 'failed').length;
  
  const healthPercentage = Math.round((passedSystems / totalSystems) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Diagnostics Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Overall System Health</h3>
            <span className="text-sm font-semibold">{healthPercentage}%</span>
          </div>
          <Progress value={healthPercentage} className={`h-2 ${healthPercentage > 80 ? 'bg-green-100' : healthPercentage > 50 ? 'bg-amber-100' : 'bg-red-100'}`} />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 border rounded-md bg-green-50 border-green-100">
            <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <div className="text-xl font-bold">{passedSystems}</div>
            <div className="text-xs text-muted-foreground">Healthy</div>
          </div>
          <div className="p-3 border rounded-md bg-amber-50 border-amber-100">
            <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-amber-500" />
            <div className="text-xl font-bold">{warningSystems}</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div className="p-3 border rounded-md bg-red-50 border-red-100">
            <AlertCircle className="h-5 w-5 mx-auto mb-1 text-red-500" />
            <div className="text-xl font-bold">{failedSystems}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">System Components</h3>
          
          {Object.entries(diagnostics).map(([key, system]) => {
            const statusIcon = system.status === 'passed' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : system.status === 'warning' ? (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            );

            const statusClass = system.status === 'passed' 
              ? 'bg-green-50 border-green-100' 
              : system.status === 'warning' 
              ? 'bg-amber-50 border-amber-100' 
              : 'bg-red-50 border-red-100';

            return (
              <div key={key} className={`p-3 border rounded-md ${statusClass} flex items-center justify-between`}>
                <div className="flex items-center">
                  {statusIcon}
                  <span className="ml-2 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <div className="text-xs">
                  {system.lastChecked && (
                    <span className="text-muted-foreground">
                      Checked: {new Date(system.lastChecked).toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
