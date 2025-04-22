
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart4, UserCog } from "lucide-react";

interface PredictiveSupportHeaderProps {}

const PredictiveSupportHeader: React.FC<PredictiveSupportHeaderProps> = () => (
  <div className="flex items-center justify-between">
    <h2 className="text-3xl font-heading font-bold">
      Predictive Student Support Engine
    </h2>
    <div className="flex items-center gap-2">
      <Button variant="outline" className="gap-1">
        <BarChart4 className="h-4 w-4" />
        <span>Analytics</span>
      </Button>
      <Button className="gap-1">
        <UserCog className="h-4 w-4" />
        <span>Configure Engine</span>
      </Button>
    </div>
  </div>
);

export default PredictiveSupportHeader;
