
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import StudentMoodAnalysis from '../predictive-support/StudentMoodAnalysis';
import RiskLevelChart from '../predictive-support/RiskLevelChart';
import { TrendAlert, SchoolWellnessScore } from '../predictive-support/types';
import { Badge } from "@/components/ui/badge";

const WellLensDashboard: React.FC = () => {
  const { data: alerts } = useQuery({
    queryKey: ['trend-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trend_alerts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map database fields to our type fields
      return (data || []).map(alert => ({
        id: alert.id,
        studentId: alert.student_id,
        severity: alert.severity,
        primaryTrigger: alert.primary_trigger,
        secondaryTriggers: alert.secondary_triggers,
        details: alert.details,
        recommendedAction: alert.recommended_action,
        createdAt: alert.created_at,
        updatedAt: alert.updated_at,
        resolved: alert.resolved,
        resolvedAt: alert.resolved_at,
        resolvedBy: alert.resolved_by,
        resolutionNotes: alert.resolution_notes
      })) as TrendAlert[];
    }
  });

  const { data: wellnessScores } = useQuery({
    queryKey: ['school-wellness'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('school_wellness_scores')
        .select('*')
        .order('date', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (!data || data.length === 0) return null;
      
      // Map database fields to our type fields
      return {
        id: data[0].id,
        schoolId: data[0].school_id,
        date: data[0].date,
        participationScore: data[0].participation_score,
        moodScore: data[0].mood_score,
        selCompletionScore: data[0].sel_completion_score,
        alertResolutionScore: data[0].alert_resolution_score,
        totalScore: data[0].total_score,
        status: data[0].status as 'thriving' | 'stable' | 'at_risk',
        createdAt: data[0].created_at
      } as SchoolWellnessScore;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">WellLens™ Pulse</h2>
        {wellnessScores && (
          <Badge variant={
            wellnessScores.status === 'thriving' ? 'default' :
            wellnessScores.status === 'stable' ? 'secondary' :
            'destructive'
          }>
            {wellnessScores.status.toUpperCase()}
          </Badge>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {wellnessScores && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{Math.round(wellnessScores.participationScore)}%</CardTitle>
                <CardDescription>Check-in Rate</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{Math.round(wellnessScores.moodScore)}%</CardTitle>
                <CardDescription>Positive Mood</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{Math.round(wellnessScores.selCompletionScore)}%</CardTitle>
                <CardDescription>SEL Progress</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{Math.round(wellnessScores.totalScore)}</CardTitle>
                <CardDescription>Wellness Score</CardDescription>
              </CardHeader>
            </Card>
          </>
        )}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Current student wellness status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <RiskLevelChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardContent className="p-6">
              {alerts?.filter(alert => !alert.resolved).map(alert => (
                <div key={alert.id} className="mb-4 last:mb-0">
                  <StudentMoodAnalysis 
                    studentId={alert.studentId}
                    data={{
                      average: 5,
                      trend: "declining" as const,
                      history: [7, 6, 5, 4, 3],
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                    }}
                    alerts={[alert]}
                    moodTrends={[]}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardContent className="p-6">
              {/* Add trend visualization components here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellLensDashboard;
