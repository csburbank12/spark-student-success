import React from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/sonner";
import { PlayCircle, CheckCircle, BookOpen, Clock, ArrowUp, ArrowDown } from "lucide-react";
import SELLessonPlayer from "@/components/sel-pathways/SELLessonPlayer";
import SELAssignmentCard from "@/components/sel-pathways/SELAssignmentCard";
import SELCompletedLessonsTable from "@/components/sel-pathways/SELCompletedLessonsTable";
import { SELLesson } from "@/hooks/useSELRecommendations";
import { SelAssignment, SelProgress } from "@/components/sel-pathways/types";

interface Props {
  lessons?: SelLesson[];
}

const PersonalizedSELPathways: React.FC<Props> = ({ lessons }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedLesson, setSelectedLesson] = useState<SELLesson | null>(null);
  const [activeTab, setActiveTab] = useState("assigned");

  // Fetch SEL pathway assignments for the current user
  const { data: selAssignments = [], isLoading: loadingAssignments } = useQuery({
    queryKey: ["sel-assignments", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("sel_assignments")
        .select(`
          *,
          sel_lessons:lesson_id(*)
        `)
        .eq("student_id", user.id)
        .order("assigned_at", { ascending: false });
        
      if (error) throw error;
      
      // Map assignments to include needed fields
      return (data || []).map(assignment => {
        if (assignment.sel_lessons) {
          const lesson = assignment.sel_lessons as any;
          return {
            ...assignment,
            sel_lessons: {
              ...lesson,
              pathway: lesson.competency_area,
              duration: lesson.estimated_duration,
              difficulty: 'Standard',
              content: lesson.description
            }
          };
        }
        return assignment;
      }) as SelAssignment[];
    },
    enabled: !!user?.id,
  });

  // Fetch completed lessons for the student
  const { data: completedLessons = [], isLoading: loadingCompleted } = useQuery({
    queryKey: ["sel-completed", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("sel_progress")
        .select(`
          *,
          sel_lessons:lesson_id(*)
        `)
        .eq("student_id", user.id)
        .eq("completed", true)
        .order("completed_at", { ascending: false });
        
      if (error) throw error;
      
      // Map progress to include needed fields
      return (data || []).map(progress => {
        if (progress.sel_lessons) {
          const lesson = progress.sel_lessons as any;
          return {
            ...progress,
            sel_lessons: {
              ...lesson,
              pathway: lesson.competency_area,
              duration: lesson.estimated_duration,
              content: lesson.description
            }
          };
        }
        return progress;
      }) as SelProgress[];
    },
    enabled: !!user?.id,
  });

  // Mark lesson as complete
  const markLessonComplete = useMutation({
    mutationFn: async (lessonId: string) => {
      if (!user?.id) throw new Error("User not logged in");
      // First check if there's already a progress record
      const { data: existingProgress } = await supabase
        .from("sel_progress")
        .select("*")
        .eq("student_id", user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle();

      if (existingProgress) {
        const { error } = await supabase
          .from("sel_progress")
          .update({
            completed: true,
            completed_at: new Date().toISOString(),
            progress: 100,
          })
          .eq("id", existingProgress.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("sel_progress")
          .insert({
            student_id: user.id,
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString(),
            progress: 100,
          });
        if (error) throw error;
      }

      // Update assignment status
      await supabase
        .from("sel_assignments")
        .update({ status: "completed" })
        .eq("student_id", user.id)
        .eq("lesson_id", lessonId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sel-assignments", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["sel-completed", user?.id] });
      toast("Lesson completed! Great job!", {
        description: "Your progress has been saved.",
      });
      setSelectedLesson(null);
    },
    onError: (error: any) => {
      toast("Error saving progress", {
        description: error.message,
      });
    },
  });

  // Calculate overall pathway progress
  const calculateProgress = () => {
    if (!selAssignments || selAssignments.length === 0) return 0;
    const totalAssignments = selAssignments.length;
    const completedAssignments = selAssignments.filter((a) => a.status === "completed").length;
    return Math.round((completedAssignments / totalAssignments) * 100);
  };

  // Handle lesson start
  const handleStartLesson = (assignment: SelAssignment) => {
    if (assignment.sel_lessons) {
      setSelectedLesson({
        ...assignment.sel_lessons,
        content: assignment.sel_lessons.description || assignment.sel_lessons.content || ""
      });
    }
  };

  // Handle lesson completion
  const handleCompleteLesson = () => {
    if (selectedLesson) {
      markLessonComplete.mutate(selectedLesson.id);
    }
  };

  const pendingAssignments = selAssignments?.filter((a) => a.status !== "completed") || [];
  const progress = calculateProgress();

  // Group assignments by pathway (using competency_area as pathway)
  const groupedAssignments = pendingAssignments.reduce((acc: Record<string, SelAssignment[]>, curr: SelAssignment) => {
    const pathway = curr.sel_lessons?.competency_area || "General";
    if (!acc[pathway]) {
      acc[pathway] = [];
    }
    acc[pathway].push(curr);
    return acc;
  }, {} as Record<string, SelAssignment[]>);

  if (loadingAssignments || loadingCompleted) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  // Prepare the selected lesson for the player if exists
  const preparedSelectedLesson = selectedLesson ? {
    id: selectedLesson.id,
    title: selectedLesson.title,
    description: selectedLesson.description || "",
    content: selectedLesson.description || selectedLesson.content || "",
    pathway: selectedLesson.competency_area || selectedLesson.pathway || "",
    duration: selectedLesson.estimated_duration || selectedLesson.duration || 5,
    difficulty: selectedLesson.difficulty || "Standard",
    media_url: selectedLesson.content_url
  } : null;

  // Format completed lessons for the table component
  const formattedCompletedLessons = completedLessons.map(lesson => ({
    id: lesson.id,
    completed_at: lesson.completed_at || new Date().toISOString(),
    sel_lessons: {
      id: lesson.sel_lessons?.id || "",
      title: lesson.sel_lessons?.title || "",
      pathway: lesson.sel_lessons?.pathway || lesson.sel_lessons?.competency_area || "",
      duration: lesson.sel_lessons?.duration || lesson.sel_lessons?.estimated_duration || 0
    }
  }));

  return (
    <div className="space-y-6">
      {preparedSelectedLesson ? (
        <SELLessonPlayer
          lesson={preparedSelectedLesson}
          onComplete={handleCompleteLesson}
          onBack={() => setSelectedLesson(null)}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-heading font-bold">SEL Learning Pathways</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                Track your social-emotional learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold">{progress}%</span>
                    <span className="text-muted-foreground ml-2">Complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {pendingAssignments.length} Pending
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {completedLessons?.length || 0} Completed
                    </Badge>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assigned">Assigned Lessons</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="assigned" className="space-y-6 mt-6">
              {Object.entries(groupedAssignments).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Lessons Assigned Yet</h3>
                    <p className="text-muted-foreground">
                      Your personalized lessons will appear here based on your check-ins and activities.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                Object.entries(groupedAssignments).map(([pathway, assignments]) => (
                  <div key={pathway} className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      {pathway === "Self-Awareness" && <ArrowUp className="text-blue-500" />}
                      {pathway === "Self-Management" && <ArrowUp className="text-green-500" />}
                      {pathway === "Social Awareness" && <ArrowUp className="text-purple-500" />}
                      {pathway} Pathway
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {assignments.map((assignment) => (
                        <SELAssignmentCard
                          key={assignment.id}
                          assignment={assignment as any}
                          onStart={() => handleStartLesson(assignment)}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <SELCompletedLessonsTable lessons={formattedCompletedLessons} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PersonalizedSELPathways;
