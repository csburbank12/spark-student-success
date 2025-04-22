
import React from "react";
import RecommendedInterventions from "../RecommendedInterventions";
import { Student } from "../PredictiveSupportEngine";
import { HeartPulse, BookOpen, Bell } from "lucide-react";

interface RecommendedInterventionsSectionProps {
  student: Student;
}

const recommendedInterventions = [
  {
    id: "rec1",
    title: "Weekly Counselor Check-in",
    description: "Regular check-ins to monitor progress and provide support",
    type: "SEL",
    impact: 85,
    confidence: 92,
    icon: <HeartPulse className="h-4 w-4 text-rose-500" />
  },
  {
    id: "rec2",
    title: "Academic Support Group",
    description: "Small group tutoring focusing on math skills",
    type: "Academic",
    impact: 75,
    confidence: 88,
    icon: <BookOpen className="h-4 w-4 text-blue-500" />
  },
  {
    id: "rec3",
    title: "Daily Mood Check-in Reminder",
    description: "Automated reminder to complete morning check-in",
    type: "Monitoring",
    impact: 65,
    confidence: 78,
    icon: <Bell className="h-4 w-4 text-amber-500" />
  }
];

const RecommendedInterventionsSection: React.FC<RecommendedInterventionsSectionProps> = ({ student }) => (
  <RecommendedInterventions 
    student={student}
    recommendations={recommendedInterventions}
  />
);

export default RecommendedInterventionsSection;
