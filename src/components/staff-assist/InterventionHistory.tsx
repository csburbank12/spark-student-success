
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { behaviorSituations } from "./constants";
import { StudentProfile, BehaviorLog } from "./types";

interface InterventionHistoryProps {
  behaviorLogs: BehaviorLog[];
  students: StudentProfile[];
  isLoading?: boolean;
  updateEffectiveness: (logId: string, rating: number) => void;
  isEffectivenessSaving?: boolean;
}

const InterventionHistory: React.FC<InterventionHistoryProps> = ({
  behaviorLogs,
  students,
  isLoading = false,
  updateEffectiveness,
  isEffectivenessSaving = false
}) => {
  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Intervention History</CardTitle>
        <CardDescription>
          Track patterns and effectiveness of previous interventions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {behaviorLogs && behaviorLogs.length > 0 ? (
          <div className="space-y-4">
            {behaviorLogs.map((log) => {
              const student = students?.find(s => s.id === log.student_id);
              const studentName = student ? `${student.first_name} ${student.last_name}` : "No specific student";
              const situationItem = behaviorSituations.find(s => s.id === log.situation_type);

              return (
                <Card key={log.id} className="overflow-hidden">
                  <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">
                        {situationItem?.label || log.situation_type}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{studentName}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(log.created_at).toLocaleDateString()} at{" "}
                            {new Date(log.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          variant={log.effectiveness_rating === rating ? "default" : "outline"}
                          size="sm"
                          className="h-8 w-8 p-0"
                          disabled={isEffectivenessSaving}
                          onClick={() => updateEffectiveness(log.id, rating)}
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-sm font-medium">Strategy used:</span>
                      <p className="mt-1">{log.intervention_used}</p>
                    </div>
                    {log.notes && (
                      <div className="mt-3">
                        <span className="text-sm font-medium">Notes:</span>
                        <p className="mt-1 text-sm text-muted-foreground">{log.notes}</p>
                      </div>
                    )}
                    {log.effectiveness_rating && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-sm font-medium">Effectiveness:</span>
                        <div className="flex gap-1">
                          {Array.from({ length: log.effectiveness_rating }).map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                          ))}
                          {Array.from({ length: 5 - log.effectiveness_rating }).map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-muted" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Interventions Logged</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              When you log interventions using the Assist tab, they'll appear here for tracking and analysis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InterventionHistory;
