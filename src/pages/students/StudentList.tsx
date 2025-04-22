
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, MessageCircle, Calendar, BarChart } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  full_name: string;
  email: string;
  grade_level?: string;
  role: string;
}

interface StudentListProps {
  students: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  // In a real application, these would be derived from actual data
  const getRiskLevel = (student: Student) => {
    const score = Math.random();
    if (score > 0.8) return "high";
    if (score > 0.6) return "medium";
    return "low";
  };
  
  const getLastCheckIn = (student: Student) => {
    const days = Math.floor(Math.random() * 10);
    return days === 0 ? "Today" : `${days} days ago`;
  };

  return (
    <div className="grid gap-4">
      {students.length === 0 ? (
        <div className="text-center p-8 text-muted-foreground">
          No students found matching your criteria.
        </div>
      ) : (
        students.map((student) => {
          const riskLevel = getRiskLevel(student);
          const lastCheckIn = getLastCheckIn(student);
          
          return (
            <Card key={student.id} className="hover:bg-accent/5">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {student.full_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{student.full_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.grade_level || "Grade not set"} • {student.email}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center flex-wrap gap-2 ml-0 md:ml-auto">
                    <div className="flex items-center mr-4">
                      <Badge variant={
                        riskLevel === "high" ? "destructive" : 
                        riskLevel === "medium" ? "warning" :
                        "outline"
                      }>
                        {riskLevel === "high" ? "High Risk" : 
                         riskLevel === "medium" ? "Medium Risk" : 
                         "Low Risk"}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mr-4">
                      <Calendar className="h-3 w-3" />
                      Last check-in: {lastCheckIn}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <BarChart className="h-4 w-4 mr-1" /> View Data
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" /> Message
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Create Support Plan</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                          <DropdownMenuItem>Add to Group</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default StudentList;
