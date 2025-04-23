
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { LoopBotLog } from "@/services/loopbot/types";

interface IssuesSummaryCardProps {
  logs?: LoopBotLog[];
}

export const IssuesSummaryCard: React.FC<IssuesSummaryCardProps> = ({ logs = [] }) => {
  const resolvedCount = logs.filter(log => log.status === "resolved").length;
  const pendingCount = logs.filter(log => log.status === "pending").length;
  const highPriorityCount = logs.filter(log => log.severity === "high").length;
  const criticalCount = logs.filter(log => log.severity === "critical").length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Issues Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <span className="text-2xl font-bold">{resolvedCount}</span>
            <span className="text-xs text-muted-foreground">Resolved</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <span className="text-2xl font-bold">{pendingCount}</span>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <span className="text-2xl font-bold text-yellow-600">{highPriorityCount}</span>
            <span className="text-xs text-muted-foreground">High Priority</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <span className="text-2xl font-bold text-red-600">{criticalCount}</span>
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
