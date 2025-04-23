
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Settings } from 'lucide-react';
import { IntegrationService } from '@/services/IntegrationService';
import { IntegrationConfigForm } from '@/components/integrations/IntegrationConfigForm';
import { SyncMonitor } from '@/components/integrations/SyncMonitor';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

const IntegrationsManager = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const { data: integrations, isLoading } = useQuery({
    queryKey: ['integrations'],
    queryFn: IntegrationService.listIntegrations
  });

  const handleAddIntegration = async (values: any) => {
    try {
      await IntegrationService.registerIntegration(
        values.name,
        values.type,
        {
          apiKey: values.apiKey,
          apiEndpoint: values.apiEndpoint
        }
      );
      
      if (values.syncFrequencyMinutes) {
        // Schedule sync tasks for the new integration
        await IntegrationService.scheduleSyncTask(
          values.id,
          'all',
          values.syncFrequencyMinutes
        );
      }
      
      toast.success('Integration added successfully');
    } catch (error) {
      console.error('Error adding integration:', error);
      toast.error('Failed to add integration');
    }
  };

  const handleSyncNow = async (integrationId: string) => {
    // This will be implemented in the next phase
    toast.info('Sync functionality will be implemented in the next phase');
  };

  if (isLoading) {
    return <div>Loading integrations...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">External Integrations</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
            </DialogHeader>
            <IntegrationConfigForm onSubmit={handleAddIntegration} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {integrations?.map((integration) => (
            <Card key={integration.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{integration.name}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    integration.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {integration.is_active ? 'Active' : 'Inactive'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type: {integration.integration_type}</p>
                  <p className="text-sm text-muted-foreground">
                    Last Updated: {new Date(integration.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSyncNow(integration.id)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedIntegration(integration.id)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedIntegration && (
          <div className="space-y-6">
            <SyncMonitor integrationId={selectedIntegration} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationsManager;
