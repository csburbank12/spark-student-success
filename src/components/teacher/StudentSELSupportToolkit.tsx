
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface StudentSELSupportToolkitProps {
  studentId: string;
  studentName: string;
  recentMood?: string;
}

export const StudentSELSupportToolkit: React.FC<StudentSELSupportToolkitProps> = ({
  studentId,
  studentName,
  recentMood
}) => {
  // Fetch SEL recommendations based on student's recent mood and history
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["student-sel-recommendations", studentId, recentMood],
    queryFn: async () => {
      // This would be a real API call in production
      // Mock data for demonstration purposes
      return [
        {
          id: "rec1",
          type: "activity",
          title: "5-Minute Mindfulness Break",
          description: "A quick mindfulness session to help refocus attention",
          tags: ["Focus", "Calm"]
        },
        {
          id: "rec2",
          type: "lesson",
          title: "Managing Test Anxiety",
          description: "Learn practical strategies for managing test-related stress",
          tags: ["Anxiety", "Self-Management"]
        },
        {
          id: "rec3",
          type: "resource",
          title: "Emotional Vocabulary Builder",
          description: "Help students better identify and express their feelings",
          tags: ["Self-Awareness", "Communication"]
        },
        {
          id: "rec4",
          type: "strategy",
          title: "Positive Self-Talk Exercise",
          description: "Guide for practicing positive self-affirmations",
          tags: ["Confidence", "Resilience"]
        }
      ];
    },
    enabled: !!studentId
  });

  const handleAssignSEL = (recommendationId: string, title: string) => {
    toast.success(`Assigned "${title}" to ${studentName}`);
  };

  const handleScheduleCheckIn = () => {
    toast.success(`Check-in scheduled with ${studentName}`);
  };

  const handleContactCounselor = () => {
    toast.success(`Message sent to counselor about ${studentName}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Student Support Toolkit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Student Support Toolkit</span>
          {recentMood && (
            <Badge className={
              recentMood === "happy" ? "bg-green-100 text-green-800" :
              recentMood === "okay" ? "bg-blue-100 text-blue-800" :
              recentMood === "tired" ? "bg-purple-100 text-purple-800" :
              recentMood === "anxious" ? "bg-yellow-100 text-yellow-800" :
              recentMood === "sad" ? "bg-indigo-100 text-indigo-800" :
              "bg-gray-100 text-gray-800"
            }>
              {recentMood.charAt(0).toUpperCase() + recentMood.slice(1)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recommended Support Strategies</h4>
          {recommendations && recommendations.length > 0 ? (
            recommendations.slice(0, 3).map(recommendation => (
              <div key={recommendation.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium text-sm">{recommendation.title}</div>
                  <div className="text-xs text-muted-foreground">{recommendation.tags.join(" • ")}</div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAssignSEL(recommendation.id, recommendation.title)}
                >
                  <BookOpen className="h-3.5 w-3.5 mr-1" /> Assign
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recommendations available</p>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            size="sm" 
            variant="default" 
            className="justify-start"
            onClick={handleScheduleCheckIn}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Schedule Check-In
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="justify-start"
            onClick={handleContactCounselor}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Notify Counselor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSELSupportToolkit;
