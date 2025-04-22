
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Props {
  aggregatedData: {
    highRiskCount: number;
    moderateRiskCount: number;
    lowRiskCount: number;
    studentCount: number;
  };
  selectedSchool: string;
}

const RiskDistributionOverview: React.FC<Props> = ({ aggregatedData, selectedSchool }) => {
  const { studentCount, highRiskCount, moderateRiskCount, lowRiskCount } = aggregatedData;
  const highRiskPercentage = Math.round((highRiskCount / studentCount) * 100);
  const moderateRiskPercentage = Math.round((moderateRiskCount / studentCount) * 100);
  const lowRiskPercentage = Math.round((lowRiskCount / studentCount) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Distribution Overview</CardTitle>
        <CardDescription>
          Student risk assessment across {selectedSchool === "all" ? "all schools" : "this school"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span>High Risk ({highRiskCount} students)</span>
              </div>
              <span>{highRiskPercentage}%</span>
            </div>
            <Progress value={highRiskPercentage} className="h-2 bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span>Moderate Risk ({moderateRiskCount} students)</span>
              </div>
              <span>{moderateRiskPercentage}%</span>
            </div>
            <Progress value={moderateRiskPercentage} className="h-2 bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Low Risk ({lowRiskCount} students)</span>
              </div>
              <span>{lowRiskPercentage}%</span>
            </div>
            <Progress value={lowRiskPercentage} className="h-2 bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskDistributionOverview;
