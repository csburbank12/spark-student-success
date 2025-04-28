
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Info, Users } from "lucide-react"; // Changed InfoCircle to Info
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface RiskOverviewCardProps {
  riskScore: number;
  changeDirection: "up" | "down" | "stable";
  changePercentage: number;
  riskFactors: string[];
  riskCategory: "high" | "medium" | "low";
}

const RiskOverviewCard: React.FC<RiskOverviewCardProps> = ({
  riskScore,
  changeDirection,
  changePercentage,
  riskFactors,
  riskCategory,
}) => {
  const getRiskColor = () => {
    switch (riskCategory) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
    }
  };
  
  const getRiskBadge = () => {
    switch (riskCategory) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Risk</Badge>; // Changed from "warning" to "secondary"
      case "low":
        return <Badge variant="success">Low Risk</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-red-500">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Risk Overview</CardTitle>
          {getRiskBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Risk Score</span>
                <Popover>
                  <PopoverTrigger>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm">
                      Risk scores range from 0 (lowest risk) to 100 (highest risk) based on
                      multiple signals including academic performance, attendance, behavior,
                      and emotional well-being patterns.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-sm font-bold">{riskScore}/100</div>
            </div>
            <Progress 
              className="h-2 mt-2" 
              value={riskScore} 
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
            <div className="flex flex-wrap gap-2">
              {riskFactors.map((factor, index) => (
                <div 
                  key={index} 
                  className="px-2 py-1 rounded-md text-xs bg-background border"
                >
                  {factor}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">Risk Trend</span>
            <div className="flex items-center">
              {changeDirection === "up" ? (
                <span className="text-red-600 text-sm">↑ {changePercentage}%</span>
              ) : changeDirection === "down" ? (
                <span className="text-green-600 text-sm">↓ {changePercentage}%</span>
              ) : (
                <span className="text-amber-600 text-sm">→ {changePercentage}%</span>
              )}
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskOverviewCard;
