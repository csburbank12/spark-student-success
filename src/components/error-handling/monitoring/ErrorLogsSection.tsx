
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { ErrorLog } from '@/hooks/useErrorLogs';
import { LogsPagination } from './LogsPagination';

interface ErrorLogsSectionProps {
  isLoading: boolean;
  filteredLogs: ErrorLog[];
  toggleResolution: (id: string, resolved: boolean) => void;
  currentPage: number;
  currentLimit: number;
  onPageChange: (page: number) => void;
}

export const ErrorLogsSection = ({
  isLoading,
  filteredLogs,
  toggleResolution,
  currentPage,
  currentLimit,
  onPageChange
}: ErrorLogsSectionProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSeverityBadge = (message: string) => {
    if (message.includes('critical') || message.includes('exception')) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (message.includes('warning')) {
      return <Badge variant="warning">Warning</Badge>;
    } else {
      return <Badge>Info</Badge>;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        {isLoading ? (
          <div className="flex justify-center p-8">Loading error logs...</div>
        ) : filteredLogs.length > 0 ? (
          <div className="divide-y">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(log.timestamp)}
                    </span>
                    {getSeverityBadge(log.error_message)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleResolution(log.id, !log.resolved)}
                  >
                    {log.resolved ? (
                      <XCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                    )}
                    {log.resolved ? 'Reopen' : 'Resolve'}
                  </Button>
                </div>
                
                <h3 className="font-medium mb-1">{log.action}</h3>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Profile Type:</span>{' '}
                    {log.profile_type || 'Unknown'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Error Message:</span>{' '}
                    <div className="p-2 bg-muted/50 rounded-md text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                      {log.error_message}
                    </div>
                  </div>
                  {log.status_code && (
                    <div className="text-sm">
                      <span className="font-medium">Status Code:</span>{' '}
                      {log.status_code}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No error logs found matching the current filters.
          </div>
        )}
      </div>
      {filteredLogs.length > 0 && (
        <LogsPagination
          currentPage={currentPage}
          currentLimit={currentLimit}
          totalItems={filteredLogs.length}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
