
import React from "react";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LoopBotLog } from "@/services/loopbot/types";

interface LogsTableProps {
  logs?: LoopBotLog[];
  onAcknowledge: (logId: string) => void;
  onRollback: (logId: string) => void;
  isLoading?: boolean;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low": return "bg-green-100 text-green-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "high": return "bg-orange-100 text-orange-800";
    case "critical": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "resolved": return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "pending": return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case "failed": return <XCircle className="h-5 w-5 text-red-500" />;
    default: return null;
  }
};

export const LogsTable: React.FC<LogsTableProps> = ({
  logs = [],
  onAcknowledge,
  onRollback,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        Loading logs...
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Issue Type</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.length > 0 ? (
          logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-mono text-xs">
                {new Date(log.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>{log.issueType.replace('_', ' ')}</TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">
                {log.description}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(log.severity)}`}>
                  {log.severity}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getStatusIcon(log.status)}
                  <span className="ml-2">{log.status}</span>
                </div>
              </TableCell>
              <TableCell>
                {log.severity === "critical" && log.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onAcknowledge(log.id)}
                    >
                      Acknowledge
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onRollback(log.id)}
                    >
                      Rollback
                    </Button>
                  </div>
                )}
                {(log.status === "resolved" || (log.severity !== "critical" && log.status === "pending")) && (
                  <span className="text-sm text-muted-foreground">
                    {log.resolution || "Auto-fixing..."}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              No logs found for the selected period
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
