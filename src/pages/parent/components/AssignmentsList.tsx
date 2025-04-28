
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, File, FileText } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "completed" | "in-progress" | "not-started" | "overdue";
  type: string;
}

interface AssignmentsListProps {
  assignments: Assignment[];
  childName?: string;
}

export const AssignmentsList: React.FC<AssignmentsListProps> = ({
  assignments,
  childName = "Your child",
}) => {
  // Helper function to get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "in-progress":
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          In Progress
        </Badge>;
      case "overdue":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Overdue
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <File className="h-3 w-3" />
            Not Started
          </Badge>
        );
    }
  };

  // Format due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {childName}'s Assignments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {assignments.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <p className="mt-2 text-muted-foreground">No assignments found</p>
          </div>
        ) : (
          <ul className="divide-y">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {assignment.subject} • {assignment.type}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        Due {formatDueDate(assignment.dueDate)}
                      </span>
                      {getStatusBadge(assignment.status)}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentsList;
