
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Student } from "@/components/predictive-support/PredictiveSupportEngine";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Calendar, Clock, BookOpen, ChevronRight, ChevronsUpDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { StudentSELSupportToolkit } from "./StudentSELSupportToolkit";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StudentInterventionViewProps {
  studentId?: string;
  studentName?: string;
  onBack?: () => void;
}

const StudentInterventionView: React.FC<StudentInterventionViewProps> = ({ 
  studentId: propStudentId, 
  studentName: propStudentName,
  onBack 
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const studentId = propStudentId || params.studentId;
  
  // Fetch student information
  const { data: student, isLoading } = useQuery({
    queryKey: ["student", studentId],
    queryFn: async () => {
      if (!studentId) return null;
      
      // This would be a real data fetch from the database
      // For now using mock data
      const mockStudent = {
        id: studentId,
        name: propStudentName || "Alex Johnson",
        grade: "10th Grade",
        riskScore: 35,
        riskTrend: "down" as const,
        recentMood: "tired",
        lastCheckIn: "Today, 8:15 AM",
        interventions: [
          { 
            id: "int1", 
            name: "Scheduled Check-in", 
            date: "Mar 15, 2025",
            status: "completed"
          },
          { 
            id: "int2", 
            name: "SEL Lesson: Stress Management", 
            date: "Mar 22, 2025",
            status: "in-progress"
          }
        ],
        selProgress: {
          completedLessons: 3,
          assignedLessons: 5,
          recentLesson: {
            title: "Understanding Emotions",
            date: "Mar 18, 2025",
            progress: 60
          }
        }
      };
      
      return mockStudent;
    },
    enabled: !!studentId,
  });
  
  // Fetch mood check-ins for the student
  const { data: moodData, isLoading: isLoadingMoodData } = useQuery({
    queryKey: ["student-mood", studentId],
    queryFn: async () => {
      if (!studentId) return null;
      
      // This would be a real data fetch from the database
      // For now using mock data
      const mockMoodData = [
        { date: "2025-03-22", mood: "tired", energy: 4, notes: "Didn't sleep well" },
        { date: "2025-03-21", mood: "anxious", energy: 5, notes: "Worried about test" },
        { date: "2025-03-20", mood: "happy", energy: 8, notes: "Great day" },
        { date: "2025-03-19", mood: "okay", energy: 6, notes: "" },
        { date: "2025-03-18", mood: "sad", energy: 3, notes: "Argument with friend" },
      ];
      
      return mockMoodData;
    },
    enabled: !!studentId,
  });
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  if (isLoading || !student) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-heading font-bold">{student.name}</h2>
        <Badge>{student.grade}</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
            <CardDescription>
              Last checked in {student.lastCheckIn}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingMoodData ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : (
              <>
                {moodData?.slice(0, 3).map((entry, index) => (
                  <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={
                            entry.mood === "happy" ? "bg-green-100 text-green-800" :
                            entry.mood === "tired" ? "bg-purple-100 text-purple-800" :
                            entry.mood === "anxious" ? "bg-yellow-100 text-yellow-800" :
                            entry.mood === "sad" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }
                        >
                          {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Energy: {entry.energy}/10
                        </span>
                      </div>
                      {entry.notes && (
                        <p className="text-sm mt-1">{entry.notes}</p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(entry.date), "MMM d")}
                    </span>
                  </div>
                ))}
                
                <Button variant="link" className="px-0 w-full justify-start">
                  View full history <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>SEL Progress</CardTitle>
            <CardDescription>
              {student.selProgress.completedLessons} of {student.selProgress.assignedLessons} lessons completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress 
              value={Math.round((student.selProgress.completedLessons / student.selProgress.assignedLessons) * 100)} 
              className="h-2"
            />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Current Lesson</h4>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium truncate mr-2">
                      {student.selProgress.recentLesson.title}
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      <Clock className="h-3 w-3 mr-1" />
                      {student.selProgress.recentLesson.date}
                    </Badge>
                  </div>
                  <Progress 
                    value={student.selProgress.recentLesson.progress} 
                    className="h-1.5 mt-2"
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      {student.selProgress.recentLesson.progress}% complete
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button variant="outline" className="w-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Manage SEL Lessons
            </Button>
          </CardContent>
        </Card>
        
        <StudentSELSupportToolkit 
          studentId={studentId} 
          studentName={student.name}
          recentMood={student.recentMood}
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="notes">Notes & Observations</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
              <CardDescription>
                Complete student information and statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-40 text-muted-foreground">
              Student overview data will be displayed here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interventions" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Active Interventions</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Intervention
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.interventions.map((intervention) => (
                      <Card key={intervention.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{intervention.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {intervention.date}
                                </span>
                              </div>
                            </div>
                            <Badge 
                              className={
                                intervention.status === "completed" ? "bg-green-100 text-green-800" :
                                intervention.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                                "bg-gray-100 text-gray-800"
                              }
                            >
                              {intervention.status.charAt(0).toUpperCase() + intervention.status.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Intervention History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center h-40 text-muted-foreground">
                  Intervention history will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="flex justify-center items-center h-64 text-muted-foreground">
              Teacher notes and observations will be displayed here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="communications" className="mt-4">
          <Card>
            <CardContent className="flex justify-center items-center h-64 text-muted-foreground">
              Communications history will be displayed here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentInterventionView;
