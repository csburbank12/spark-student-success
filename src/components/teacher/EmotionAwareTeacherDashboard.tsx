
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Calendar, Clock } from "lucide-react";
import { TimeSlot } from "@/hooks/useEmotionScheduler";
import EmotionSchedulingUI from "@/components/emotion-scheduling/EmotionSchedulingUI";

// Mock student data
const students = [
  { id: "1", name: "Alex Johnson", grade: "8" },
  { id: "2", name: "Jamie Smith", grade: "7" },
  { id: "3", name: "Casey Williams", grade: "8" }
];

const EmotionAwareTeacherDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>("1");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([
    {
      day: "Monday",
      timeRange: "9:00 AM - 11:00 AM",
      confidence: 0.85,
      reason: "High energy and focus observed"
    },
    {
      day: "Wednesday",
      timeRange: "1:00 PM - 3:00 PM",
      confidence: 0.75,
      reason: "Consistent emotional stability"
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emotion-Aware Scheduling</h1>
          <p className="text-muted-foreground">Optimize learning based on student emotional patterns.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Export Schedule
          </Button>
          <Button size="sm">
            <Brain className="mr-2 h-4 w-4" />
            Create Learning Plan
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {students.map((student) => (
                <Button
                  key={student.id}
                  variant={selectedStudent === student.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedStudent(student.id)}
                >
                  {student.name}
                  <Badge variant="outline" className="ml-auto">
                    Grade {student.grade}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-9 space-y-6">
          <Tabs defaultValue="analysis">
            <TabsList>
              <TabsTrigger value="analysis">Student Analysis</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis" className="space-y-6">
              {selectedStudent && (
                <EmotionSchedulingUI studentId={selectedStudent} />
              )}
            </TabsContent>
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Schedule based on optimal learning times for selected students.</p>
                  <div className="mt-4 space-y-3">
                    {selectedTimeSlots.map((slot, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <div className="font-medium">{slot.day}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {slot.timeRange}
                          </div>
                        </div>
                        <Badge variant="outline">{Math.round(slot.confidence * 100)}% optimal</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>View past schedules and performance outcomes.</p>
                  <div className="h-60 flex items-center justify-center border rounded-md mt-4">
                    <p className="text-muted-foreground">No history available yet</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmotionAwareTeacherDashboard;
