
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, ArrowDown } from "lucide-react";
import { Student } from "./PredictiveSupportEngine";

interface RiskScoreCardProps {
  student: Student;
  showDetails?: boolean;
}

const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ student, showDetails = true }) => {
  // Helper to get color class based on risk score
  const getScoreColorClass = (score: number) => {
    if (score >= 75) return "text-red-600 dark:text-red-400";
    if (score >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-green-600 dark:text-green-400";
  };

  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-red-600";
    if (score >= 50) return "bg-amber-500";
    return "bg-green-500";
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500 ml-1" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500 ml-1" />;
      default:
        return null;
    }
  };

  const riskScore = student.riskScore || 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className={`text-2xl font-bold ${getScoreColorClass(riskScore)}`}>
            {riskScore}
            <span className="inline-flex items-center">
              {getTrendIcon(student.riskTrend)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {student.confidenceLevel && (
              <span>{student.confidenceLevel}% confidence</span>
            )}
          </div>
        </div>

        <Progress 
          value={riskScore} 
          max={100} 
          className="h-2" 
          indicatorClassName={getProgressColor(riskScore)} 
        />

        <div className="mt-4 space-y-3">
          {showDetails && student.riskFactors && student.riskFactors.length > 0 && (
            <>
              <div className="text-sm font-medium">Contributing Factors:</div>
              <ul className="text-sm space-y-1">
                {student.riskFactors.map((factor, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowDown className="h-3 w-3 mr-2 text-muted-foreground" />
                    {factor}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreCard;
