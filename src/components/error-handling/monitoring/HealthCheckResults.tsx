
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface HealthCheckResultsProps {
  healthCheckResult: any;
}

export const HealthCheckResults = ({ healthCheckResult }: HealthCheckResultsProps) => {
  if (!healthCheckResult) return null;

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <CardTitle>Health Check Results</CardTitle>
        <CardDescription>
          Completed in {healthCheckResult.duration}ms at {new Date(healthCheckResult.timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {healthCheckResult.checks && healthCheckResult.checks.map((check: any, index: number) => (
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
                  <XCircle className="text-destructive mr-2 h-4 w-4" />
                )}
                <span className="font-medium">{check.name.replace(/_/g, ' ')}</span>
              </div>
              <span className="text-sm capitalize">{check.status}</span>
            </div>
          ))}
        </div>
        {'warnings' in healthCheckResult && healthCheckResult.warnings?.length > 0 && (
          <div className="mt-4 p-3 bg-amber-500/10 rounded-md">
            <h3 className="font-medium mb-1">Warnings</h3>
            <ul className="text-sm space-y-1">
              {healthCheckResult.warnings.map((warning: string, index: number) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
