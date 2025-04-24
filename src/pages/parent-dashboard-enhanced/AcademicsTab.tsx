
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AcademicsTabProps {
  selectedChildData: any;
}

const AcademicsTab: React.FC<AcademicsTabProps> = ({ selectedChildData }) => {
  const navigate = useNavigate();

  // Mock grades data
  const gradesData = [
    { subject: "Math", grade: "B+", score: 87 },
    { subject: "English", grade: "A", score: 94 },
    { subject: "Science", grade: "A-", score: 92 },
    { subject: "History", grade: "B", score: 85 },
    { subject: "Art", grade: "A-", score: 91 },
  ];

  // Mock assignments data
  const assignmentData = [
    { title: "Math Quiz", due: "Apr 28", status: "Pending" },
    { title: "English Essay", due: "Apr 30", status: "Pending" },
    { title: "Science Project", due: "May 5", status: "Pending" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Current Grades</CardTitle>
          <CardDescription>Academic performance by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gradesData.map((subject, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <p>{subject.subject}</p>
                  <p className="font-semibold">{subject.grade}</p>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div
                    className={`h-2 rounded-full ${
                      subject.score >= 90 ? "bg-green-500" : 
                      subject.score >= 80 ? "bg-blue-500" : 
                      subject.score >= 70 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate(`/child-activity?child=${selectedChildData.id}&tab=grades`)}
            >
              View Detailed Grade Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Assignments</CardTitle>
          <CardDescription>Due dates and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {assignmentData.map((assignment, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">Due {assignment.due}</p>
                  </div>
                  <span className="text-amber-500 text-sm">{assignment.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/child-activity?child=${selectedChildData.id}&tab=assignments`)}
            >
              View All Assignments
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicsTab;
