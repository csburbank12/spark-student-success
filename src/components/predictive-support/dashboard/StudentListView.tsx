
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { Student } from "../PredictiveSupportEngine";

interface StudentListViewProps {
  students: Student[];
  filteredStudents: Student[];
  onStudentSelect: (student: Student) => void;
}

const StudentListView: React.FC<StudentListViewProps> = ({
  students,
  filteredStudents,
  onStudentSelect,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Students Requiring Support</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {filteredStudents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No students match your filters</p>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
              onClick={() => onStudentSelect(student)}
            >
              <div className="space-y-2 md:space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{student.name}</h3>
                  <Badge variant="outline">Grade {student.grade}</Badge>
                  {student.riskTrend === "up" && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Increasing Risk
                    </Badge>
                  )}
                  {student.riskTrend === "down" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" /> Decreasing Risk
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Risk Factors: </span>
                  <span>{student.riskFactors.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Updated: {student.lastUpdated}</span>
                </div>
              </div>
              <div className="flex flex-col items-center mt-4 md:mt-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold">{student.riskScore}</span>
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                </div>
                <div className="w-full max-w-[120px] mt-1">
                  <Progress
                    value={student.riskScore}
                    className={
                      student.riskScore >= 75
                        ? "bg-red-200"
                        : student.riskScore >= 50
                        ? "bg-amber-200"
                        : "bg-green-200"
                    }
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </CardContent>
    <CardFooter className="flex justify-center border-t p-4">
      <Button variant="outline">View All Students</Button>
    </CardFooter>
  </Card>
);

export default StudentListView;
