
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentCard } from "@/components/teacher/StudentCard";
import { Clipboard, BarChart, Calendar } from "lucide-react";

interface TeacherDashboardTabsProps {
  students: any[];
  onStudentClick: (student: any) => void;
}

export const TeacherDashboardTabs: React.FC<TeacherDashboardTabsProps> = ({
  students,
  onStudentClick,
}) => (
  <Tabs defaultValue="at-risk">
    <TabsList>
      <TabsTrigger value="at-risk">At-Risk Students</TabsTrigger>
      <TabsTrigger value="interventions">Active Interventions</TabsTrigger>
      <TabsTrigger value="resources">Resources</TabsTrigger>
    </TabsList>
    <TabsContent value="at-risk" className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Students Requiring Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {students
              .filter((s: any) => s.alerts > 0)
              .map((student: any) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => onStudentClick(student)}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="interventions">
      <Card>
        <CardHeader>
          <CardTitle>Current Interventions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            View and track all active interventions here.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="resources">
      <Card>
        <CardHeader>
          <CardTitle>Teacher Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Access evidence-based interventions and resources.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);
