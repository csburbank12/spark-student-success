
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Settings } from 'lucide-react';
import { IntegrationService } from '@/services/IntegrationService';
import { toast } from 'sonner';

const IntegrationsManager = () => {
  const { data: integrations, isLoading } = useQuery({
    queryKey: ['integrations'],
    queryFn: IntegrationService.listIntegrations
  });

  const handleAddIntegration = () => {
    // This will be implemented later with a modal form
    toast.info('Integration creation will be implemented in the next phase');
  };

  if (isLoading) {
    return <div>Loading integrations...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">External Integrations</h1>
        <Button onClick={handleAddIntegration}>
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsManager;
