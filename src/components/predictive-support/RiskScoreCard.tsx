
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, AlertCircle, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Student } from "./PredictiveSupportEngine";

interface RiskScoreCardProps {
  student: Student;
}

const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ student }) => {
  const getRiskColor = (score: number) => {
    if (score >= 75) return "text-red-500";
    if (score >= 50) return "text-amber-500";
    return "text-green-500";
  };
  
  const getRiskBgColor = (score: number) => {
    if (score >= 75) return "bg-red-100";
    if (score >= 50) return "bg-amber-100";
    return "bg-green-100";
  };

  const getRiskProgressColor = (score: number) => {
    if (score >= 75) return "bg-red-200";
    if (score >= 50) return "bg-amber-200";
    return "bg-green-200";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 75) return "High Risk";
    if (score >= 50) return "Medium Risk";
    return "Low Risk";
  };

  const getTrendIcon = () => {
    if (student.riskTrend === "up") {
      return <TrendingUp className="h-5 w-5 text-red-500" />;
    } else if (student.riskTrend === "down") {
      return <TrendingDown className="h-5 w-5 text-green-500" />;
    } else {
      return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendLabel = () => {
    if (student.riskTrend === "up") {
      return "Increasing Risk";
    } else if (student.riskTrend === "down") {
      return "Decreasing Risk";
    } else {
      return "Stable Risk";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Risk Assessment</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p>Risk scores are calculated using AI analysis of attendance, grades, behavior, 
                check-ins, and journal entries. The confidence score indicates how certain the 
                system is about this prediction.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Current Risk Score</h3>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${getRiskColor(student.riskScore)}`}>
                  {student.riskScore}
                </span>
                <Badge className="ml-2" variant={student.riskScore >= 75 ? "destructive" : (student.riskScore >= 50 ? "warning" : "outline")}>
                  {getRiskLabel(student.riskScore)}
                </Badge>
              </div>
            </div>
            <div className={`h-20 w-20 rounded-full flex items-center justify-center ${getRiskBgColor(student.riskScore)}`}>
              <AlertCircle className={`h-10 w-10 ${getRiskColor(student.riskScore)}`} />
            </div>
          </div>
          
          <div>
            <div className="mb-2">
              <Progress value={student.riskScore} className={getRiskProgressColor(student.riskScore)} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Risk Trend</p>
              <div className="flex items-center gap-2">
                {getTrendIcon()}
                <span>{getTrendLabel()}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Predicted in 2 Weeks</p>
              <div className="flex items-center gap-2">
                <span className={getRiskColor(student.predictedRisk)}>
                  {student.predictedRisk}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({student.predictedRisk > student.riskScore ? "+" : ""}{student.predictedRisk - student.riskScore})
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
              <div>{student.lastUpdated}</div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Confidence</p>
              <div>{student.confidenceLevel}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreCard;
