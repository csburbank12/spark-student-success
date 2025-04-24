
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import StudentMoodAnalysis from '../predictive-support/StudentMoodAnalysis';
import RiskLevelChart from '../predictive-support/RiskLevelChart';
import { TrendAlert, SchoolWellnessScore } from '../predictive-support/types';

const WellLensDashboard: React.FC = () => {
  const { data: alerts } = useQuery({
    queryKey: ['trend-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trend_alerts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as TrendAlert[];
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
      return data[0] as SchoolWellnessScore;
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
                    alerts={[alert]}
                    moodTrends={[]} // You'll need to fetch this data
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
