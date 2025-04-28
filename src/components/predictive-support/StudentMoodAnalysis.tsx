
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";

export interface StudentMoodAnalysisProps {
  studentId: string;
  studentName?: string;
  data: {
    average: number;
    trend: "improving" | "declining" | "stable";
    history: number[];
    labels: string[];
  };
  alerts?: any[]; // Add for WellLensDashboard compatibility
  moodTrends?: any[]; // Add for WellLensDashboard compatibility
}

const StudentMoodAnalysis: React.FC<StudentMoodAnalysisProps> = ({
  studentId,
  studentName = "Student",
  data,
}) => {
  const getTrendIcon = () => {
    switch (data.trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable":
        return <Minus className="h-4 w-4 text-amber-600" />;
    }
  };

  const getTrendVariant = () => {
    switch (data.trend) {
      case "improving":
        return "success";
      case "declining":
        return "destructive";
      case "stable":
        return "secondary"; // Changed from "warning" to "secondary"
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Mood Trends: {studentName}</span>
          <Badge variant={getTrendVariant()} className="flex items-center gap-1">
            {getTrendIcon()}
            <span className="capitalize">{data.trend}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall Mood Score</span>
              <span className="text-sm font-bold">{data.average}</span>
            </div>
            <Progress value={data.average * 10} className="h-2" />
          </div>
          
          <div className="h-48">
            <BarChart
              data={{
                labels: data.labels,
                datasets: [
                  {
                    label: "Mood Score",
                    data: data.history,
                    backgroundColor: "rgba(59, 130, 246, 0.5)",
                    borderColor: "rgb(59, 130, 246)",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentMoodAnalysis;
