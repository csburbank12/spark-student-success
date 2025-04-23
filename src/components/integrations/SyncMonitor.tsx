
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IntegrationService } from '@/services/IntegrationService';
import { IntegrationSyncLog } from '@/types/integrations';

interface SyncMonitorProps {
  integrationId: string;
}

export function SyncMonitor({ integrationId }: SyncMonitorProps) {
  const { data: syncLogs, isLoading } = useQuery({
    queryKey: ['syncLogs', integrationId],
    queryFn: () => IntegrationService.getSyncLogs(integrationId)
  });

  if (isLoading) {
    return <div>Loading sync history...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {syncLogs?.map((log: IntegrationSyncLog) => (
            <div 
              key={log.id} 
              className="p-4 border rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className={`inline-block px-2 py-1 text-sm rounded ${
                    log.status === 'completed' ? 'bg-green-100 text-green-800' :
                    log.status === 'failed' ? 'bg-red-100 text-red-800' :
                    log.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(log.started_at).toLocaleString()}
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Processed:</span> {log.records_processed}
                </div>
                <div>
                  <span className="font-medium">Failed:</span> {log.records_failed}
                </div>
              </div>

              {log.error_message && (
                <div className="mt-2 text-sm text-red-600">
                  {log.error_message}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
