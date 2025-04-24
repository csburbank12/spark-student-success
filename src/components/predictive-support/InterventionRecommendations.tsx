
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const demoRecommendations = [
  {
    id: 1,
    type: "Academic Support",
    confidence: 92,
    impact: "High",
    description: "Schedule additional math support sessions based on recent assessment patterns",
    urgency: "high"
  },
  {
    id: 2,
    type: "Social-Emotional",
    confidence: 85,
    impact: "Medium",
    description: "Implement peer group activities to address social interaction patterns",
    urgency: "medium"
  },
  {
    id: 3,
    type: "Behavioral",
    confidence: 78,
    impact: "Medium",
    description: "Morning check-in routine to establish daily goals",
    urgency: "low"
  }
];

const InterventionRecommendations = () => {
  const handleImplement = (recommendation: any) => {
    toast.success(`Implementing: ${recommendation.type}`, {
      description: "The recommendation has been added to your action plan."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {demoRecommendations.map((rec) => (
            <div 
              key={rec.id}
              className="p-4 border rounded-lg bg-muted/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{rec.type}</h4>
                    <Badge variant={
                      rec.urgency === "high" ? "destructive" :
                      rec.urgency === "medium" ? "default" :
                      "secondary"
                    }>
                      {rec.urgency === "high" ? "Urgent" : 
                       rec.urgency === "medium" ? "Important" : 
                       "Schedule Soon"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <BadgeCheck className="h-4 w-4 text-green-500" />
                      {rec.confidence}% confidence
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      {rec.impact} impact
                    </span>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleImplement(rec)}>Implement</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterventionRecommendations;
