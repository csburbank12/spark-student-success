
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TeacherClassesCard: React.FC = () => {
  const classes = [
    { 
      id: "class1", 
      name: "Math 101", 
      grade: "9th Grade", 
      students: 24,
      alertCount: 2, 
      avgMood: "Good"
    },
    { 
      id: "class2", 
      name: "Math 202", 
      grade: "10th Grade", 
      students: 22,
      alertCount: 1, 
      avgMood: "Okay" 
    },
    { 
      id: "class3", 
      name: "Math 303", 
      grade: "11th Grade", 
      students: 18,
      alertCount: 0, 
      avgMood: "Good" 
    }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">My Classes</CardTitle>
        <Button variant="outline" size="sm">Add Class</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Grade Level</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Avg Mood</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell className="font-medium">{classItem.name}</TableCell>
                <TableCell>{classItem.grade}</TableCell>
                <TableCell>{classItem.students}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    classItem.avgMood === "Good" 
                      ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700" 
                      : "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                  }>
                    {classItem.avgMood}
                  </Badge>
                </TableCell>
                <TableCell>
                  {classItem.alertCount > 0 ? (
                    <Badge variant="destructive">{classItem.alertCount}</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-muted">0</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TeacherClassesCard;
