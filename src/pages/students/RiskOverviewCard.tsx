
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface RiskOverviewCardProps {
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  totalCount: number;
}

const RiskOverviewCard: React.FC<RiskOverviewCardProps> = ({
  highRiskCount,
  mediumRiskCount,
  lowRiskCount,
  totalCount,
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Risk Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">High Risk</span>
            <Badge variant="destructive">{highRiskCount}</Badge>
          </div>
          <Progress value={(highRiskCount / totalCount) * 100} className="h-2 bg-red-100" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Medium Risk</span>
            <Badge variant="warning">{mediumRiskCount}</Badge>
          </div>
          <Progress value={(mediumRiskCount / totalCount) * 100} className="h-2 bg-amber-100" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Low Risk</span>
            <Badge variant="outline">{lowRiskCount}</Badge>
          </div>
          <Progress value={(lowRiskCount / totalCount) * 100} className="h-2 bg-gray-100" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default RiskOverviewCard;
