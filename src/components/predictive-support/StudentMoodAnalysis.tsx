
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendAlert } from './types';

interface StudentMoodAnalysisProps {
  studentId: string;
  alerts: TrendAlert[];
  moodTrends: Array<{
    date: string;
    value: number;
    mood: string;
  }>;
}

const StudentMoodAnalysis: React.FC<StudentMoodAnalysisProps> = ({
  studentId,
  alerts,
  moodTrends,
}) => {
  const activeAlert = alerts.find(alert => !alert.resolved);
  
  return (
    <div className="space-y-4">
      {activeAlert && (
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-medium">{activeAlert.primaryTrigger}</h4>
                  <p className="text-sm text-muted-foreground">
                    {activeAlert.recommendedAction}
                  </p>
                </div>
              </div>
              <Badge variant={
                activeAlert.severity === 'critical' ? 'destructive' : 
                activeAlert.severity === 'at_risk' ? 'warning' : 
                'default'
              }>
                {activeAlert.severity.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Mood Trends</CardTitle>
          <CardDescription>7-day emotional wellness pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentMoodAnalysis;
