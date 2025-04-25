
import React, { useState } from "react";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudentInfoCard } from "./StudentInfoCard";
import { StudentInterventions } from "./StudentInterventions";

interface Student {
  id: string;
  name: string;
  photoUrl: string | null;
  grade: string;
  class: string;
  teacher: string;
  status: "at_risk" | "concerning" | "stable";
  confidenceScore: number;
  moodTrend: string;
  absences: number;
  tardies: number;
  behaviorReports: number;
  currentInterventions: string[];
}

interface HeatmapGridProps {
  students: Student[];
  view: "class" | "grade" | "school";
}

export const HeatmapGrid: React.FC<HeatmapGridProps> = ({ 
  students,
  view
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  if (students.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">
          No students match your search criteria
        </p>
      </div>
    );
  }

  // Group students based on view
  const groupStudents = () => {
    if (view === "class") {
      // Group by class
      const groups: Record<string, Student[]> = {};
      students.forEach(student => {
        if (!groups[student.class]) {
          groups[student.class] = [];
        }
        groups[student.class].push(student);
      });
      return groups;
    } else if (view === "grade") {
      // Group by grade
      const groups: Record<string, Student[]> = {};
      students.forEach(student => {
        if (!groups[student.grade]) {
          groups[student.grade] = [];
        }
        groups[student.grade].push(student);
      });
      return groups;
    } else {
      // School view - don't group, just return all students
      return { "All Students": students };
    }
  };

  const groupedStudents = groupStudents();
  
  const getStatusColor = (status: "at_risk" | "concerning" | "stable") => {
    switch (status) {
      case "at_risk":
        return "bg-red-500 hover:bg-red-600";
      case "concerning":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "stable":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  const getStatusLabel = (status: "at_risk" | "concerning" | "stable") => {
    switch (status) {
      case "at_risk":
        return "At Risk";
      case "concerning":
        return "Concerning";
      case "stable":
        return "Stable";
      default:
        return "Unknown";
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedStudents).map(([groupName, groupStudents]) => (
        <div key={groupName} className="space-y-4">
          <h3 className="text-xl font-medium">{groupName}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {groupStudents.map(student => (
              <Dialog key={student.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="cursor-pointer hover:shadow transition-shadow overflow-hidden"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className={`h-1 w-full ${getStatusColor(student.status)}`} />
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-3 ${getStatusColor(student.status)}`}>
                          {student.photoUrl ? (
                            <img 
                              src={student.photoUrl} 
                              alt={student.name} 
                              className="h-full w-full object-cover rounded-full"
                            />
                          ) : (
                            getInitials(student.name)
                          )}
                        </div>
                        <h4 className="font-medium text-sm mb-1">{student.name}</h4>
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="text-xs">
                            {getStatusLabel(student.status)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Student Details</DialogTitle>
                    <DialogDescription>
                      View details and manage interventions
                    </DialogDescription>
                  </DialogHeader>
                  {student && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <StudentInfoCard student={student} />
                      <StudentInterventions student={student} />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
