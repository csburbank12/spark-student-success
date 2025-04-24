
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Student } from './PredictiveSupportEngine';

interface StudentRiskListProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
  searchQuery?: string;
}

const StudentRiskList: React.FC<StudentRiskListProps> = ({
  students,
  onStudentSelect,
  searchQuery = "",
}) => {
  const filteredStudents = searchQuery 
    ? students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : students;
    
  // Get risk severity class
  const getRiskClass = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'critical':
        return 'bg-red-100 border-red-300 dark:bg-red-950 dark:border-red-800';
      case 'at_risk':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800';
      default:
        return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
    }
  };
  
  return (
    <div className="space-y-4">
      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No students match your criteria
          </CardContent>
        </Card>
      )}
      
      {filteredStudents.map(student => (
        <Card 
          key={student.id}
          className={`transition-all hover:shadow cursor-pointer ${getRiskClass(student.riskLevel)}`}
          onClick={() => onStudentSelect(student)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{student.name}</h3>
                <div className="text-sm text-muted-foreground">Grade {student.grade}</div>
                <div className="mt-1.5 text-sm">
                  {student.primaryConcern && (
                    <span className="bg-background px-2 py-0.5 rounded text-xs">
                      {student.primaryConcern}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  {student.riskLevel === 'critical' && (
                    <span className="font-medium text-red-600 dark:text-red-400">Critical</span>
                  )}
                  {student.riskLevel === 'at_risk' && (
                    <span className="font-medium text-amber-600 dark:text-amber-400">At Risk</span>
                  )}
                  {student.riskLevel === 'stable' && (
                    <span className="font-medium text-green-600 dark:text-green-400">Stable</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Last updated: {student.lastUpdated || 'Unknown'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentRiskList;
