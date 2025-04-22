
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  due_date: string;
  status: string;
  subject: string;
  priority: string;
}

interface AssignmentsListProps {
  assignments: Assignment[];
}

export const AssignmentsList: React.FC<AssignmentsListProps> = ({ assignments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map(assignment => (
            <div key={assignment.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{assignment.title}</h3>
                <Badge 
                  variant={
                    assignment.priority === "High" ? "destructive" : 
                    assignment.priority === "Medium" ? "default" : 
                    "outline"
                  }
                >
                  {assignment.priority}
                </Badge>
              </div>
              <p className="text-sm mb-2">Subject: {assignment.subject}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Due: {assignment.due_date}
                </div>
                <Badge variant={
                  assignment.status === "Not Started" ? "outline" : 
                  assignment.status === "In Progress" ? "secondary" : 
                  "warning"
                }>
                  {assignment.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentsList;
