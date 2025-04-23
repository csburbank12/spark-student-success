
import React, { useState, useEffect } from "react";
import { loopBotService, LoopBotLog, SiteHealth } from "@/services/loopbot/LoopBotService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertCircle, XCircle, RefreshCw, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

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
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const {
    data: lastScanResult,
    refetch: refetchScanResult
  } = useQuery({
    queryKey: ["loopbot-last-scan"],
    queryFn: () => loopBotService.getLastScanResult(),
    refetchInterval: 30000, // Refresh every 30 seconds
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
      case "pending": return <RefreshCw className="h-5 w-5 text-yellow-500" />;
      case "failed": return <XCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  const getHealthIcon = (health: SiteHealth) => {
    switch (health) {
      case "green": return <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Healthy</div>;
      case "yellow": return <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Warning</div>;
      case "red": return <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Critical</div>;
      default: return <div className="flex items-center"><span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>Unknown</div>;
    }
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
        {/* Site Health Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Site Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <Shield className="h-12 w-12 text-primary mb-2" />
              <div className="text-xl font-medium">
                {lastScanResult ? getHealthIcon(lastScanResult.siteHealth) : getHealthIcon("green")}
              </div>
              {lastScanResult && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last scan: {new Date(lastScanResult.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Issues Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Issues Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold">
                  {logs?.filter(log => log.status === "resolved").length || 0}
                </span>
                <span className="text-xs text-muted-foreground">Resolved</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold">
                  {logs?.filter(log => log.status === "pending").length || 0}
                </span>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold text-yellow-600">
                  {logs?.filter(log => log.severity === "high").length || 0}
                </span>
                <span className="text-xs text-muted-foreground">High Priority</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <span className="text-2xl font-bold text-red-600">
                  {logs?.filter(log => log.severity === "critical").length || 0}
                </span>
                <span className="text-xs text-muted-foreground">Critical</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Scheduled Scan Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Scheduled Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Next daily scan:</span>
                <span className="text-sm font-medium">Midnight (00:00)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Log retention:</span>
                <span className="text-sm font-medium">30 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Auto-repair:</span>
                <span className="text-sm font-medium text-green-600">Enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>
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
            <select
              className="text-sm border rounded p-1"
              value={filterDays}
              onChange={(e) => setFilterDays(Number(e.target.value))}
            >
              <option value={1}>Last 24 hours</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex justify-center p-8 text-red-600">
              Error loading logs. Please try again.
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
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
                    {logs && logs.length > 0 ? (
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
                                  onClick={() => handleAcknowledge(log.id)}
                                >
                                  Acknowledge
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleRollback(log.id)}
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
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="critical">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs && logs.filter(log => log.severity === "critical").length > 0 ? (
                    logs.filter(log => log.severity === "critical").map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{log.issueType.replace('_', ' ')}</TableCell>
                        <TableCell className="max-w-xs truncate">{log.description}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getStatusIcon(log.status)}
                            <span className="ml-2">{log.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {log.status === "pending" && (
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleAcknowledge(log.id)}
                              >
                                Acknowledge
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleRollback(log.id)}
                              >
                                Rollback
                              </Button>
                            </div>
                          )}
                          {log.status === "resolved" && (
                            <span className="text-sm text-muted-foreground">
                              {log.resolution}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No critical alerts found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repairs">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Resolution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs && logs.filter(log => log.status === "resolved" && log.resolution !== null).length > 0 ? (
                    logs.filter(log => log.status === "resolved" && log.resolution !== null).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{log.issueType.replace('_', ' ')}</TableCell>
                        <TableCell className="max-w-xs truncate">{log.description}</TableCell>
                        <TableCell>{log.resolution}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No auto-repairs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoopBotLogs;
