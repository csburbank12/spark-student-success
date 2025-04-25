
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface HeatmapStatsProps {
  atRiskCount: number;
  concerningCount: number;
  stableCount: number;
  totalCount: number;
}

export const HeatmapStats: React.FC<HeatmapStatsProps> = ({
  atRiskCount,
  concerningCount,
  stableCount,
  totalCount
}) => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-red-50 px-4 pt-4 pb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="font-semibold text-red-800">At Risk</span>
          </div>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold">{atRiskCount}</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-yellow-50 px-4 pt-4 pb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="font-semibold text-yellow-800">Concerning</span>
          </div>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold">{concerningCount}</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-green-50 px-4 pt-4 pb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="font-semibold text-green-800">Stable</span>
          </div>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold">{stableCount}</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-blue-50 px-4 pt-4 pb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="font-semibold text-blue-800">Total</span>
          </div>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold">{totalCount}</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
