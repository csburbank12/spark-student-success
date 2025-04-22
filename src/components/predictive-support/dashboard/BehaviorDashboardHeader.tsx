
import React from "react";
import { Calendar, BarChart3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BehaviorDashboardHeaderProps {
  lastUpdated?: string;
  onRefresh?: () => void;
}

const BehaviorDashboardHeader: React.FC<BehaviorDashboardHeaderProps> = ({ 
  lastUpdated = new Date().toLocaleDateString(), 
  onRefresh 
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h2 className="text-3xl font-heading font-bold">Behavior Prediction Dashboard</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Track student emotional, social, academic, and behavioral patterns
      </p>
    </div>
    <div className="flex items-center gap-2">
      <div className="text-sm text-muted-foreground flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        Last updated: {lastUpdated}
      </div>
      {onRefresh && (
        <Button variant="ghost" size="icon" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      )}
    </div>
  </div>
);

export default BehaviorDashboardHeader;
