
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { MoodTrend, TrendAlert } from "./types";
import BarChart from "@/components/charts/BarChart";

export interface StudentMoodAnalysisProps {
  studentId: string;
  data?: {
    average: number;
    trend: "improving" | "stable" | "declining";
    history: number[];
    labels: string[];
  };
  moodTrends: MoodTrend[];
  alerts?: TrendAlert[];
}

export const StudentMoodAnalysis: React.FC<StudentMoodAnalysisProps> = ({ 
  studentId,
  data,
  moodTrends = [],
  alerts = []
}) => {
  // Default chart data in case of empty mood trends
  const defaultData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Mood Score",
        data: [3, 4, 2, 5, 3],
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
    ],
  };

  // Use provided data if available, otherwise transform mood trends into chart data
  const chartData = data ? {
    labels: data.labels,
    datasets: [
      {
        label: "Mood Score",
        data: data.history,
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
    ],
  } : moodTrends.length > 0 ? {
    labels: moodTrends.map(trend => {
      const date = new Date(trend.date);
      return date.toLocaleDateString(undefined, { weekday: 'short' });
    }),
    datasets: [
      {
        label: "Mood Score",
        data: moodTrends.map(trend => trend.score),
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
    ],
  } : defaultData;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Mood Analysis</CardTitle>
          {alerts && alerts.length > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{alerts.length} Alert{alerts.length !== 1 ? 's' : ''}</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <BarChart data={chartData} height="100%" />
        </div>
        
        <div className="mt-4 space-y-2">
          {moodTrends.length > 0 ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average Mood:</span>
                <span className="font-medium">
                  {(moodTrends.reduce((sum, trend) => sum + trend.score, 0) / moodTrends.length).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Most Common:</span>
                <span className="font-medium">
                  {moodTrends
                    .map(trend => trend.primaryMood)
                    .sort((a, b) => 
                      moodTrends.filter(t => t.primaryMood === b).length - 
                      moodTrends.filter(t => t.primaryMood === a).length
                    )
                    .filter((mood, idx, arr) => idx === 0 || mood !== arr[idx - 1])[0] || 'N/A'}
                </span>
              </div>
            </>
          ) : data ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average Mood:</span>
                <span className="font-medium">{data.average.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Trend:</span>
                <span className="font-medium capitalize">{data.trend}</span>
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-muted-foreground">No mood data available</p>
          )}
          
          {alerts && alerts.length > 0 && (
            <div className="pt-2 mt-2 border-t">
              <p className="text-sm font-medium">Recent Alerts:</p>
              <ul className="mt-1 space-y-1">
                {alerts.slice(0, 2).map((alert) => (
                  <li key={alert.id} className="text-xs text-muted-foreground">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                    {alert.primaryTrigger}
                  </li>
                ))}
                {alerts.length > 2 && (
                  <li className="text-xs text-muted-foreground font-medium">
                    +{alerts.length - 2} more alerts
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
