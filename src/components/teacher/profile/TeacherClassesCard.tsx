
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClassItemProps {
  title: string;
  students: number;
  room: string;
  time: string;
}

const ClassItem: React.FC<ClassItemProps> = ({ title, students, room, time }) => (
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
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Classes</CardTitle>
        <CardDescription>Students and class information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <ClassItem
            title="Period 1: Social Studies"
            students={28}
            room="Room 203"
            time="8:30-9:20am"
          />
          <ClassItem
            title="Period 3: Homeroom"
            students={24}
            room="Room 203"
            time="10:15-11:00am"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherClassesCard;
