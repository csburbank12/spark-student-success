
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RiskActionItemsCardProps {
  highRiskCount: number;
  mediumRiskCount: number;
}

const RiskActionItemsCard: React.FC<RiskActionItemsCardProps> = ({
  highRiskCount,
  mediumRiskCount,
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Action Items</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="p-3 bg-red-50 border border-red-100 rounded-md">
          <h4 className="font-medium text-sm mb-1">{highRiskCount} students require immediate attention</h4>
          <p className="text-xs text-muted-foreground mb-2">Students showing multiple risk factors</p>
          <Button size="sm" className="w-full">Review High Risk Students</Button>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
          <h4 className="font-medium text-sm mb-1">{mediumRiskCount} students need monitoring</h4>
          <p className="text-xs text-muted-foreground mb-2">Students showing early warning signs</p>
          <Button size="sm" variant="outline" className="w-full">Review Medium Risk Students</Button>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
          <h4 className="font-medium text-sm mb-1">Support Plan Update</h4>
          <p className="text-xs text-muted-foreground mb-2">3 support plans need updating this week</p>
          <Button size="sm" variant="outline" className="w-full">Review Support Plans</Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default RiskActionItemsCard;
