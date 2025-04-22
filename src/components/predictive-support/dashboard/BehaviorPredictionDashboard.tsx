
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import BehaviorPredictionEngine from "@/components/behavior-prediction/BehaviorPredictionEngine";
import BehaviorHeatmap from "@/components/behavior-prediction/BehaviorHeatmap";
import InterventionImpactAnalysis from "@/components/predictive-support/dashboard/InterventionImpactAnalysis";

// Types
export interface StudentBehaviorSummary {
  studentId: string;
  studentName: string;
  mood: {
    average: number;
    trend: "improving" | "declining" | "stable";
    confidence: number;
  };
  attendance: {
    rate: number;
    absences: number;
    trend: "improving" | "declining" | "stable";
  };
  behavior: {
    incidents: number;
    trend: "improving" | "declining" | "stable";
  };
  academic: {
    average: number;
    trend: "improving" | "declining" | "stable";
  };
}

const BehaviorPredictionDashboard: React.FC = () => {
  // Mock student data
  const studentData = {
    studentId: "s-12345",
    studentName: "Alex Johnson",
    moodScores: [0.4, 0.5, 0.7, 0.6, 0.3, 0.2, 0.4],
    attendanceRate: 92,
    taskCompletionRate: 85,
    engagementScore: 7.5,
    conductIncidents: 2,
    lastUpdated: new Date().toISOString()
  };
  
  // Mock intervention impact data
  const interventionImpactData = [
    {
      name: "Academic Support",
      success: 65,
      partial: 20,
      none: 15
    },
    {
      name: "Behavioral",
      success: 55,
      partial: 30,
      none: 15
    },
    {
      name: "Social-Emotional",
      success: 72,
      partial: 18,
      none: 10
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Behavior Prediction Dashboard</h2>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Intervention Impact</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <BehaviorPredictionEngine studentData={studentData} />
            <Card>
              <CardHeader>
                <CardTitle>SEL Domain Scores</CardTitle>
                <CardDescription>
                  Social-Emotional Learning competencies assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="text-sm font-medium">Self-Awareness</span>
                        <div className="text-xs text-muted-foreground">
                          Understanding emotions, strengths, and limitations
                        </div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="text-sm font-medium">Self-Management</span>
                        <div className="text-xs text-muted-foreground">
                          Regulating emotions and behaviors
                        </div>
                      </div>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="text-sm font-medium">Social Awareness</span>
                        <div className="text-xs text-muted-foreground">
                          Empathy and respect for others
                        </div>
                      </div>
                      <span className="text-sm font-medium">81%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "81%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="text-sm font-medium">Relationship Skills</span>
                        <div className="text-xs text-muted-foreground">
                          Establishing and maintaining healthy relationships
                        </div>
                      </div>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="text-sm font-medium">Responsible Decision-Making</span>
                        <div className="text-xs text-muted-foreground">
                          Making ethical, constructive choices
                        </div>
                      </div>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: "58%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <BehaviorHeatmap 
            studentId={studentData.studentId} 
            studentName={studentData.studentName}
            domains={["emotional", "social", "academic", "behavioral"]} 
          />
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Long-term Behavior Trends</CardTitle>
              <CardDescription>
                Historical data visualization across all domains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Timeline visualization will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impact" className="space-y-6">
          <InterventionImpactAnalysis interventionImpactData={interventionImpactData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BehaviorPredictionDashboard;
