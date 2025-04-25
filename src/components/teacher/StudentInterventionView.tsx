
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WellLensAISummaryCard } from "@/components/welllens/WellLensAISummaryCard";
import { StudentSELSupportToolkit } from "@/components/teacher/StudentSELSupportToolkit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface StudentInterventionViewProps {
  studentId: string;
  studentName: string;
  onBack: () => void;
}

const StudentInterventionView: React.FC<StudentInterventionViewProps> = ({
  studentId,
  studentName,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch student data - Mock data for now
  const { data: studentData, isLoading } = useQuery({
    queryKey: ["student", studentId],
    queryFn: async () => {
      // In a real app, this would be a call to Supabase
      // For now, return mock data
      return {
        id: studentId,
        name: studentName,
        grade: "9th",
        recentMood: "tired",
        moodTrend: "declining",
        selCompletionRate: 75,
        lastCheckIn: "2 days ago",
        flagged: true,
        flagReason: "Declining mood pattern over past 2 weeks",
        confidenceScore: 78,
        recommendedAction: "Schedule a one-on-one check-in conversation"
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h2 className="text-3xl font-bold">{studentName}</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sel">SEL Progress</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <WellLensAISummaryCard
                entityName={studentName}
                entityType="student"
                flagged={studentData?.flagged || false}
                confidenceScore={studentData?.confidenceScore || 0}
                primaryReason={studentData?.flagReason}
                recommendedAction={studentData?.recommendedAction}
                trends={`${studentData?.name} has shown a ${studentData?.moodTrend} mood pattern over the past two weeks with inconsistent check-ins.`}
                onViewDetails={() => setActiveTab("history")}
              />
              
              <StudentSELSupportToolkit
                studentId={studentId}
                studentName={studentName}
                recentMood={studentData?.recentMood}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">SEL Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {studentData?.selCompletionRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completion rate of assigned SEL activities
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Last Check-In</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {studentData?.lastCheckIn}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reported mood: {studentData?.recentMood}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Badge className={studentData?.flagged ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                      {studentData?.flagged ? "Requires Attention" : "On Track"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {studentData?.flagged 
                      ? "Intervention recommended by WellLens AI" 
                      : "No immediate concerns detected"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEL Progress & Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section would show detailed SEL progress, completed activities,
                  and allow assigning new SEL content.
                </p>
                <div className="my-8 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Student SEL Progress Dashboard</p>
                    <p>(To be implemented)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interventions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Intervention Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section would allow creating, tracking and managing interventions for this student.
                </p>
                <div className="my-8 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Student Intervention Dashboard</p>
                    <p>(To be implemented)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student History & Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section would show historical data, including mood trends, academic performance,
                  attendance patterns, and past interventions.
                </p>
                <div className="my-8 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Student History Dashboard</p>
                    <p>(To be implemented)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentInterventionView;
