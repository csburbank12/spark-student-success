
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getResourceIcon, getChallengeColor } from "./intervention-utils";
import type { Intervention } from "./InterventionLibrary";

interface InterventionCardProps {
  intervention: Intervention;
  studentName?: string;
  onApply?: (intervention: Intervention) => void;
}

const InterventionCard: React.FC<InterventionCardProps> = ({ intervention, studentName, onApply }) => (
  <div className="p-4 border rounded-lg space-y-3">
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{intervention.title}</h3>
          <Badge className={getChallengeColor(intervention.targetArea)}>
            {intervention.targetArea.charAt(0).toUpperCase() + intervention.targetArea.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{intervention.description}</p>
      </div>
    </div>
    <Separator />
    <div className="space-y-2">
      <h4 className="font-medium text-sm">Recommended Strategy:</h4>
      <p className="text-sm">{intervention.strategy}</p>
    </div>
    <div className="space-y-2">
      <h4 className="font-medium text-sm">Research-Based Rationale:</h4>
      <p className="text-sm text-muted-foreground">{intervention.rationale}</p>
    </div>
    {intervention.resources && intervention.resources.length > 0 && (
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Resources:</h4>
        <div className="flex flex-wrap gap-2">
          {intervention.resources.map((resource, idx) => (
            <Button key={idx} variant="outline" size="sm" className="h-8">
              {getResourceIcon(resource.type)}
              <span className="ml-2">{resource.title}</span>
            </Button>
          ))}
        </div>
      </div>
    )}
    {studentName && onApply && (
      <div className="flex justify-end mt-2">
        <Button 
          size="sm" 
          onClick={() => onApply(intervention)}
        >
          Apply Intervention
        </Button>
      </div>
    )}
  </div>
);

export default InterventionCard;
