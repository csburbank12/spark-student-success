
import React, { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, PlusCircle } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Student } from "./PredictiveSupportEngine";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: string;
  impact: number;
  confidence: number;
  icon: ReactNode;
}

interface RecommendedInterventionsProps {
  student: Student;
  recommendations: Recommendation[];
}

const RecommendedInterventions: React.FC<RecommendedInterventionsProps> = ({
  student,
  recommendations
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI-Recommended Interventions</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Personalized interventions based on {student.name}'s data patterns
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 border rounded-lg bg-white hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                    {rec.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{rec.type}</Badge>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Assign
                </Button>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">Predicted Impact</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64">Estimated improvement in risk score if this intervention is implemented successfully</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-xs font-medium">{rec.impact}%</span>
                  </div>
                  <Progress value={rec.impact} className="h-1.5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Recommendation Confidence</span>
                    <span className="text-xs font-medium">{rec.confidence}%</span>
                  </div>
                  <Progress value={rec.confidence} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
          
          {recommendations.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No recommendations available at this time
            </div>
          )}
          
          {recommendations.length > 0 && (
            <div className="pt-2 text-center">
              <Button variant="outline">
                View More Recommendations
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedInterventions;
