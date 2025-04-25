
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, Info, Users } from "lucide-react";

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

interface InterventionRecommendation {
  id: string;
  title: string;
  description: string;
  type: string;
  confidenceScore: number;
  source: string;
  targetArea: string;
  urgency: "high" | "medium" | "low";
  estimatedImpact: "high" | "medium" | "low";
}

interface SmartInterventionsProps {
  student: Student;
}

export const SmartInterventions: React.FC<SmartInterventionsProps> = ({ student }) => {
  // Generate recommended interventions based on student status and data
  const getRecommendations = (): InterventionRecommendation[] => {
    const recommendations: InterventionRecommendation[] = [];
    
    // Default recommendation for all students with issues
    if (student.status === "at_risk" || student.status === "concerning") {
      if (student.moodTrend.includes("decline")) {
        recommendations.push({
          id: "rec1",
          title: "Daily Mood Check-In",
          description: "Schedule brief (1-2 minute) check-ins at the beginning and end of each day to assess mood and provide support.",
          type: "Emotional Support",
          confidenceScore: 92,
          source: "CASEL",
          targetArea: "Emotional Regulation",
          urgency: "high",
          estimatedImpact: "high"
        });
      }
      
      if (student.absences >= 3) {
        recommendations.push({
          id: "rec2",
          title: "Attendance Success Plan",
          description: "Create a personalized attendance plan with the student that includes goals, incentives, and check-ins.",
          type: "Attendance",
          confidenceScore: 87,
          source: "PBISWorld",
          targetArea: "School Engagement",
          urgency: student.absences > 4 ? "high" : "medium",
          estimatedImpact: "high"
        });
      }
      
      if (student.behaviorReports > 0) {
        recommendations.push({
          id: "rec3",
          title: "Behavior Reflection Journal",
          description: "Implement a structured reflection process for the student to identify triggers and practice alternative responses.",
          type: "Behavioral",
          confidenceScore: 84,
          source: "Internal SEL Library",
          targetArea: "Self-Regulation",
          urgency: "medium",
          estimatedImpact: "medium"
        });
      }
      
      // For severely at-risk students
      if (student.status === "at_risk" && student.confidenceScore > 80) {
        recommendations.push({
          id: "rec4",
          title: "Student Support Team Meeting",
          description: "Convene a formal SST meeting with counselors, teachers, and administrators to create a comprehensive support plan.",
          type: "Multi-Tiered Support",
          confidenceScore: 95,
          source: "Best Practice",
          targetArea: "Comprehensive Support",
          urgency: "high",
          estimatedImpact: "high"
        });
      }
    }
    
    // If no specific recommendations were generated, add a general one
    if (recommendations.length === 0) {
      recommendations.push({
        id: "rec-default",
        title: "Wellness Check-In",
        description: "Schedule an informal conversation to discuss the student's overall well-being and any emerging concerns.",
        type: "General Support",
        confidenceScore: 76,
        source: "WellLens AI",
        targetArea: "General Wellness",
        urgency: "low",
        estimatedImpact: "medium"
      });
    }
    
    return recommendations;
  };
  
  const recommendations = getRecommendations();
  
  const handleAssignIntervention = (intervention: InterventionRecommendation) => {
    toast.success(`Assigned "${intervention.title}" to ${student.name}`, {
      description: "The intervention has been added to the student's plan."
    });
  };
  
  const getUrgencyBadge = (urgency: "high" | "medium" | "low") => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive">Urgent</Badge>;
      case "medium":
        return <Badge variant="default">Important</Badge>;
      case "low":
        return <Badge variant="secondary">Suggested</Badge>;
      default:
        return null;
    }
  };
  
  const getImpactBadge = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">High Impact</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium Impact</Badge>;
      case "low":
        return <Badge variant="outline">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium">AI-Powered Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            Based on student data, trends, and research
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 border-blue-300 flex gap-1 items-center">
          <Info className="h-3 w-3" />
          WellLens AI
        </Badge>
      </div>
      
      {recommendations.map(intervention => (
        <Card key={intervention.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle className="text-base">{intervention.title}</CardTitle>
              {getUrgencyBadge(intervention.urgency)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{intervention.description}</p>
            
            <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{intervention.targetArea}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{intervention.confidenceScore}% match</span>
              </div>
              <div>
                {getImpactBadge(intervention.estimatedImpact)}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-muted-foreground">
                Source: {intervention.source}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Details</Button>
                <Button 
                  size="sm" 
                  onClick={() => handleAssignIntervention(intervention)}
                >
                  Assign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
