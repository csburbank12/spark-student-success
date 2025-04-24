import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileDown, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FERPAAccessType, FERPARecordType } from "@/services/FERPAComplianceService";

const mockLogs = [
  {
    id: "log1",
    user_name: "Ms. Sarah Thompson",
    user_role: "teacher",
    record_type: "student_record",
    access_type: "view",
    student_name: "Alex Johnson",
    timestamp: "2024-04-23T08:15:00Z",
    successful: true
  },
  {
    id: "log2",
    user_name: "Principal Rodriguez",
    user_role: "admin",
    record_type: "mood_data",
    access_type: "export",
    student_name: "Emma Wilson",
    timestamp: "2024-04-22T14:30:00Z",
    successful: true
  },
  {
    id: "log3",
    user_name: "Mrs. Anderson",
    user_role: "teacher",
    record_type: "intervention",
    access_type: "create",
    student_name: "Michael Brown",
    timestamp: "2024-04-22T10:45:00Z",
    successful: true
  },
  {
    id: "log4",
    user_name: "Mr. Parker",
    user_role: "teacher",
    record_type: "student_record",
    access_type: "view",
    student_name: "Sophie Chen",
    timestamp: "2024-04-21T11:20:00Z",
    successful: false,
    reason: "Missing required permissions"
  },
  {
    id: "log5",
    user_name: "Dr. Martinez",
    user_role: "admin",
    record_type: "sel_progress",
    access_type: "export",
    student_name: "Multiple Students",
    timestamp: "2024-04-21T09:15:00Z",
    successful: true
  }
];

interface FERPAAuditLogsProps {
  className?: string;
}

export function FERPAAuditLogs({ className }: FERPAAuditLogsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recordType, setRecordType] = useState<string>("");
  const [accessType, setAccessType] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Filter logic
  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = 
      searchQuery === "" || 
      log.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.student_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRecordType = recordType === "" || log.record_type === recordType;
    const matchesAccessType = accessType === "" || log.access_type === accessType;
    
    const logDate = new Date(log.timestamp);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;
    
    const matchesDateFrom = !fromDate || logDate >= fromDate;
    const matchesDateTo = !toDate || logDate <= toDate;
    
    return matchesSearch && matchesRecordType && matchesAccessType && matchesDateFrom && matchesDateTo;
  });

  const handleExport = () => {
    console.log("Exporting filtered logs:", filteredLogs);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>FERPA Audit Logs</CardTitle>
        <CardDescription>
          Track and monitor all data access in compliance with FERPA regulations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by user or student name..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Record Type</Label>
              <Select value={recordType} onValueChange={setRecordType}>
                <SelectTrigger>
                  <SelectValue placeholder="All records" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All records</SelectItem>
                  <SelectItem value="student_record">Student Records</SelectItem>
                  <SelectItem value="mood_data">Mood Data</SelectItem>
                  <SelectItem value="intervention">Interventions</SelectItem>
                  <SelectItem value="sel_progress">SEL Progress</SelectItem>
                  <SelectItem value="consent">Consent Records</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Access Type</Label>
              <Select value={accessType} onValueChange={setAccessType}>
                <SelectTrigger>
                  <SelectValue placeholder="All access types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All access types</SelectItem>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>From Date</Label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="date" 
                  className="pl-8"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>To Date</Label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="date" 
                  className="pl-8"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Results table */}
        <div className="rounded-md border mt-4">
          <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Timestamp</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">User</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Role</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Student</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Record Type</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Access Type</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="p-4 align-middle font-medium">{log.user_name}</td>
                    <td className="p-4 align-middle capitalize">{log.user_role}</td>
                    <td className="p-4 align-middle">{log.student_name}</td>
                    <td className="p-4 align-middle capitalize">{log.record_type.replace('_', ' ')}</td>
                    <td className="p-4 align-middle capitalize">{log.access_type}</td>
                    <td className="p-4 align-middle">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        log.successful ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {log.successful ? 'Success' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredLogs.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-muted-foreground">No audit logs match your filters.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          <p>This audit log is maintained in compliance with FERPA regulations and is used to monitor and track all access to student educational records.</p>
        </div>
      </CardContent>
    </Card>
  );
}
