
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, UserPlus } from "lucide-react";

interface StudentListProps {
  students: Array<{
    id: string;
    full_name: string;
    email: string;
    grade_level?: string;
    age_group?: string;
    role?: string;
    school_id?: string;
    created_at?: string;
    [key: string]: any;
  }>;
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  if (!students.length) {
    return (
      <div className="text-center p-12 border rounded-lg bg-muted/10">
        <h3 className="text-lg font-medium mb-2">No students found</h3>
        <p className="text-muted-foreground mb-4">
          No students match your current filters or search criteria.
        </p>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {student.full_name?.charAt(0) || "S"}
                  </div>
                  <span>{student.full_name}</span>
                </div>
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.grade_level || "N/A"}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">Active</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/students/${student.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentList;
