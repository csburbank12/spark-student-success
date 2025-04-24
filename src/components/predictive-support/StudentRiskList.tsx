
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { Student } from "./PredictiveSupportEngine";

interface StudentRiskListProps {
  students: Student[];
  onAnalyze: (studentId: string) => void;
}

const StudentRiskList: React.FC<StudentRiskListProps> = ({ students, onAnalyze }) => {
  const getRiskBadgeClasses = (riskLevel: string) => {
    switch(riskLevel) {
      case 'high':
        return "bg-red-100 text-red-800";
      case 'medium':
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="space-y-4">
      {students.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <p className="text-muted-foreground">No students found matching the criteria.</p>
          </CardContent>
        </Card>
      ) : (
        students.map((student) => (
          <Card key={student.id} className={student.riskLevel === 'high' ? "border-red-300" : ""}>
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {student.riskLevel === 'high' && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>Grade {student.grade}</span>
                      <span>•</span>
                      <span>Last Check-in: {student.lastCheckIn}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:ml-auto">
                  <Badge className={getRiskBadgeClasses(student.riskLevel)}>
                    {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk ({student.riskScore})
                  </Badge>
                  
                  {student.primaryConcern && (
                    <Badge variant="outline">
                      {student.primaryConcern}
                    </Badge>
                  )}
                  
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button size="sm" onClick={() => onAnalyze(student.id)}>Analyze</Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default StudentRiskList;
