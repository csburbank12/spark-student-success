
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  Calendar, 
  Users, 
  RefreshCw 
} from "lucide-react";
import { EducationSystem } from "@/types/roles";

interface StepConfirmProps {
  system: EducationSystem;
  connectionConfig: Record<string, any>;
  mappedFields: Record<string, string>;
  recordCount: number;
  onImport: () => void;
  isProcessing: boolean;
}

const StepConfirm: React.FC<StepConfirmProps> = ({ 
  system, 
  connectionConfig, 
  mappedFields,
  recordCount,
  onImport,
  isProcessing
}) => {
  const [enableAutoSync, setEnableAutoSync] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState<'daily' | 'weekly'>('daily');
  
  const getConnectionTypeName = () => {
    if (!connectionConfig.connectionType) return "Unknown";
    
    switch (connectionConfig.connectionType) {
      case 'api': return "API";
      case 'oauth': return "OAuth";
      case 'csv': return "CSV Upload";
      case 'sftp': return "SFTP";
      default: return connectionConfig.connectionType;
    }
  };
  
  const getConnectionDetail = () => {
    const type = connectionConfig.connectionType;
    
    if (type === 'api') return connectionConfig.apiUrl;
    if (type === 'oauth') return "Authentication token received";
    if (type === 'csv') return connectionConfig.fileName;
    if (type === 'sftp') return `${connectionConfig.sftpHost}:${connectionConfig.sftpPath || '/'}`;
    
    return "Not specified";
  };
  
  // Count how many fields are mapped
  const mappedFieldCount = Object.values(mappedFields).filter(Boolean).length;
  
  // Check if all required fields are mapped
  const requiredFields = ['student_id', 'first_name', 'last_name', 'grade'];
  const allRequiredFieldsMapped = requiredFields.every(field => mappedFields[field]);
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Connection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">System:</dt>
                <dd className="col-span-2 text-sm">{system.replace('_', ' ')}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">Connection Type:</dt>
                <dd className="col-span-2 text-sm">{getConnectionTypeName()}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">Connection Details:</dt>
                <dd className="col-span-2 text-sm">{getConnectionDetail()}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">Status:</dt>
                <dd className="col-span-2 text-sm">
                  {connectionConfig.connected ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                  ) : (
                    <Badge variant="destructive">Not Connected</Badge>
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Data Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">Total Records:</dt>
                <dd className="col-span-2 text-sm font-semibold">{recordCount}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">Fields Mapped:</dt>
                <dd className="col-span-2 text-sm">{mappedFieldCount} fields</dd>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">Required Fields:</dt>
                <dd className="col-span-2 text-sm">
                  {allRequiredFieldsMapped ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">All mapped</Badge>
                  ) : (
                    <Badge variant="destructive">Missing required fields</Badge>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <dt className="text-sm font-medium text-muted-foreground">Estimated Time:</dt>
                <dd className="col-span-2 text-sm">
                  {recordCount > 1000 ? '2-5 minutes' : '< 1 minute'}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      
      <Accordion type="single" collapsible defaultValue="item-1" className="border rounded-md">
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-4">
            <span className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Configure Recurring Sync
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-sync"
                  checked={enableAutoSync}
                  onCheckedChange={setEnableAutoSync}
                />
                <Label htmlFor="auto-sync">Enable automatic data synchronization</Label>
              </div>
              
              {enableAutoSync && (
                <div className="pl-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Your student data will be automatically synchronized on the following schedule:
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="daily"
                        value="daily"
                        checked={syncFrequency === 'daily'}
                        onChange={() => setSyncFrequency('daily')}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="daily" className="text-sm">Daily (12:00 AM)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="weekly"
                        value="weekly"
                        checked={syncFrequency === 'weekly'}
                        onChange={() => setSyncFrequency('weekly')}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="weekly" className="text-sm">Weekly (Sunday, 12:00 AM)</Label>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex">
                    <Calendar className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Next sync: {syncFrequency === 'daily' ? 'Tomorrow' : 'Next Sunday'} at 12:00 AM</p>
                      <p className="mt-1 text-blue-600">You can change this setting later in your account dashboard.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Card>
        <CardHeader>
          <CardTitle>Ready to Import</CardTitle>
          <CardDescription>
            Review the information above and click "Start Import" when ready to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
            <div className="text-sm">
              <p className="font-medium">Before you continue:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                <li>This process cannot be interrupted once started</li>
                <li>Existing student records will be updated if they share the same ID</li>
                <li>Importing a large number of records may take several minutes</li>
                <li>You'll receive a detailed report when the import is complete</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isProcessing ? (
            <Button onClick={onImport} disabled={!connectionConfig.connected || recordCount === 0}>
              Start Import
            </Button>
          ) : (
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Importing data...</span>
                <span className="text-sm text-muted-foreground">Please wait</span>
              </div>
              <Progress value={45} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                Processing records... This may take a few minutes
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StepConfirm;
