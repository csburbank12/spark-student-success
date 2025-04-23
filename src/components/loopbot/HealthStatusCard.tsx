
import React from "react";
import { Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SiteHealth } from "@/services/loopbot/types";

interface HealthStatusCardProps {
  siteHealth: SiteHealth;
  lastScanTimestamp?: Date;
}

const getHealthIcon = (health: SiteHealth) => {
  switch (health) {
    case "green": return <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Healthy</div>;
    case "yellow": return <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Warning</div>;
    case "red": return <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Critical</div>;
    default: return <div className="flex items-center"><span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>Unknown</div>;
  }
};

export const HealthStatusCard: React.FC<HealthStatusCardProps> = ({ siteHealth, lastScanTimestamp }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Site Health Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-24">
          <Shield className="h-12 w-12 text-primary mb-2" />
          <div className="text-xl font-medium">
            {getHealthIcon(siteHealth)}
          </div>
          {lastScanTimestamp && (
            <p className="text-xs text-muted-foreground mt-1">
              Last scan: {new Date(lastScanTimestamp).toLocaleString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
