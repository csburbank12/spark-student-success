
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TeacherInfoProps {
  position?: string;
  department?: string;
  school?: string;
  employeeId?: string;
}

const TeacherInformationCard: React.FC<TeacherInfoProps> = ({
  position = "Lead Teacher",
  department = "Social Studies",
  school = "Westfield High",
  employeeId = "T-5391"
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Teacher Information</CardTitle>
        <CardDescription>Your professional details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Position</div>
              <div className="font-medium">{position}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Department</div>
              <div className="font-medium">{department}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">School</div>
              <div className="font-medium">{school}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Employee ID</div>
              <div className="font-medium">{employeeId}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherInformationCard;
