
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check,
  Clock,
  AlertCircle,
  Calendar,
  User
} from "lucide-react";
import { Intervention } from "./PredictiveSupportEngine";

interface InterventionTimelineProps {
  interventions: Intervention[];
}

const InterventionTimeline: React.FC<InterventionTimelineProps> = ({ interventions }) => {
  // Sort interventions by status (completed first, then in-progress, then pending)
  const sortedInterventions = [...interventions].sort((a, b) => {
    const statusOrder = {
      "completed": 0,
      "in-progress": 1,
      "pending": 2,
      "overdue": 3
    };
    
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>;
      case "in-progress":
        return <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Clock className="h-5 w-5 text-blue-600" />
        </div>;
      case "completed":
        return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="h-5 w-5 text-green-600" />
        </div>;
      case "overdue":
        return <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="h-5 w-5 text-red-600" />
        </div>;
      default:
        return <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Clock className="h-5 w-5" />
        </div>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Scheduled</Badge>;
      case "in-progress":
        return <Badge variant="secondary">Active</Badge>;
      case "completed":
        return <Badge className="bg-green-600">Complete</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Intervention Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border z-0"></div>
          
          {/* Timeline items */}
          <div className="relative z-10 space-y-6">
            {sortedInterventions.map((intervention, index) => (
              <div key={intervention.id} className="flex gap-4">
                <div className="flex-shrink-0 z-10">
                  {getStatusIcon(intervention.status)}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{intervention.type}</h3>
                    {getStatusBadge(intervention.status)}
                  </div>
                  <p className="text-sm mb-3">{intervention.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{intervention.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{intervention.assignedTo}</span>
                    </div>
                    {intervention.impact && (
                      <div>Impact: {intervention.impact}% improvement</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Additional historical interventions */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 z-10">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">Initial Risk Assessment</h3>
                  <Badge className="bg-green-600">Complete</Badge>
                </div>
                <p className="text-sm mb-3">Comprehensive evaluation of academic and behavioral data</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Apr 15, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Mr. James Harris</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 z-10">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">Support Plan Development</h3>
                  <Badge className="bg-green-600">Complete</Badge>
                </div>
                <p className="text-sm mb-3">Created personalized support strategy with team input</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Apr 16, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Support Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterventionTimeline;
