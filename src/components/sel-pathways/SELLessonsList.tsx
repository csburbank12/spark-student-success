
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, PlusCircle } from "lucide-react";

interface SELLessonsListProps {
  lessons: Array<{
    id: string;
    title: string;
    description: string;
    pathway: string;
    duration: number;
    difficulty: string;
  }>;
  studentData: any;
  onAssign: (lesson: any) => void;
}

const SELLessonsList: React.FC<SELLessonsListProps> = ({ 
  lessons, 
  studentData, 
  onAssign 
}) => {
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

  // Check if lesson already assigned
  const isLessonAssigned = (lessonId: string) => {
    if (!studentData || !studentData.assignments) return false;
    return studentData.assignments.some((a: any) => a.lesson_id === lessonId);
  };

  // Check if lesson completed
  const isLessonCompleted = (lessonId: string) => {
    if (!studentData || !studentData.progress) return false;
    return studentData.progress.some((p: any) => 
      p.lesson_id === lessonId && p.completed
    );
  };

  // Get lesson status
  const getLessonStatus = (lessonId: string) => {
    if (isLessonCompleted(lessonId)) return "Completed";
    if (isLessonAssigned(lessonId)) return "Assigned";
    return "Not Assigned";
  };

  // If no lessons
  if (!lessons.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No lessons found matching your search criteria
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lesson Title</TableHead>
          <TableHead>Pathway</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lessons.map((lesson) => {
          const status = getLessonStatus(lesson.id);
          
          return (
            <TableRow key={lesson.id}>
              <TableCell className="font-medium">{lesson.title}</TableCell>
              <TableCell>
                <Badge className={getPathwayColor(lesson.pathway)}>
                  {lesson.pathway}
                </Badge>
              </TableCell>
              <TableCell>
                {lesson.difficulty && (
                  <Badge className={getDifficultyColor(lesson.difficulty)}>
                    {lesson.difficulty}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>{lesson.duration} min</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={
                  status === "Completed" ? "secondary" : 
                  status === "Assigned" ? "outline" : 
                  "default"
                }>
                  {status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onAssign(lesson)}
                  disabled={status === "Completed"}
                  title={status === "Completed" ? "Already completed" : "Assign this lesson"}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SELLessonsList;
