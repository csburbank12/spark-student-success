
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMoodCheckIns, useMoodTrends } from "@/hooks/useMoodCheckIns";
import { useTeacherMoodCheckIns, useTeacherMoodTrends } from "@/hooks/useTeacherMoodCheckIns";
import { MoodTracker } from "@/components/student/MoodTracker";
import TeacherMoodTracker from "@/components/teacher/TeacherMoodTracker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MoodTabsChart from "./check-in/MoodTabsChart";
import CheckInList from "./check-in/CheckInList";
import MoodComparisonChart from "@/components/mood-tracking/MoodComparisonChart";
import { Link } from "react-router-dom";
import { ArrowLeft, History } from "lucide-react";

const CheckIn = () => {
  const { user } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(user?.id || '');
  const [selectedStudentName, setSelectedStudentName] = useState<string>("Current Student");

  // Student mood data
  const { data: checkIns = [], isLoading: isCheckInsLoading } = useMoodCheckIns(selectedStudentId, 14);
  const { data: studentMoodTrends = [], isLoading: isStudentMoodLoading } = useMoodTrends(selectedStudentId, 7);
  
  // Teacher mood data
  const { checkIns: teacherCheckIns = [], isLoading: isTeacherCheckInsLoading } = useTeacherMoodCheckIns(selectedStudentId, 14);
  const { data: teacherMoodTrends = [], isLoading: isTeacherMoodLoading } = useTeacherMoodTrends(selectedStudentId, 7);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h2 className="text-3xl font-heading font-bold">Daily Check-In</h2>
        </div>
        <Button variant="outline">
          <History className="h-4 w-4 mr-2" />
          Check-In History
        </Button>
      </div>
      
      <Tabs defaultValue="student" className="space-y-6">
        <TabsList>
          <TabsTrigger value="student">Student Self-Report</TabsTrigger>
          <TabsTrigger value="teacher">Teacher Perception</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <MoodTracker />
            <MoodTabsChart moodTrends={studentMoodTrends} />
          </div>
          <CheckInList checkIns={checkIns} isLoading={isCheckInsLoading} />
        </TabsContent>
        
        <TabsContent value="teacher" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <TeacherMoodTracker 
              studentId={selectedStudentId} 
              studentName={selectedStudentName} 
            />
            <Card>
              <CardHeader>
                <CardTitle>Teacher's Perception History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isTeacherCheckInsLoading ? (
                    <p className="text-center text-muted-foreground">Loading check-ins...</p>
                  ) : teacherCheckIns.length === 0 ? (
                    <p className="text-center text-muted-foreground">No teacher check-ins recorded yet.</p>
                  ) : (
                    teacherCheckIns.map((checkIn: any) => (
                      <div key={checkIn.id} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">{checkIn.mood_type.charAt(0).toUpperCase() + checkIn.mood_type.slice(1)}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(checkIn.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm mt-1">Energy Level: {checkIn.energy_level}/10</div>
                        {checkIn.notes && <p className="mt-2 text-sm">{checkIn.notes}</p>}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <MoodComparisonChart 
            studentMoods={studentMoodTrends} 
            teacherMoods={teacherMoodTrends}
            isLoading={isStudentMoodLoading || isTeacherMoodLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CheckIn;
