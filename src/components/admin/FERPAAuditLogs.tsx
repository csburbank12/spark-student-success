
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileDown, Calendar, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

// Types
export type FERPAAccessType = "view" | "edit" | "delete" | "create" | "export";
export type FERPARecordType = "student_record" | "mood_data" | "intervention" | "sel_progress" | "consent";

// Mock data
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
  },
  {
    id: "log6",
    user_name: "Ms. Johnson",
    user_role: "teacher",
    record_type: "student_record",
    access_type: "edit",
    student_name: "James Wilson",
    timestamp: "2024-04-20T13:45:00Z",
    successful: true
  },
  {
    id: "log7",
    user_name: "Admin User",
    user_role: "admin",
    record_type: "consent",
    access_type: "view",
    student_name: "Various Students",
    timestamp: "2024-04-20T10:30:00Z",
    successful: true
  },
  {
    id: "log8",
    user_name: "Ms. Thompson",
    user_role: "teacher",
    record_type: "sel_progress",
    access_type: "view",
    student_name: "Emily Davis",
    timestamp: "2024-04-19T14:15:00Z",
    successful: true
  }
];

interface FERPAAuditLogsProps {
  className?: string;
}

export function FERPAAuditLogs({ className }: FERPAAuditLogsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recordType, setRecordType] = useState<string>("all"); // Changed from empty string to "all"
  const [accessType, setAccessType] = useState<string>("all"); // Changed from empty string to "all"
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("all"); // Changed from empty string to "all"
  const [status, setStatus] = useState<string>("all"); // Changed from empty string to "all"

  // Filter logic
  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = 
      searchQuery === "" || 
      log.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.student_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRecordType = recordType === "all" || log.record_type === recordType;
    const matchesAccessType = accessType === "all" || log.access_type === accessType;
    const matchesUserRole = userRole === "all" || log.user_role === userRole;
    const matchesStatus = status === "all" || 
      (status === "success" && log.successful) ||
      (status === "failure" && !log.successful);
    
    const logDate = new Date(log.timestamp);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;
    
    const matchesDateFrom = !fromDate || logDate >= fromDate;
    const matchesDateTo = !toDate || logDate <= toDate;
    
    return matchesSearch && 
           matchesRecordType && 
           matchesAccessType && 
           matchesDateFrom && 
           matchesDateTo && 
           matchesUserRole && 
           matchesStatus;
  });

  const handleExport = () => {
    console.log("Exporting filtered logs:", filteredLogs);
    // Implement actual export functionality here
  };

  const resetFilters = () => {
    setSearchQuery("");
    setRecordType("all");
    setAccessType("all");
    setDateFrom("");
    setDateTo("");
    setUserRole("all");
    setStatus("all");
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>FERPA Audit Logs</CardTitle>
            <CardDescription>
              Track and monitor all data access in compliance with FERPA regulations
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="space-y-2 mb-3">
                    <Label>User Role</Label>
                    <Select value={userRole} onValueChange={setUserRole}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="failure">Failure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    className="w-full mt-2" 
                    onClick={resetFilters}
                  >
                    Reset All Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by user or student name..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Record Type</Label>
              <Select value={recordType} onValueChange={setRecordType}>
                <SelectTrigger>
                  <SelectValue placeholder="All records" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All records</SelectItem>
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
                  <SelectItem value="all">All access types</SelectItem>
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
                      {formatDate(log.timestamp)}
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
          <p className="mt-1">Log retention period: 1 year</p>
        </div>
      </CardContent>
    </Card>
  );
}
