
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, BookOpen, ArrowLeft, CheckCircle } from "lucide-react";
import { SELLesson, useSELProgress } from "@/hooks/useSELRecommendations";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/types/roles";

const SELLessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateProgress } = useSELProgress();
  const [lessonProgress, setLessonProgress] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  // Fetch lesson details
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["sel-lesson", id],
    queryFn: async () => {
      if (!id) throw new Error("Lesson ID is required");
      
      const { data, error } = await supabase
        .from("sel_lessons")
        .select("*")
        .eq("id", id)
        .single();
        
      if (error) throw error;
      return data as SELLesson;
    },
    enabled: !!id,
  });
  
  // Fetch current progress if user is a student
  const { data: progress } = useQuery({
    queryKey: ["sel-progress", user?.id, id],
    queryFn: async () => {
      if (!user?.id || !id) return null;
      
      const { data, error } = await supabase
        .from("sel_progress")
        .select("*")
        .eq("student_id", user.id)
        .eq("lesson_id", id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id && !!id && user?.role === UserRole.student,
  });
  
  // Set initial progress state
  useEffect(() => {
    if (progress) {
      setLessonProgress(progress.progress);
      setLessonCompleted(progress.completed);
    }
  }, [progress]);
  
  // Mark in-progress when page loads for students
  useEffect(() => {
    if (user?.role === UserRole.student && id && lesson && lessonProgress === 0) {
      updateProgress(id, 10, false);
      setLessonProgress(10);
    }
  }, [user, id, lesson, lessonProgress, updateProgress]);
  
  const handleMarkProgress = async (progress: number) => {
    if (!id || user?.role !== UserRole.student) return;
    
    const completed = progress >= 100;
    const success = await updateProgress(id, progress, completed);
    
    if (success) {
      setLessonProgress(progress);
      setLessonCompleted(completed);
      
      if (completed) {
        toast({
          title: "Activity completed!",
          description: "Great job! You've completed this SEL lesson.",
        });
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-medium mb-2">Lesson not found</h2>
        <p className="text-muted-foreground mb-4">The lesson you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              <CardDescription className="text-base">{lesson.competency_area}</CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {lesson.activity_type}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {user?.role === UserRole.student && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Your Progress</div>
                <div className="text-sm">{lessonProgress}%</div>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${lessonProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="font-medium">About this activity</div>
            <p className="text-muted-foreground">{lesson.description}</p>
            
            {lesson.estimated_duration && (
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>Estimated time: {lesson.estimated_duration} minutes</span>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="activity" className="mt-6">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="reflection">Reflection</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="py-4 space-y-4">
              {lesson.content_url ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  {/* In a real app, this would be an iframe, video player, or content loader */}
                  <div className="text-center p-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <div className="font-medium">Activity Content</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      This is where the activity content would be displayed from {lesson.content_url}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-muted p-8 rounded-lg text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="font-medium">Activity Content</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Example activity content for "{lesson.title}"
                  </p>
                </div>
              )}
              
              {user?.role === UserRole.student && !lessonCompleted && lessonProgress < 50 && (
                <Button 
                  className="w-full" 
                  onClick={() => handleMarkProgress(50)}
                >
                  Mark as In Progress (50%)
                </Button>
              )}
            </TabsContent>
            
            <TabsContent value="strategies" className="py-4 space-y-4">
              <div className="bg-muted p-6 rounded-lg">
                <h4 className="font-medium mb-3">Helpful Strategies</h4>
                <ul className="space-y-3">
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Take deep breaths when feeling overwhelmed</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Practice positive self-talk when facing challenges</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Identify your emotions before responding to difficult situations</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Use "I" statements when communicating feelings</span>
                  </li>
                </ul>
              </div>
              
              {user?.role === UserRole.student && !lessonCompleted && lessonProgress < 75 && (
                <Button 
                  className="w-full" 
                  onClick={() => handleMarkProgress(75)}
                >
                  Mark as Almost Complete (75%)
                </Button>
              )}
            </TabsContent>
            
            <TabsContent value="reflection" className="py-4 space-y-4">
              <div className="bg-muted p-6 rounded-lg">
                <h4 className="font-medium mb-3">Reflection Questions</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm">1. How did this activity make you feel?</p>
                    <p className="text-sm text-muted-foreground mt-1">Take a moment to notice your emotions.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">2. What is one thing you learned about yourself?</p>
                    <p className="text-sm text-muted-foreground mt-1">Think about any new insights.</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">3. How will you apply what you learned?</p>
                    <p className="text-sm text-muted-foreground mt-1">Consider practical ways to use this skill.</p>
                  </div>
                </div>
              </div>
              
              {user?.role === UserRole.student && !lessonCompleted && (
                <Button 
                  className="w-full" 
                  onClick={() => handleMarkProgress(100)}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Complete Activity
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        
        {user?.role === UserRole.student && lessonCompleted && (
          <CardFooter className="bg-muted/50 flex justify-center">
            <div className="flex items-center text-green-600">
              <Award className="h-5 w-5 mr-2" />
              <span className="font-medium">Activity Completed!</span>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default SELLessonDetail;
