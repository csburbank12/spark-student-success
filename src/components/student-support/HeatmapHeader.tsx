
import React from "react";
import { Button } from "@/components/ui/button";

interface HeatmapHeaderProps {
  isRealTimeEnabled: boolean;
  toggleRealTime: () => void;
  handleExportData: () => void;
}

export const HeatmapHeader: React.FC<HeatmapHeaderProps> = ({
  isRealTimeEnabled,
  toggleRealTime,
  handleExportData,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-heading font-bold">Student Support Heatmap</h2>
        <p className="text-muted-foreground">
          Monitor student wellness across classes and grade levels
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={toggleRealTime}>
          {isRealTimeEnabled ? "Disable" : "Enable"} Real-time
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportData}>
          Export Data
        </Button>
      </div>
    </div>
  );
};
