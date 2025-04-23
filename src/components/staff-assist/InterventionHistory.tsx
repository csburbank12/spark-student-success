
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Download } from "lucide-react";
import { behaviorSituations } from "./constants";
import { StudentProfile, BehaviorLog } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

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
  const isMobile = useIsMobile();

  const exportData = () => {
    // Create CSV data
    const headers = ["Date", "Student", "Situation", "Intervention", "Notes", "Effectiveness"];
    const csvData = behaviorLogs.map(log => {
      const student = students?.find(s => s.id === log.student_id);
      const studentName = student ? `${student.first_name} ${student.last_name}` : "No specific student";
      const situationItem = behaviorSituations.find(s => s.id === log.situation_type);
      
      return [
        new Date(log.created_at).toLocaleString(),
        studentName,
        situationItem?.label || log.situation_type,
        log.intervention_used,
        log.notes || "",
        log.effectiveness_rating || ""
      ];
    });
    
    // Combine headers and data
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `intervention_history_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"></div>
        <p>Loading intervention history...</p>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>Intervention History</CardTitle>
            <CardDescription>
              Track patterns and effectiveness of previous interventions
            </CardDescription>
          </div>
          {behaviorLogs.length > 0 && (
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={exportData}
              className="self-start md:self-auto flex gap-2"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {behaviorLogs && behaviorLogs.length > 0 ? (
          <div className="space-y-4">
            {isMobile ? (
              // Mobile card view
              behaviorLogs.map((log) => {
                const student = students?.find(s => s.id === log.student_id);
                const studentName = student ? `${student.first_name} ${student.last_name}` : "No specific student";
                const situationItem = behaviorSituations.find(s => s.id === log.situation_type);

                return (
                  <Card key={log.id} className="overflow-hidden">
                    <div className="p-3 border-b bg-muted/30 flex flex-col gap-2">
                      <div>
                        <h4 className="font-medium">
                          {situationItem?.label || log.situation_type}
                        </h4>
                        <div className="flex flex-col text-xs text-muted-foreground mt-1">
                          <span>{studentName}</span>
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
                      <div className="flex justify-center items-center gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant={log.effectiveness_rating === rating ? "default" : "outline"}
                            size="sm"
                            className="h-7 w-7 p-0"
                            disabled={isEffectivenessSaving}
                            onClick={() => updateEffectiveness(log.id, rating)}
                          >
                            {rating}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="mb-2">
                        <span className="text-xs font-medium">Strategy used:</span>
                        <p className="mt-1 text-sm">{log.intervention_used}</p>
                      </div>
                      {log.notes && (
                        <div className="mt-2">
                          <span className="text-xs font-medium">Notes:</span>
                          <p className="mt-1 text-xs text-muted-foreground">{log.notes}</p>
                        </div>
                      )}
                      {log.effectiveness_rating && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-medium">Effectiveness:</span>
                          <div className="flex gap-1">
                            {Array.from({ length: log.effectiveness_rating }).map((_, i) => (
                              <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                            ))}
                            {Array.from({ length: 5 - (log.effectiveness_rating || 0) }).map((_, i) => (
                              <div key={i} className="w-2 h-2 rounded-full bg-muted" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })
            ) : (
              // Desktop table view
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Situation</TableHead>
                    <TableHead>Intervention</TableHead>
                    <TableHead>Effectiveness</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {behaviorLogs.map((log) => {
                    const student = students?.find(s => s.id === log.student_id);
                    const studentName = student ? `${student.first_name} ${student.last_name}` : "No specific student";
                    const situationItem = behaviorSituations.find(s => s.id === log.situation_type);
                    
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap">
                          {new Date(log.created_at).toLocaleDateString()}
                          <div className="text-xs text-muted-foreground">
                            {new Date(log.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </div>
                        </TableCell>
                        <TableCell>{studentName}</TableCell>
                        <TableCell>
                          {situationItem?.label || log.situation_type}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={log.intervention_used}>
                            {log.intervention_used}
                          </div>
                          {log.notes && (
                            <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]" title={log.notes}>
                              {log.notes}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {log.effectiveness_rating ? (
                            <div className="flex gap-1">
                              {Array.from({ length: log.effectiveness_rating }).map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                              ))}
                              {Array.from({ length: 5 - log.effectiveness_rating }).map((_, i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-muted" />
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">Not rated</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <Button
                                key={rating}
                                variant={log.effectiveness_rating === rating ? "default" : "outline"}
                                size="sm"
                                className="h-7 w-7 p-0"
                                disabled={isEffectivenessSaving}
                                onClick={() => updateEffectiveness(log.id, rating)}
                              >
                                {rating}
                              </Button>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
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
