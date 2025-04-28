
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, RefreshCw, Layers, Database, Brain, ArrowRightLeft, Menu } from "lucide-react";
import { DiagnosticsSummary } from "./DiagnosticsSummary";
import { RepairTool } from "./RepairTool";
import { RepairLog } from "./RepairLog";
import { useRepairTools } from "@/hooks/useRepairTools";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";

// Define the expected RepairLogEntry type compatible with our component
interface ComponentRepairLogEntry {
  id: string;
  timestamp: string;
  action: string;
  status: 'success' | 'error' | 'in_progress';
  user?: string;
  details?: string;
}

const RepairToolkit = () => {
  const [activeTab, setActiveTab] = useState<string>('tools');
  const { 
    repairStatus, 
    repairLogs, 
    isRepairing, 
    repairNavigation,
    repairSELModule,
    repairProfileLayouts,
    syncDatabase,
    restartWellLensAI,
    refreshSkywardSync,
    repairAll,
    latestDiagnostics
  } = useRepairTools();

  // Convert API RepairLogEntry to ComponentRepairLogEntry
  const formattedRepairLogs: ComponentRepairLogEntry[] = (repairLogs || []).map(log => ({
    id: log.id,
    timestamp: typeof log.timestamp === 'string' ? log.timestamp : log.timestamp.toISOString(),
    action: log.action,
    status: log.success ? 'success' : 'error',
    user: log.adminName,
    details: log.details
  }));

  const handleRepair = async (repairFunction: () => Promise<void>, actionName: string) => {
    try {
      await repairFunction();
    } catch (error) {
      ErrorLoggingService.logError({
        action: `admin_repair_toolkit_${actionName}`,
        error_message: error instanceof Error ? error.message : "Unknown error during repair",
        profile_type: "admin"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Repair & Recovery Toolkit</h2>
        <Button
          onClick={() => handleRepair(repairAll, "repair_all")}
          disabled={isRepairing}
          variant="default"
          className="bg-green-600 hover:bg-green-700"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRepairing ? "animate-spin" : ""}`} />
          Repair All Systems
        </Button>
      </div>

      {repairStatus && (
        <Alert className={`${repairStatus.success ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
          <div className="flex items-center">
            {repairStatus.success ? (
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
            )}
            <AlertDescription className={`${repairStatus.success ? "text-green-800" : "text-amber-800"}`}>
              {repairStatus.message}
            </AlertDescription>
          </div>
        </Alert>
      )}

      <Tabs defaultValue="tools" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">Repair Tools</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="logs">Repair Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RepairTool 
              title="Repair Navigation System"
              description="Rebuild navigation bars and verify all routes"
              icon={<Menu className="h-5 w-5 text-blue-600" />}
              onClick={() => handleRepair(repairNavigation, "navigation")}
              isRepairing={isRepairing}
              status={latestDiagnostics?.navigation?.status || "unknown"}
            />
            
            <RepairTool 
              title="Rebuild SEL Module"
              description="Re-link SEL lessons and reset activity tracking"
              icon={<Layers className="h-5 w-5 text-purple-600" />}
              onClick={() => handleRepair(repairSELModule, "sel_module")}
              isRepairing={isRepairing}
              status={latestDiagnostics?.selModule?.status || "unknown"}
            />
            
            <RepairTool 
              title="Fix Profile Layouts"
              description="Re-sync all profile layouts and components"
              icon={<RefreshCw className="h-5 w-5 text-orange-600" />}
              onClick={() => handleRepair(repairProfileLayouts, "profiles")}
              isRepairing={isRepairing}
              status={latestDiagnostics?.profileLayouts?.status || "unknown"}
            />
            
            <RepairTool 
              title="Sync with Database"
              description="Re-pull data and clear cache if necessary"
              icon={<Database className="h-5 w-5 text-green-600" />}
              onClick={() => handleRepair(syncDatabase, "database_sync")}
              isRepairing={isRepairing}
              status={latestDiagnostics?.database?.status || "unknown"}
            />
            
            <RepairTool 
              title="Restart WellLens AI"
              description="Reinitialize monitoring and predictive models"
              icon={<Brain className="h-5 w-5 text-indigo-600" />}
              onClick={() => handleRepair(restartWellLensAI, "welllens")}
              isRepairing={isRepairing}
              status={latestDiagnostics?.wellLensAI?.status || "unknown"}
            />
            
            <RepairTool 
              title="Skyward Sync Refresh"
              description="Re-sync with Skyward and validate connection"
              icon={<ArrowRightLeft className="h-5 w-5 text-cyan-600" />}
              onClick={() => handleRepair(refreshSkywardSync, "skyward_sync")}
              isRepairing={isRepairing}
              status={latestDiagnostics?.skywardSync?.status || "unknown"}
            />
          </div>
        </TabsContent>

        <TabsContent value="diagnostics" className="mt-4">
          <DiagnosticsSummary diagnostics={latestDiagnostics} />
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Repair Activity Logs</CardTitle>
              <CardDescription>History of all repair actions taken by administrators</CardDescription>
            </CardHeader>
            <CardContent>
              <RepairLog logs={formattedRepairLogs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RepairToolkit;
