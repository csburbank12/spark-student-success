
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSELRecommendations } from "@/hooks/useSELRecommendations";
import { SELRecommendationsGrid } from "@/components/sel-pathways/SELRecommendationsGrid";
import SELLessonsList from "@/components/sel-pathways/SELLessonsList";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelLesson } from "@/types/roles";

const PersonalizedSELPathways = () => {
  const { user } = useAuth();
  const { recommendedLessons, assignedLessons, lessonProgress, isLoading } = 
    useSELRecommendations(user?.id);

  const handleSelectLesson = (lesson: SelLesson) => {
    console.log("Selected lesson:", lesson);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Transform assigned lessons to match the expected format
  const formattedAssignedLessons = assignedLessons?.map(assignment => ({
    id: assignment.lesson_id,
    title: assignment.sel_lessons?.title || "",
    description: assignment.sel_lessons?.description || "",
    pathway: assignment.sel_lessons?.pathway || "",
    duration: assignment.sel_lessons?.duration || 0,
    difficulty: assignment.sel_lessons?.difficulty || "Standard"
  })) || [];

  // Transform completed lessons to match the expected format
  const completedLessons = (lessonProgress || [])
    .filter(p => p.completed)
    .map(p => ({
      id: p.lesson_id,
      title: p.sel_lessons?.title || "",
      description: p.sel_lessons?.description || "",
      pathway: p.sel_lessons?.pathway || "",
      duration: p.sel_lessons?.duration || 0,
      difficulty: p.sel_lessons?.difficulty || "Standard"
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">SEL Pathways</h2>
      
      <Tabs defaultValue="recommended" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended">
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <SELRecommendationsGrid 
                lessons={recommendedLessons || []}
                onSelectLesson={handleSelectLesson}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assigned">
          <Card>
            <CardHeader>
              <CardTitle>Current Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <SELLessonsList 
                lessons={formattedAssignedLessons}
                studentData={{ assignments: assignedLessons || [], progress: lessonProgress || [] }}
                onAssign={handleSelectLesson}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <SELLessonsList 
                lessons={completedLessons}
                studentData={{ assignments: assignedLessons || [], progress: lessonProgress || [] }}
                onAssign={handleSelectLesson}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalizedSELPathways;
