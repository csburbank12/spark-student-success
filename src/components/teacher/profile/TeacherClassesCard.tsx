
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTeacherClasses, TeacherClass } from "@/hooks/useTeacherClasses";

const ClassItem: React.FC<TeacherClass> = ({ title, students, room, time }) => (
  <div className="border rounded-lg overflow-hidden">
    <div className="bg-muted p-3 font-medium">{title}</div>
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Class Details</div>
          <div className="text-sm text-muted-foreground">
            {students} students • {room} • {time}
          </div>
        </div>
        <Button size="sm">View Class</Button>
      </div>
    </div>
  </div>
);

const TeacherClassesCard = () => {
  const { classes, isLoading } = useTeacherClasses();

  if (isLoading) {
    return <div>Loading classes...</div>;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Classes</CardTitle>
        <CardDescription>Students and class information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {classes?.map((classItem, index) => (
            <ClassItem key={index} {...classItem} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherClassesCard;
