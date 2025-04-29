
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import BarChart from '@/components/charts/BarChart';

export interface MoodTrend {
  date: string;
  mood: number;
  energy: number;
}

export interface StudentMoodAnalysisProps {
  studentId: string;
  moodTrends: MoodTrend[];
}

export const StudentMoodAnalysis: React.FC<StudentMoodAnalysisProps> = ({ 
  studentId, 
  moodTrends 
}) => {
  // Generate chart data
  const chartData = {
    labels: moodTrends.map(trend => trend.date),
    datasets: [
      {
        label: 'Mood Score',
        data: moodTrends.map(trend => trend.mood),
        backgroundColor: 'rgba(124, 58, 237, 0.5)',
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 1,
      },
      {
        label: 'Energy Level',
        data: moodTrends.map(trend => trend.energy),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Calculate average scores
  const averageMood = moodTrends.length > 0 
    ? Math.round(moodTrends.reduce((acc, curr) => acc + curr.mood, 0) / moodTrends.length * 10) / 10
    : 0;
  
  const averageEnergy = moodTrends.length > 0 
    ? Math.round(moodTrends.reduce((acc, curr) => acc + curr.energy, 0) / moodTrends.length * 10) / 10
    : 0;

  // Calculate trends (simple - just comparing last two points)
  const moodTrend = moodTrends.length >= 2 
    ? (moodTrends[moodTrends.length - 1].mood > moodTrends[moodTrends.length - 2].mood) ? 'up' : 'down'
    : 'stable';

  const energyTrend = moodTrends.length >= 2 
    ? (moodTrends[moodTrends.length - 1].energy > moodTrends[moodTrends.length - 2].energy) ? 'up' : 'down'
    : 'stable';

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
          <div>
            <CardTitle>Mood Analysis</CardTitle>
            <CardDescription>Student emotional wellness tracking</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Last {moodTrends.length} days
            </Badge>
            <Badge variant={averageMood > 6 ? "success" : "destructive"}>
              Avg: {averageMood}/10
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="pt-4">
            <div className="h-[300px]">
              {moodTrends.length > 0 ? (
                <BarChart data={chartData} height={300} />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No mood data available
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="summary" className="pt-4">
            <div className="space-y-4">
              <div className="bg-card border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Average Mood</p>
                    <p className="text-2xl font-bold">{averageMood}/10</p>
                  </div>
                  <div>
                    <Badge variant={moodTrend === 'up' ? 'success' : (moodTrend === 'down' ? 'destructive' : 'outline')}>
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      {moodTrend === 'up' ? 'Improving' : (moodTrend === 'down' ? 'Declining' : 'Stable')}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Energy Level</p>
                    <p className="text-2xl font-bold">{averageEnergy}/10</p>
                  </div>
                  <div>
                    <Badge variant={energyTrend === 'up' ? 'success' : (energyTrend === 'down' ? 'destructive' : 'outline')}>
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      {energyTrend === 'up' ? 'Improving' : (energyTrend === 'down' ? 'Declining' : 'Stable')}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {averageMood < 5 && (
                <div className="bg-destructive/10 border-destructive/20 border rounded-md p-4">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">Potential concern detected</p>
                  </div>
                  <p className="mt-2 text-sm">This student's mood patterns show potential signs of distress. Consider scheduling a check-in.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentMoodAnalysis;
