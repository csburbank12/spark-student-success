
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Command, Download, Users, Trash2, ArrowRight } from "lucide-react";
import { ErrorLogFilter } from "@/components/admin/error-logs/ErrorLogFilter";
import { ErrorSeverityChart } from "@/components/admin/error-logs/ErrorSeverityChart";

// Mock data
const errorLogs = [
  { 
    id: "err-001", 
    timestamp: "2023-04-10T14:23:11", 
    user_id: "user-456",
    profile_type: "teacher",
    action: "page_load",
    error_message: "Failed to fetch student data: API timeout",
    status_code: "408",
    resolved: false
  },
  { 
    id: "err-002", 
    timestamp: "2023-04-10T11:05:22", 
    user_id: "user-789",
    profile_type: "student",
    action: "submission",
    error_message: "Form validation failed: Missing required fields",
    status_code: "400", 
    resolved: true
  },
  { 
    id: "err-003", 
    timestamp: "2023-04-09T09:45:10", 
    user_id: "user-123",
    profile_type: "admin",
    action: "data_export",
    error_message: "Export process failed: Insufficient permissions",
    status_code: "403",
    resolved: false
  }
];

const ErrorLogsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterResolved, setFilterResolved] = useState<string>("all");
  
  // Filter logs based on search and resolved status
  const filteredLogs = errorLogs.filter(log => {
    const matchesSearch = 
      log.error_message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.profile_type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterResolved === "all") return matchesSearch;
    if (filterResolved === "resolved") return matchesSearch && log.resolved;
    if (filterResolved === "unresolved") return matchesSearch && !log.resolved;
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Error Logs Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Command className="h-4 w-4 mr-1" />
            Run Diagnostics
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Error Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{errorLogs.length}</div>
                <div className="text-sm text-muted-foreground">Total Errors</div>
              </div>
              <div className="bg-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-destructive">
                  {errorLogs.filter(log => !log.resolved).length}
                </div>
                <div className="text-sm text-muted-foreground">Unresolved</div>
              </div>
              <div className="bg-card p-4 rounded-lg text-center">
                <Badge variant="secondary" className="text-xs">24h</Badge>
                <div className="text-2xl font-bold mt-1">
                  {errorLogs.filter(log => new Date(log.timestamp) > new Date(Date.now() - 86400000)).length}
                </div>
                <div className="text-sm text-muted-foreground">Recent</div>
              </div>
            </div>
            <ErrorSeverityChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Error by User Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-[200px]">
              <div className="flex flex-col items-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground max-w-sm">
                  Role-based error distribution chart will appear here after collecting more data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Error Log Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search errors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={filterResolved}
              onValueChange={setFilterResolved}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Errors</SelectItem>
                <SelectItem value="unresolved">Unresolved Only</SelectItem>
                <SelectItem value="resolved">Resolved Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ErrorLogFilter />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Profile Type</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Error</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No error logs found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.profile_type}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {log.error_message}
                      </TableCell>
                      <TableCell>
                        {log.resolved ? (
                          <Badge variant="success">Resolved</Badge>
                        ) : (
                          <Badge variant="destructive">Unresolved</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorLogsDashboard;
