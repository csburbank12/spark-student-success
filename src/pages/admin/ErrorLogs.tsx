
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { AlertCircle } from "lucide-react";

const ErrorLogs = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Error Logs" 
        description="System error monitoring and troubleshooting" 
        icon={<AlertCircle className="h-6 w-6 text-primary" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>System Error Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The system error logs will be available here soon.</p>
          <p className="text-muted-foreground mt-2">
            This page will display system errors, warnings, and diagnostic information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorLogs;
