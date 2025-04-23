
import React, { useState, useEffect } from 'react';
import { Calendar, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useErrorLogs } from '@/hooks/useErrorLogs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

export default function LoopBotLogs() {
  const [showResolved, setShowResolved] = useState(false);
  const { logs, isLoading, toggleResolution, refreshLogs } = useErrorLogs(showResolved);
  const [hasRecurringIssues, setHasRecurringIssues] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Check for recurring errors
  useEffect(() => {
    const checkRecurringErrors = async () => {
      if (logs.length > 0) {
        // Get unique actions
        const actions = [...new Set(logs.map(log => log.action))];
        
        // Check each action for recurring issues
        for (const action of actions) {
          const count = await ErrorLoggingService.checkRecurringErrors(action);
          if (count >= 5) {
            setHasRecurringIssues(true);
            break;
          }
        }
      }
    };
    
    checkRecurringErrors();
  }, [logs]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading error logs...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Error Logs</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Show Resolved</span>
          <Switch
            checked={showResolved}
            onCheckedChange={setShowResolved}
          />
        </div>
      </div>

      {hasRecurringIssues && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Multiple recurring errors detected in the last hour. Please investigate.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {logs.map((log) => (
          <Card key={log.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(log.timestamp)}
                  </span>
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
              <CardTitle className="text-base">
                {log.action}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Profile Type:</span>{' '}
                  {log.profile_type || 'Unknown'}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Error Message:</span>{' '}
                  {log.error_message}
                </div>
                {log.status_code && (
                  <div className="text-sm">
                    <span className="font-medium">Status Code:</span>{' '}
                    {log.status_code}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {logs.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No error logs found.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
