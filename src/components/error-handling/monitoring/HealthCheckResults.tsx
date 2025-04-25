
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface HealthCheckResultsProps {
  healthCheckResult: {
    success: boolean;
    errorCount: number;
    checks: Array<{
      name: string;
      status: 'passed' | 'warning' | 'failed';
      message?: string;
    }>;
    timestamp: string;
  };
}

export const HealthCheckResults: React.FC<HealthCheckResultsProps> = ({
  healthCheckResult
}) => {
  // Group checks by status
  const passedChecks = healthCheckResult.checks.filter(check => check.status === 'passed');
  const warningChecks = healthCheckResult.checks.filter(check => check.status === 'warning');
  const failedChecks = healthCheckResult.checks.filter(check => check.status === 'failed');

  const StatusIcon = ({ status }: { status: 'passed' | 'warning' | 'failed' }) => {
    if (status === 'passed') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (status === 'warning') {
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const formatName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Check Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-md">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium">Passed</p>
              <p className="text-sm text-muted-foreground">{passedChecks.length} checks</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded-md">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <div>
              <p className="font-medium">Warnings</p>
              <p className="text-sm text-muted-foreground">{warningChecks.length} checks</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-red-50 p-3 rounded-md">
            <XCircle className="h-5 w-5 text-red-500" />
            <div>
              <p className="font-medium">Failed</p>
              <p className="text-sm text-muted-foreground">{failedChecks.length} checks</p>
            </div>
          </div>
        </div>
        
        {/* Display all checks */}
        <div className="space-y-4">
          {healthCheckResult.checks.map((check, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-md ${
                check.status === 'passed' ? 'bg-green-50' : 
                check.status === 'warning' ? 'bg-amber-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StatusIcon status={check.status} />
                  <p className="font-medium">{formatName(check.name)}</p>
                </div>
                <span className={`text-sm ${
                  check.status === 'passed' ? 'text-green-700' : 
                  check.status === 'warning' ? 'text-amber-700' : 'text-red-700'
                }`}>
                  {check.status.toUpperCase()}
                </span>
              </div>
              {check.message && (
                <p className="text-sm mt-2 ml-7">{check.message}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="pt-4 text-sm text-center text-muted-foreground">
          Health check performed at: {new Date(healthCheckResult.timestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};
