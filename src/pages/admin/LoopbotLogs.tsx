
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { Keyboard } from "lucide-react";

const LoopbotLogs = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="LoopBot Logs" 
        description="AI assistant interaction tracking and monitoring" 
        icon={<Keyboard className="h-6 w-6 text-primary" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>LoopBot Interaction Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The LoopBot interaction logs will be available here soon.</p>
          <p className="text-muted-foreground mt-2">
            This page will track and monitor AI assistant interactions across the platform.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoopbotLogs;
