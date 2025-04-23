
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle } from "lucide-react";

interface SELAssignmentCardProps {
  assignment: {
    id: string;
    assigned_at: string;
    due_date?: string;
    sel_lessons: {
      id: string;
      title: string;
      description: string;
      pathway: string;
      duration: number;
      difficulty: string;
    };
  };
  onStart: () => void;
}

const SELAssignmentCard: React.FC<SELAssignmentCardProps> = ({ assignment, onStart }) => {
  // Get the lesson from the assignment
  const lesson = assignment.sel_lessons;
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Get pathway color
  const getPathwayColor = (pathway: string) => {
    switch (pathway?.toLowerCase()) {
      case 'anxiety':
        return "bg-blue-100 text-blue-800";
      case 'focus':
        return "bg-green-100 text-green-800";
      case 'social':
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return "bg-emerald-100 text-emerald-800";
      case 'intermediate':
        return "bg-amber-100 text-amber-800";
      case 'advanced':
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{lesson.title}</CardTitle>
        </div>
        <CardDescription>
          {lesson.description?.length > 100
            ? `${lesson.description.substring(0, 100)}...`
            : lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getPathwayColor(lesson.pathway)}>
            {lesson.pathway}
          </Badge>
          {lesson.difficulty && (
            <Badge className={getDifficultyColor(lesson.difficulty)}>
              {lesson.difficulty}
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.duration} min
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          <div>Assigned: {formatDate(assignment.assigned_at)}</div>
          {assignment.due_date && (
            <div className="mt-1">Due: {formatDate(assignment.due_date)}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 mt-auto">
        <Button onClick={onStart} className="w-full">
          <PlayCircle className="mr-2 h-4 w-4" /> Start Lesson
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SELAssignmentCard;
