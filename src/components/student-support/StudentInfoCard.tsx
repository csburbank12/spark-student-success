
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp, Minus, CalendarIcon, AlertCircle } from "lucide-react";

interface Student {
  id: string;
  name: string;
  photoUrl: string | null;
  grade: string;
  class: string;
  teacher: string;
  status: "at_risk" | "concerning" | "stable";
  confidenceScore: number;
  moodTrend: string;
  absences: number;
  tardies: number;
  behaviorReports: number;
  currentInterventions: string[];
}

interface StudentInfoCardProps {
  student: Student;
}

export const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ student }) => {
  const renderTrendIcon = (trend: string) => {
    if (trend.includes("decline")) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else if (trend.includes("improv")) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend.includes("fluctuat")) {
      return (
        <div className="flex flex-col h-4 w-4 text-yellow-500">
          <ArrowUpIcon className="h-2 w-2" />
          <ArrowDownIcon className="h-2 w-2" />
        </div>
      );
    } else {
      return <Minus className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: "at_risk" | "concerning" | "stable") => {
    switch (status) {
      case "at_risk":
        return "bg-red-100 text-red-800 border-red-300";
      case "concerning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "stable":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusLabel = (status: "at_risk" | "concerning" | "stable") => {
    switch (status) {
      case "at_risk":
        return "At Risk";
      case "concerning":
        return "Concerning";
      case "stable":
        return "Stable";
      default:
        return "Unknown";
    }
  };

  const getConfidenceBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{student.name}</CardTitle>
            <Badge className={getStatusColor(student.status)}>
              {getStatusLabel(student.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Grade</div>
                <div className="font-medium">{student.grade}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Class</div>
                <div className="font-medium">{student.class}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Teacher</div>
                <div className="font-medium">{student.teacher}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">AI Confidence</div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{student.confidenceScore}%</span>
                  <Badge variant="outline" className={getConfidenceBadgeColor(student.confidenceScore)}>
                    {student.confidenceScore >= 80 ? "High" : 
                     student.confidenceScore >= 60 ? "Medium" : "Low"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Risk Assessment</div>
            <Progress 
              value={
                student.status === "at_risk" ? 90 : 
                student.status === "concerning" ? 50 : 20
              } 
              className={
                student.status === "at_risk" ? "bg-red-200" : 
                student.status === "concerning" ? "bg-yellow-200" : 
                "bg-green-200"
              }
            />
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Current Factors</div>
            <dl className="space-y-2">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground flex items-center">
                  <div className="flex items-center">
                    Mood Trend
                    {renderTrendIcon(student.moodTrend)}
                  </div>
                </dt>
                <dd className="text-sm font-medium">{student.moodTrend}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground flex items-center">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" /> 
                    Absences (30d)
                  </div>
                </dt>
                <dd className="text-sm font-medium">{student.absences}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground flex items-center">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" /> 
                    Tardies (30d)
                  </div>
                </dt>
                <dd className="text-sm font-medium">{student.tardies}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground flex items-center">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> 
                    Behavior Reports
                  </div>
                </dt>
                <dd className="text-sm font-medium">{student.behaviorReports}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Current Interventions ({student.currentInterventions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {student.currentInterventions.length > 0 ? (
            <ul className="space-y-2">
              {student.currentInterventions.map((intervention, index) => (
                <li key={index} className="text-sm flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                  {intervention}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No active interventions</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
