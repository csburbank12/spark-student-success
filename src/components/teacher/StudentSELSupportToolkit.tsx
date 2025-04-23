
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSELRecommendations, useAssignSELLesson, SELLesson } from "@/hooks/useSELRecommendations";
import { Calendar, CheckCircle, Bell, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface StudentSELSupportToolkitProps {
  studentId: string;
  studentName: string;
  recentMood?: string;
}

export const StudentSELSupportToolkit: React.FC<StudentSELSupportToolkitProps> = ({
  studentId,
  studentName,
  recentMood,
}) => {
  const { toast } = useToast();
  const [isAssigningLesson, setIsAssigningLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<SELLesson | null>(null);
  
  const { recommendedLessons, isLoading } = useSELRecommendations(studentId, recentMood);
  const { assignLesson } = useAssignSELLesson();

  const handleAssignLesson = async (lessonId: string) => {
    setIsAssigningLesson(true);
    const success = await assignLesson(studentId, lessonId);
    setIsAssigningLesson(false);
    
    if (success) {
      toast({
        title: "Lesson assigned",
        description: `SEL lesson has been assigned to ${studentName}`,
      });
    } else {
      toast({
        title: "Failed to assign lesson",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleScheduleCheckIn = () => {
    toast({
      title: "Check-in scheduled",
      description: `A check-in has been scheduled with ${studentName}`,
    });
  };

  const handleNotifyCounselor = () => {
    toast({
      title: "Counselor notified",
      description: `The school counselor has been notified about ${studentName}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Support Toolkit</CardTitle>
        <CardDescription>AI-suggested SEL lessons and strategies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        ) : (
          <>
            {recentMood && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-1">Recent mood</div>
                <Badge variant="secondary" className="text-base">{recentMood}</Badge>
              </div>
            )}

            <div className="space-y-3">
              <div className="text-sm font-medium mb-1">Suggested strategies</div>
              {recommendedLessons.slice(0, 2).map((lesson) => (
                <div key={lesson.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{lesson.title}</div>
                    <Badge variant="outline">{lesson.competency_area}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                  <Button 
                    size="sm" 
                    onClick={() => handleAssignLesson(lesson.id)}
                    disabled={isAssigningLesson}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Assign Lesson
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button variant="outline" onClick={handleScheduleCheckIn}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Check-In
              </Button>
              <Button variant="outline" onClick={handleNotifyCounselor}>
                <Bell className="mr-2 h-4 w-4" />
                Notify Counselor
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View All Lessons
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>All SEL Lessons</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    {recommendedLessons.map((lesson) => (
                      <div key={lesson.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{lesson.title}</div>
                          <Badge>{lesson.competency_area}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            {lesson.estimated_duration} min • {lesson.activity_type}
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => {
                              handleAssignLesson(lesson.id);
                              setSelectedLesson(null);
                            }}
                            disabled={isAssigningLesson}
                          >
                            Assign
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
