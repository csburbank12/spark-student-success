
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { SmartInterventions } from "./SmartInterventions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check } from "lucide-react";

interface Student {
  id: string;
  name: string;
  photoUrl: string | null;
  grade: string;
  class: string;
  teacher: string;
  status: "at_risk" | "concerning" | "stable";
  confidenceScore: number;
  moodTrend: string;
  absences: number;
  tardies: number;
  behaviorReports: number;
  currentInterventions: string[];
}

interface Intervention {
  id: string;
  title: string;
  type: string;
  status: "pending" | "in-progress" | "completed";
  assignedBy: string;
  assignedDate: string;
  impact?: {
    score: number;
    description: string;
  };
}

interface StudentInterventionsProps {
  student: Student;
}

export const StudentInterventions: React.FC<StudentInterventionsProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState("active");
  
  // Mock interventions
  const mockInterventions: Intervention[] = [
    {
      id: "int1",
      title: "Weekly check-in with counselor",
      type: "Counseling",
      status: "in-progress",
      assignedBy: "Ms. Wilson",
      assignedDate: "2025-02-12",
      impact: {
        score: 65,
        description: "Slight improvement in mood reported"
      }
    },
    {
      id: "int2",
      title: "Parent conference",
      type: "Communication",
      status: "completed",
      assignedBy: "Mr. Johnson",
      assignedDate: "2025-01-15",
      impact: {
        score: 85,
        description: "Significant improvement in attendance"
      }
    },
    {
      id: "int3",
      title: "Daily mood check with teacher",
      type: "Monitoring",
      status: "pending",
      assignedBy: "System",
      assignedDate: "2025-04-22",
    }
  ];
  
  // Filter interventions based on active tab
  const filteredInterventions = mockInterventions.filter(intervention => {
    if (activeTab === "active") {
      return intervention.status === "in-progress" || intervention.status === "pending";
    }
    if (activeTab === "completed") {
      return intervention.status === "completed";
    }
    return true;
  });

  const handleFollowUp = () => {
    toast.success("Follow-up message sent to the team");
  };
  
  const handleMarkComplete = (id: string) => {
    toast.success(`Intervention marked as complete`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
          <TabsTrigger value="recommend" className="flex-1">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 pt-2">
          {filteredInterventions.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No active interventions</p>
          ) : (
            filteredInterventions.map(intervention => (
              <Card key={intervention.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{intervention.title}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {intervention.type}
                      </div>
                    </div>
                    {getStatusBadge(intervention.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Assigned by {intervention.assignedBy} on{" "}
                      {new Date(intervention.assignedDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {intervention.impact && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Impact</span>
                        <span className="font-medium">{intervention.impact.score}%</span>
                      </div>
                      <Progress value={intervention.impact.score} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">
                        {intervention.impact.description}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {intervention.status === "in-progress" && (
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => handleMarkComplete(intervention.id)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Mark Complete
                      </Button>
                    )}
                    
                    {intervention.status === "pending" && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                      >
                        Start Intervention
                      </Button>
                    )}
                    
                    <Button size="sm" variant="outline" onClick={handleFollowUp}>
                      Follow Up
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 pt-2">
          {mockInterventions.filter(i => i.status === "completed").length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No completed interventions</p>
          ) : (
            mockInterventions
              .filter(i => i.status === "completed")
              .map(intervention => (
                <Card key={intervention.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{intervention.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {intervention.type}
                        </div>
                      </div>
                      {getStatusBadge(intervention.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Assigned by {intervention.assignedBy} on{" "}
                        {new Date(intervention.assignedDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {intervention.impact && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Impact</span>
                          <span className="font-medium">{intervention.impact.score}%</span>
                        </div>
                        <Progress value={intervention.impact.score} className="h-1.5" />
                        <p className="text-xs text-muted-foreground">
                          {intervention.impact.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
        
        <TabsContent value="recommend" className="pt-2">
          <SmartInterventions student={student} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
