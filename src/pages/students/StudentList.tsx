
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ArrowUp, 
  ArrowDown,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const students = [
  {
    id: "1",
    name: "Alex Johnson",
    grade: "9",
    riskLevel: "high",
    lastCheckIn: "2023-04-10T09:45:00",
    status: "needs_attention"
  },
  {
    id: "2",
    name: "Emma Martinez",
    grade: "10",
    riskLevel: "low",
    lastCheckIn: "2023-04-10T08:30:00",
    status: "on_track"
  },
  {
    id: "3",
    name: "Tyler Smith",
    grade: "9",
    riskLevel: "medium",
    lastCheckIn: "2023-04-09T14:20:00",
    status: "review"
  },
  {
    id: "4",
    name: "Olivia Davis",
    grade: "11",
    riskLevel: "low",
    lastCheckIn: "2023-04-10T10:15:00",
    status: "on_track"
  },
  {
    id: "5",
    name: "Ethan Brown",
    grade: "9",
    riskLevel: "high",
    lastCheckIn: "2023-04-08T11:50:00",
    status: "needs_attention"
  }
];

const StudentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort students based on sort field and direction
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Helper to handle sort toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Helper to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "needs_attention":
        return <Badge variant="destructive">Needs Attention</Badge>;
      case "review":
        return <Badge variant="secondary">Review</Badge>; // Changed from "warning" to "secondary"
      case "on_track":
        return <Badge variant="success">On Track</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Students</DropdownMenuItem>
              <DropdownMenuItem>High Risk Only</DropdownMenuItem>
              <DropdownMenuItem>9th Grade</DropdownMenuItem>
              <DropdownMenuItem>10th Grade</DropdownMenuItem>
              <DropdownMenuItem>11th Grade</DropdownMenuItem>
              <DropdownMenuItem>12th Grade</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">
            <User className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                  <div className="flex items-center">
                    Name
                    {sortField === "name" && (
                      sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("grade")} className="cursor-pointer">
                  <div className="flex items-center">
                    Grade
                    {sortField === "grade" && (
                      sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("riskLevel")} className="cursor-pointer">
                  <div className="flex items-center">
                    Risk Level
                    {sortField === "riskLevel" && (
                      sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("lastCheckIn")} className="cursor-pointer">
                  <div className="flex items-center">
                    Last Check-In
                    {sortField === "lastCheckIn" && (
                      sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No students found matching your search criteria
                  </TableCell>
                </TableRow>
              ) : (
                sortedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>
                      {student.riskLevel === "high" ? (
                        <div className="flex items-center">
                          <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                          <span>High</span>
                        </div>
                      ) : student.riskLevel === "medium" ? (
                        <div className="flex items-center">
                          <AlertCircle className="mr-1 h-4 w-4 text-amber-500" />
                          <span>Medium</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          <span>Low</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(student.lastCheckIn)}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
