
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Intervention } from "../PredictiveSupportEngine";
import InterventionCard from "../InterventionCard";

interface CurrentInterventionsSectionProps {
  interventions: Intervention[];
}
const CurrentInterventionsSection: React.FC<CurrentInterventionsSectionProps> = ({ interventions }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Current Interventions</CardTitle>
      <Button size="sm" className="flex items-center gap-1">
        <PlusCircle className="h-4 w-4" />
        Add Intervention
      </Button>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {interventions.map((intervention) => (
          <InterventionCard
            key={intervention.id}
            intervention={intervention}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default CurrentInterventionsSection;
