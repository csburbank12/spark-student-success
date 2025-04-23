
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";

interface SELCompletedLessonsTableProps {
  lessons: Array<{
    id: string;
    completed_at: string;
    sel_lessons: {
      id: string;
      title: string;
      pathway: string;
      duration: number;
    };
  }>;
}

const SELCompletedLessonsTable: React.FC<SELCompletedLessonsTableProps> = ({ lessons }) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).format(date);
  };
  
  // Get pathway color
  const getPathwayColor = (pathway: string) => {
    switch (pathway?.toLowerCase()) {
      case 'anxiety':
        return "bg-blue-100 text-blue-800";
      case 'focus':
        return "bg-green-100 text-green-800";
      case 'social':
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  if (!lessons.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
          <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Completed Lessons Yet</h3>
          <p className="text-muted-foreground">
            Lessons you complete will appear here to track your progress.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Lessons</CardTitle>
        <CardDescription>
          Track your SEL learning progress over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson</TableHead>
              <TableHead>Pathway</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Completed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.sel_lessons.title}</TableCell>
                <TableCell>
                  <Badge className={getPathwayColor(item.sel_lessons.pathway)}>
                    {item.sel_lessons.pathway}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{item.sel_lessons.duration} min</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(item.completed_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SELCompletedLessonsTable;
