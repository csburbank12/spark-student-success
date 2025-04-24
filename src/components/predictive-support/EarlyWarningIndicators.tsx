
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { EarlyWarningIndicator } from './PredictiveSupportEngine';

interface EarlyWarningIndicatorsProps {
  indicators: EarlyWarningIndicator[];
}

const EarlyWarningIndicators: React.FC<EarlyWarningIndicatorsProps> = ({ indicators }) => {
  // Get severity class
  const getSeverityClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
    }
  };
  
  // Get trend icon
  const getTrendIcon = (trend?: string) => {
    if (!trend) return null;
    
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <ArrowRight className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Early Warning Indicators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {indicators.map(indicator => (
          <div 
            key={indicator.id} 
            className="p-3 border rounded bg-background"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityClass(indicator.severity)}>
                    {indicator.urgency?.toUpperCase() || indicator.severity.toUpperCase()}
                  </Badge>
                  <h3 className="font-medium">{indicator.type}</h3>
                  {getTrendIcon(indicator.trend)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {indicator.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="text-xs px-2 py-0.5 bg-muted rounded-full">
                    Detected: {indicator.detectedAt}
                  </div>
                  
                  {indicator.affectedStudents && (
                    <div className="text-xs px-2 py-0.5 bg-muted rounded-full">
                      Affects: {indicator.affectedStudents} students
                    </div>
                  )}
                  
                  {indicator.confidence && (
                    <div className="text-xs px-2 py-0.5 bg-muted rounded-full">
                      {indicator.confidence}% confidence
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {indicators.length === 0 && (
          <div className="text-center text-muted-foreground p-4">
            No early warning indicators detected
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EarlyWarningIndicators;
