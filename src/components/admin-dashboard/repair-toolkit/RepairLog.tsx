
import React from 'react';
import { RepairLogEntry } from '@/types/admin';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface RepairLogProps {
  logs: RepairLogEntry[];
}

export const RepairLog: React.FC<RepairLogProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No repair logs available. Repair actions will be recorded here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {log.success ? (
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 mr-2" />
              )}
              <span className="font-medium">{log.action}</span>
            </div>
            <Badge variant={log.success ? "success" : "destructive"}>
              {log.success ? "Successful" : "Failed"}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mb-1">
            {log.details}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Performed by: {log.adminName}</span>
            <time dateTime={log.timestamp.toISOString()}>
              {log.timestamp.toLocaleString()}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
};
