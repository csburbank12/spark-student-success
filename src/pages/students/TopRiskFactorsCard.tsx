
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Factor {
  name: string;
  count: number;
  percentage: number;
}

interface TopRiskFactorsCardProps {
  riskFactors: Factor[];
}

const TopRiskFactorsCard: React.FC<TopRiskFactorsCardProps> = ({ riskFactors }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Top Risk Factors</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {riskFactors.map((factor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{factor.name}</span>
              <span className="text-xs text-muted-foreground">{factor.count} students</span>
            </div>
            <Progress value={factor.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default TopRiskFactorsCard;
