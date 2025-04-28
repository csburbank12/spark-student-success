
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RepairLogEntry {
  id: string;
  timestamp: string;
  action: string;
  status: 'success' | 'error' | 'in_progress';
  user?: string;
  details?: string;
}

interface RepairLogProps {
  logs: RepairLogEntry[];
}

export const RepairLog: React.FC<RepairLogProps> = ({ logs = [] }) => {
  if (!logs.length) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No repair logs found
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="border rounded-md p-4 bg-card/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge 
                  // Update to use the supported variants
                  variant={log.status === "success" ? "success" : "destructive"}
                >
                  {log.status}
                </Badge>
                <span className="font-medium">{log.action}</span>
              </div>
              <span className="text-sm text-muted-foreground">{log.timestamp}</span>
            </div>
            {log.details && (
              <p className="mt-2 text-sm text-muted-foreground">{log.details}</p>
            )}
            {log.user && (
              <p className="mt-2 text-xs text-muted-foreground">
                By: {log.user}
              </p>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RepairLog;
