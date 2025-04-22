
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, History, Clipboard } from "lucide-react";
import BehaviorPredictionEngine, { StudentBehaviorData } from "@/components/behavior-prediction/BehaviorPredictionEngine";
import InterventionLibrary, { ChallengeArea } from "@/components/interventions/InterventionLibrary";

interface StudentInterventionViewProps {
  studentId: string;
  studentName: string;
  onBack: () => void;
}

// Mock data for a student
const getMockStudentData = (id: string, name: string): StudentBehaviorData => {
  return {
    studentId: id,
    studentName: name,
    moodScores: [6, 4, 3, 5, 4, 3, 2], // Recent mood scores (0-10, higher is better)
    attendanceRate: 78, // Percentage
    taskCompletionRate: 65, // Percentage
    engagementScore: 4.2, // 0-10 scale
    conductIncidents: 2, // Count of behavior incidents
    lastUpdated: "Today, 9:15 AM"
  };
};

const getInterventionAreas = (data: StudentBehaviorData): ChallengeArea[] => {
  const areas: ChallengeArea[] = [];
  
  // Average mood below 5 indicates emotional challenges
  const avgMood = data.moodScores.reduce((sum, score) => sum + score, 0) / data.moodScores.length;
  if (avgMood < 5) {
    areas.push("emotional");
  }
  
  // Attendance below 85% is concerning
  if (data.attendanceRate < 85) {
    areas.push("attendance");
  }
  
  // Task completion below 70% indicates academic challenges
  if (data.taskCompletionRate < 70) {
    areas.push("academic");
  }
  
  // Engagement below 5 may indicate social issues
  if (data.engagementScore < 5) {
    areas.push("social");
  }
  
  // Any conduct incidents indicate behavioral concerns
  if (data.conductIncidents > 0) {
    areas.push("behavioral");
  }
  
  return areas;
};

const StudentInterventionView: React.FC<StudentInterventionViewProps> = ({
  studentId,
  studentName,
  onBack
}) => {
  const studentData = getMockStudentData(studentId, studentName);
  const flaggedAreas = getInterventionAreas(studentData);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">{studentName}</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <BehaviorPredictionEngine studentData={studentData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Engagement Summary</CardTitle>
            <CardDescription>Recent activity and metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-sm text-muted-foreground">Attendance</div>
                <div className="text-2xl font-bold">{studentData.attendanceRate}%</div>
                <div className="text-xs text-muted-foreground">Last 30 days</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-sm text-muted-foreground">Task Completion</div>
                <div className="text-2xl font-bold">{studentData.taskCompletionRate}%</div>
                <div className="text-xs text-muted-foreground">Last 30 days</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-sm text-muted-foreground">Engagement</div>
                <div className="text-2xl font-bold">{studentData.engagementScore}/10</div>
                <div className="text-xs text-muted-foreground">Teacher assessment</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-sm text-muted-foreground">Behavioral Concerns</div>
                <div className="text-2xl font-bold">{studentData.conductIncidents}</div>
                <div className="text-xs text-muted-foreground">This semester</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="interventions">
        <TabsList>
          <TabsTrigger value="interventions" className="flex items-center">
            <Clipboard className="mr-2 h-4 w-4" />
            Interventions
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="mr-2 h-4 w-4" />
            Intervention History
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="interventions" className="mt-6">
          <InterventionLibrary 
            studentId={studentId}
            studentName={studentName}
            flaggedAreas={flaggedAreas}
          />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Intervention History</CardTitle>
              <CardDescription>Past interventions and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                No previous interventions recorded.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Actions</CardTitle>
              <CardDescription>Upcoming interventions and check-ins</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                No scheduled actions yet. Apply an intervention to create a schedule.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentInterventionView;
