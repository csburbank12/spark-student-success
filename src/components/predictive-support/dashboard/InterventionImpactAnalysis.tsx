
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface InterventionImpactData {
  name: string;
  success: number;
  partial: number;
  none: number;
}

interface InterventionImpactAnalysisProps {
  interventionImpactData: InterventionImpactData[];
}

const InterventionImpactAnalysis: React.FC<InterventionImpactAnalysisProps> = ({
  interventionImpactData,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Intervention Impact Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {interventionImpactData.map((intervention, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{intervention.name} Interventions</span>
              <span>{intervention.success}% Success Rate</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-500"
                style={{ width: `${intervention.success}%` }}
              />
              <div
                className="bg-amber-400"
                style={{ width: `${intervention.partial}%` }}
              />
              <div
                className="bg-red-400"
                style={{ width: `${intervention.none}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                <span className="inline-block h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                Significant Impact
              </span>
              <span>
                <span className="inline-block h-2 w-2 bg-amber-400 rounded-full mr-1"></span>
                Partial Impact
              </span>
              <span>
                <span className="inline-block h-2 w-2 bg-red-400 rounded-full mr-1"></span>
                No Impact
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default InterventionImpactAnalysis;
