
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";

interface RiskOverviewCardProps {
  studentCount: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  onViewDetails: () => void;
}

export const RiskOverviewCard: React.FC<RiskOverviewCardProps> = ({
  studentCount,
  highRiskCount,
  mediumRiskCount,
  lowRiskCount,
  onViewDetails,
}) => {
  const totalRisk = highRiskCount + mediumRiskCount + lowRiskCount;
  const riskPercentage = studentCount > 0 
    ? Math.round((totalRisk / studentCount) * 100)
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Risk Overview</CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewDetails}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Students Requiring Support:</span>
            <Badge variant={totalRisk > 0 ? "destructive" : "outline"}>
              {totalRisk} / {studentCount}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center px-2 py-1 rounded-md bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
              <div>
                <span className="text-xs text-muted-foreground">High Risk</span>
                <p className="text-base font-medium">{highRiskCount}</p>
              </div>
            </div>
            
            <div className="flex items-center px-2 py-1 rounded-md bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
              <div>
                <span className="text-xs text-muted-foreground">Medium Risk</span>
                <p className="text-base font-medium">{mediumRiskCount}</p>
              </div>
            </div>
            
            <div className="flex items-center px-2 py-1 rounded-md bg-blue-50">
              <Info className="h-4 w-4 text-blue-600 mr-1" />
              <div>
                <span className="text-xs text-muted-foreground">Low Risk</span>
                <p className="text-base font-medium">{lowRiskCount}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <span className="text-xs text-muted-foreground">Overall Risk Level</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    riskPercentage > 25 ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${riskPercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium">{riskPercentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
