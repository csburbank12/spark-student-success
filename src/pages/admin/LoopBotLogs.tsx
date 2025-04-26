
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { Keyboard, AlertCircle, CheckCircle, Clock, Filter, Terminal, ArrowUpDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

// Mock data for LoopBot logs
const mockLogs = [
  {
    id: "log1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    type: "scan",
    status: "success",
    message: "Completed routine system scan",
    details: "No issues detected"
  },
  {
    id: "log2",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: "repair",
    status: "success",
    message: "Self-repair completed",
    details: "Fixed cache invalidation issue"
  },
  {
    id: "log3",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: "alert",
    status: "warning",
    message: "Performance degradation detected",
    details: "High CPU usage on API requests"
  },
  {
    id: "log4",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    type: "interaction",
    status: "info",
    message: "User assistance provided",
    details: "Helped user with navigation issues"
  },
  {
    id: "log5",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    type: "scan",
    status: "error",
    message: "Scan failed to complete",
    details: "Timeout during database check"
  }
];

const LoopBotLogs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("24h");
  const [logType, setLogType] = useState("all");

  // Filter logs based on active filters
  const filteredLogs = mockLogs.filter(log => {
    // Filter by tab (status)
    if (activeTab !== "all" && log.status !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !log.details.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter by log type
    if (logType !== "all" && log.type !== logType) return false;
    
    return true;
  });

  // Format timestamp to readable format
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get appropriate icon based on log status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  // Get appropriate badge color based on log type
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "scan": return <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">Scan</Badge>;
      case "repair": return <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">Repair</Badge>;
      case "alert": return <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">Alert</Badge>;
      case "interaction": return <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">Interaction</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="LoopBot Logs" 
        description="AI assistant interaction tracking and monitoring" 
        icon={<Keyboard className="h-6 w-6 text-primary" />}
        showBackButton
        backUrl="/admin-dashboard"
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>LoopBot Activity Logs</CardTitle>
              <CardDescription>
                Track AI assistant operations and interactions
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[140px]">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6h">Last 6 hours</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Terminal className="mr-2 h-4 w-4" />
                Run Health Check
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <TabsList className="mb-2 md:mb-0">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="success">Success</TabsTrigger>
                <TabsTrigger value="warning">Warning</TabsTrigger>
                <TabsTrigger value="error">Error</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search logs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                  <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                
                <Select value={logType} onValueChange={setLogType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Log Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="scan">Scan</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="interaction">Interaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value={activeTab} className="pt-2 space-y-4">
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left align-middle font-medium">
                        <div className="flex items-center gap-1">
                          <span>Time</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Type</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Message</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle whitespace-nowrap">
                          {formatTime(log.timestamp)}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(log.status)}
                            <span className="capitalize">{log.status}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {getTypeBadge(log.type)}
                        </td>
                        <td className="p-4 align-middle font-medium">{log.message}</td>
                        <td className="p-4 align-middle text-muted-foreground">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredLogs.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No logs match your current filters</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div>
                  Showing {filteredLogs.length} of {mockLogs.length} logs
                </div>
                <div>
                  Data refreshed {new Date().toLocaleTimeString()}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 rounded-md bg-muted p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1">
                <h3 className="font-medium mb-1">LoopBot Health Status</h3>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">All systems operational</span>
                </div>
              </div>
              
              <div>
                <Label className="block mb-1 text-sm">Configure Alert Thresholds</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">System Settings</Button>
                  <Button variant="outline" size="sm">Notification Rules</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoopBotLogs;
