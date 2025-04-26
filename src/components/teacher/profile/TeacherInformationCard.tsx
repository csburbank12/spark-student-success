
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTeacherInfo } from "@/hooks/useTeacherInfo";

const TeacherInformationCard = () => {
  const { teacherInfo, isLoading } = useTeacherInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              <div className="font-medium">{teacherInfo?.position}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Department</div>
              <div className="font-medium">{teacherInfo?.department}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">School</div>
              <div className="font-medium">{teacherInfo?.school}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Employee ID</div>
              <div className="font-medium">{teacherInfo?.employeeId}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherInformationCard;
