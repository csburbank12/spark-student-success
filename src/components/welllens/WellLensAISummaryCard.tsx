
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BrainCircuit, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WellLensAISummaryProps {
  entityName: string; // Student name, Class name, or School name
  entityType: 'student' | 'class' | 'school';
  flagged: boolean;
  confidenceScore: number; // 0-100
  primaryReason?: string;
  recommendedAction?: string;
  trends?: string;
  onViewDetails?: () => void;
}

export const WellLensAISummaryCard: React.FC<WellLensAISummaryProps> = ({
  entityName,
  entityType,
  flagged,
  confidenceScore,
  primaryReason,
  recommendedAction,
  trends,
  onViewDetails
}) => {
  const getStatusColor = () => {
    if (!flagged) return 'bg-green-100 text-green-800';
    if (confidenceScore > 80) return 'bg-red-100 text-red-800';
    if (confidenceScore > 60) return 'bg-amber-100 text-amber-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getStatusText = () => {
    if (!flagged) return 'Stable';
    if (confidenceScore > 80) return 'Critical';
    if (confidenceScore > 60) return 'At Risk';
    return 'Watch';
  };

  const getEntityTypeText = () => {
    switch (entityType) {
      case 'student':
        return 'Student';
      case 'class':
        return 'Class';
      case 'school':
        return 'School';
      default:
        return 'Entity';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">WellLens AI Insights</CardTitle>
            </div>
            <CardDescription className="mt-1">
              AI-driven behavioral and emotional wellness analysis
            </CardDescription>
          </div>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {getEntityTypeText()} Status
              </p>
              <p className="text-lg font-medium">
                {entityName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">
                Confidence Score
              </p>
              <p className="text-lg font-medium">
                {confidenceScore}%
              </p>
            </div>
          </div>
          
          <Separator />
          
          {flagged && primaryReason && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">Primary Concern</p>
                <p className="text-sm text-muted-foreground">{primaryReason}</p>
              </div>
            </div>
          )}
          
          {recommendedAction && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Lightbulb className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Recommended Action</p>
                <p className="text-sm text-muted-foreground">{recommendedAction}</p>
              </div>
            </div>
          )}
          
          {trends && (
            <div className="bg-muted/50 rounded-md p-3">
              <p className="font-medium">Recent Trends</p>
              <p className="text-sm text-muted-foreground">{trends}</p>
            </div>
          )}
          
          {onViewDetails && (
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center" 
              onClick={onViewDetails}
            >
              <span>View Detailed Analysis</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
