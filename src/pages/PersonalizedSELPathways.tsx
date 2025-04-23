
import React, { useState, useEffect } from "react";
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

const PersonalizedSELPathways: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("assigned");

  // Fetch SEL pathway assignments for the current user
  const { data: selAssignments, isLoading: loadingAssignments } = useQuery({
    queryKey: ["sel-assignments", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("sel_assignments")
        .select(`
          *,
          sel_lessons (*)
        `)
        .eq("student_id", user.id)
        .order("assigned_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch completed lessons for the student
  const { data: completedLessons, isLoading: loadingCompleted } = useQuery({
    queryKey: ["sel-completed", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("sel_progress")
        .select(`
          *,
          sel_lessons (*)
        `)
        .eq("student_id", user.id)
        .eq("completed", true)
        .order("completed_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
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
        .single();
      
      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from("sel_progress")
          .update({ 
            completed: true, 
            completed_at: new Date().toISOString(),
            progress: 100
          })
          .eq("id", existingProgress.id);
        
        if (error) throw error;
      } else {
        // Create new progress record
        const { error } = await supabase
          .from("sel_progress")
          .insert({
            student_id: user.id,
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString(),
            progress: 100
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
        description: "Your progress has been saved."
      });
      setSelectedLesson(null);
    },
    onError: (error) => {
      toast("Error saving progress", {
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Calculate overall pathway progress
  const calculateProgress = () => {
    if (!selAssignments || selAssignments.length === 0) return 0;
    
    const totalAssignments = selAssignments.length;
    const completedAssignments = selAssignments.filter(a => a.status === "completed").length;
    
    return Math.round((completedAssignments / totalAssignments) * 100);
  };

  // Handle lesson start
  const handleStartLesson = (assignment: any) => {
    setSelectedLesson(assignment.sel_lessons);
  };

  // Handle lesson completion
  const handleCompleteLesson = () => {
    if (selectedLesson) {
      markLessonComplete.mutate(selectedLesson.id);
    }
  };

  const pendingAssignments = selAssignments?.filter(a => a.status !== "completed") || [];
  const progress = calculateProgress();

  // Group assignments by pathway
  const groupedAssignments = pendingAssignments.reduce((acc: any, curr: any) => {
    const pathway = curr.sel_lessons.pathway || "General";
    if (!acc[pathway]) {
      acc[pathway] = [];
    }
    acc[pathway].push(curr);
    return acc;
  }, {});

  if (loadingAssignments || loadingCompleted) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedLesson ? (
        <SELLessonPlayer 
          lesson={selectedLesson} 
          onComplete={handleCompleteLesson}
          onBack={() => setSelectedLesson(null)}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-heading font-bold">
              SEL Learning Pathways
            </h2>
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
                Object.entries(groupedAssignments).map(([pathway, assignments]: [string, any]) => (
                  <div key={pathway} className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      {pathway === "Anxiety" && <ArrowDown className="text-blue-500" />}
                      {pathway === "Focus" && <ArrowUp className="text-green-500" />}
                      {pathway === "Social" && <ArrowUp className="text-purple-500" />}
                      {pathway} Pathway
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {assignments.map((assignment: any) => (
                        <SELAssignmentCard 
                          key={assignment.id} 
                          assignment={assignment} 
                          onStart={() => handleStartLesson(assignment)}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <SELCompletedLessonsTable lessons={completedLessons || []} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PersonalizedSELPathways;
