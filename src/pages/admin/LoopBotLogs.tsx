
import React, { useState } from "react";
import { loopBotService } from "@/services/loopbot/LoopBotService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { HealthStatusCard } from "@/components/loopbot/HealthStatusCard";
import { IssuesSummaryCard } from "@/components/loopbot/IssuesSummaryCard";
import { ScheduledOperationsCard } from "@/components/loopbot/ScheduledOperationsCard";
import { LogsTable } from "@/components/loopbot/LogsTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LoopBotLogs: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [filterDays, setFilterDays] = useState(7);

  const {
    data: logs,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["loopbot-logs", filterDays],
    queryFn: () => loopBotService.getLogs(filterDays),
    refetchInterval: 30000,
  });

  const {
    data: lastScanResult,
    refetch: refetchScanResult
  } = useQuery({
    queryKey: ["loopbot-last-scan"],
    queryFn: () => loopBotService.getLastScanResult(),
    refetchInterval: 30000,
  });

  const handleStartScan = async () => {
    try {
      setIsScanning(true);
      toast.info("LoopBot scan started");
      await loopBotService.startScan();
      toast.success("LoopBot scan completed");
      refetch();
      refetchScanResult();
    } catch (error) {
      toast.error("Scan failed to start: A scan is already in progress");
    } finally {
      setIsScanning(false);
    }
  };

  const handleAcknowledge = async (logId: string) => {
    await loopBotService.acknowledgeAlert(logId);
    refetch();
  };

  const handleRollback = async (logId: string) => {
    await loopBotService.rollbackToPreviousVersion(logId);
    refetch();
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">LoopBot Maintenance System</h1>
          <p className="text-muted-foreground">Automated quality assurance and self-repair logs</p>
        </div>
        
        <Button 
          onClick={handleStartScan} 
          disabled={isScanning}
          className="flex items-center gap-2"
        >
          {isScanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Run Manual QA Scan
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthStatusCard 
          siteHealth={lastScanResult?.siteHealth || "green"}
          lastScanTimestamp={lastScanResult?.timestamp}
        />
        <IssuesSummaryCard logs={logs} />
        <ScheduledOperationsCard />
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Logs</TabsTrigger>
            <TabsTrigger value="critical">Critical Alerts</TabsTrigger>
            <TabsTrigger value="repairs">Auto-Repairs</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <Select
              value={String(filterDays)}
              onValueChange={(value) => setFilterDays(Number(value))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Last 24 hours</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <LogsTable
                logs={logs}
                isLoading={isLoading}
                onAcknowledge={handleAcknowledge}
                onRollback={handleRollback}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical">
          <Card>
            <CardContent className="p-0">
              <LogsTable
                logs={logs?.filter(log => log.severity === "critical")}
                onAcknowledge={handleAcknowledge}
                onRollback={handleRollback}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repairs">
          <Card>
            <CardContent className="p-0">
              <LogsTable
                logs={logs?.filter(log => log.status === "resolved" && log.resolution !== null)}
                onAcknowledge={handleAcknowledge}
                onRollback={handleRollback}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoopBotLogs;
