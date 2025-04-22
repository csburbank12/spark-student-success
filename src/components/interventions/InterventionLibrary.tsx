
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import InterventionCard from "./InterventionCard";
import { getChallengeColor } from "./intervention-utils";

export type ChallengeArea = "emotional" | "academic" | "social" | "behavioral" | "attendance";

export interface Intervention {
  id: string;
  title: string;
  description: string;
  targetArea: ChallengeArea;
  strategy: string;
  rationale: string;
  resources?: {
    type: "pdf" | "video" | "slides" | "link";
    title: string;
    url: string;
  }[];
}

interface InterventionLibraryProps {
  studentId?: string;
  studentName?: string;
  flaggedAreas: ChallengeArea[];
}

// Mock intervention library data
const interventions: Intervention[] = [
  {
    id: "int1",
    title: "Daily Check-in Strategy",
    description: "Brief daily 2-minute check-ins with student to build connection and monitor emotional state",
    targetArea: "emotional",
    strategy: "Schedule brief daily check-ins with student at the beginning of the day",
    rationale: "From CASEL: Regular connection with a trusted adult reduces emotional volatility and builds self-regulation skills",
    resources: [
      {
        type: "pdf",
        title: "Check-in Question Bank",
        url: "/resources/check-in-questions.pdf"
      },
      {
        type: "video",
        title: "Effective Check-ins Tutorial",
        url: "/resources/check-in-tutorial.mp4"
      }
    ]
  },
  {
    id: "int2",
    title: "Academic Goal Setting",
    description: "Structured goal setting approach for students struggling with academic motivation",
    targetArea: "academic",
    strategy: "Help student set small, achievable weekly goals with visual tracking system",
    rationale: "Research shows breaking larger academic tasks into smaller goals with visible progress tracking increases motivation and completion rates",
    resources: [
      {
        type: "pdf",
        title: "Goal Setting Template",
        url: "/resources/goal-template.pdf"
      },
      {
        type: "slides",
        title: "Effective Goal Setting Presentation",
        url: "/resources/goal-setting.pptx"
      }
    ]
  },
  {
    id: "int3",
    title: "Social Skills Small Group",
    description: "Targeted small group sessions focused on peer relationships and communication",
    targetArea: "social",
    strategy: "Include student in twice-weekly small group focused on friendship skills and communication",
    rationale: "Research from American School Counselor Association shows practice of social skills in small group settings with feedback improves peer interactions",
    resources: [
      {
        type: "pdf",
        title: "Social Skills Curriculum",
        url: "/resources/social-skills.pdf"
      },
      {
        type: "video",
        title: "Small Group Facilitation Guide",
        url: "/resources/group-facilitation.mp4"
      }
    ]
  },
  {
    id: "int4",
    title: "Behavior Contract with Reinforcement",
    description: "Individualized behavior plan with clear expectations and reinforcement system",
    targetArea: "behavioral",
    strategy: "Create simple behavior contract with 2-3 specific goals and immediate reinforcement system",
    rationale: "Behavioral research shows clearly defined expectations coupled with immediate positive reinforcement significantly reduces disruptive behaviors",
    resources: [
      {
        type: "pdf",
        title: "Behavior Contract Template",
        url: "/resources/behavior-contract.pdf"
      }
    ]
  },
  {
    id: "int5",
    title: "Attendance Improvement Plan",
    description: "Structured plan to improve attendance through monitoring and positive reinforcement",
    targetArea: "attendance",
    strategy: "Implement check-in/check-out system with weekly attendance goals and rewards",
    rationale: "Research shows that attendance monitoring with positive reinforcement can increase attendance rates by 15% or more",
    resources: [
      {
        type: "pdf",
        title: "Attendance Monitoring Form",
        url: "/resources/attendance-form.pdf"
      },
      {
        type: "link",
        title: "Attendance Works - Evidence-based Strategies",
        url: "https://www.attendanceworks.org/resources/strategies/"
      }
    ]
  }
];

const InterventionLibrary: React.FC<InterventionLibraryProps> = ({
  studentId,
  studentName,
  flaggedAreas
}) => {
  const filteredInterventions = flaggedAreas.length > 0
    ? interventions.filter(intervention => flaggedAreas.includes(intervention.targetArea))
    : interventions;

  const handleApplyIntervention = (intervention: Intervention) => {
    toast.success(`Intervention "${intervention.title}" applied to ${studentName || "student"}`);
  };
    
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {studentName ? `Recommended Interventions for ${studentName}` : "Intervention Library"}
        </CardTitle>
        {flaggedAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {flaggedAreas.map(area => (
              <Badge key={area} className={getChallengeColor(area)}>
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-5 pb-3">
        {filteredInterventions.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No interventions found.</p>
        ) : (
          filteredInterventions.map(intervention => (
            <InterventionCard
              key={intervention.id}
              intervention={intervention}
              studentName={studentName}
              onApply={handleApplyIntervention}
            />
          ))
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <Button variant="outline" size="sm">
          Custom Intervention
        </Button>
        <Button variant="outline" size="sm">
          View All Interventions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterventionLibrary;
