
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, Clock } from "lucide-react";

interface EarlyWarningIndicator {
  id: string;
  type: string;
  description: string;
  urgency: "high" | "medium" | "low";
  detectedDate: string;
  confidence: number;
  affectedStudents: number;
  trend: "increasing" | "stable" | "decreasing";
}

interface EarlyWarningIndicatorsProps {
  indicators: EarlyWarningIndicator[];
}

const EarlyWarningIndicators: React.FC<EarlyWarningIndicatorsProps> = ({ indicators }) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "decreasing":
        return <TrendingUp className="h-4 w-4 text-green-500 transform rotate-180" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Early Warning Indicators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indicators.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No current early warning indicators</p>
          ) : (
            indicators.map((indicator) => (
              <div key={indicator.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{indicator.type}</h3>
                      <Badge className={getUrgencyColor(indicator.urgency)}>
                        {indicator.urgency.charAt(0).toUpperCase() + indicator.urgency.slice(1)} Urgency
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{indicator.description}</p>
                  </div>
                  
                  {indicator.trend !== "stable" && (
                    <div className="flex items-center gap-1 text-sm">
                      {getTrendIcon(indicator.trend)}
                      <span>{indicator.trend === "increasing" ? "Increasing" : "Decreasing"}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>Detected: {indicator.detectedDate}</span>
                  </div>
                  <span>{indicator.affectedStudents} students affected</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Prediction Confidence</span>
                    <span className="font-medium">{indicator.confidence}%</span>
                  </div>
                  <Progress value={indicator.confidence} className="h-1.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EarlyWarningIndicators;
