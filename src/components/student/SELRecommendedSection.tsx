
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSELRecommendations } from "@/hooks/useSELRecommendations";
import { SelLesson } from "@/components/sel-pathways/types"; 
import { ArrowRight, Play, BookOpen, Clock, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import SELLessonPlayer from "@/components/sel-pathways/SELLessonPlayer";
import { toast } from "sonner";

export function SELRecommendedSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<SelLesson | null>(null);
  
  const { recommendedLessons, isLoading, isError } = useSELRecommendations();
  
  const handleViewAllClick = () => {
    navigate("/sel-pathways");
  };

  const handleLessonSelect = (lesson: SelLesson) => {
    setSelectedLesson(lesson);
    toast.info(`Loading "${lesson.title}"...`);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-[220px] w-full" />
          <Skeleton className="h-[220px] w-full" />
          <Skeleton className="h-[220px] w-full" />
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-medium">Unable to Load Recommendations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            There was a problem loading your SEL recommendations. Please try again later.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (selectedLesson) {
    const playerLesson = {
      id: selectedLesson.id,
      title: selectedLesson.title,
      description: selectedLesson.description || "",
      content: selectedLesson.description || selectedLesson.content || "",
      pathway: selectedLesson.competency_area || selectedLesson.pathway || "",
      duration: selectedLesson.estimated_duration || selectedLesson.duration || 5,
      difficulty: selectedLesson.difficulty || "Standard",
      media_url: selectedLesson.content_url || undefined
    };
    
    return (
      <SELLessonPlayer 
        lesson={playerLesson}
        onComplete={() => {
          setSelectedLesson(null);
          toast.success("Lesson completed!", {
            description: "Your progress has been saved"
          });
        }}
        onBack={() => {
          setSelectedLesson(null);
          toast.info("Lesson exited");
        }}
      />
    );
  }
  
  if (!recommendedLessons || recommendedLessons.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-medium">No SEL Recommendations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Check back after completing more check-ins for personalized recommendations.
          </p>
          <Button variant="outline" className="mt-4" onClick={handleViewAllClick}>
            Explore SEL Pathways
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading font-bold">Recommended For You</h2>
        <Button variant="link" onClick={handleViewAllClick}>
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedLessons.slice(0, 3).map(lesson => (
          <Card key={lesson.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge variant="outline" className="bg-white/90 text-sm">
                  {lesson.activity_type || "Activity"}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <Badge variant="secondary">{lesson.competency_area}</Badge>
              </div>
              <CardDescription className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.estimated_duration || 5} min activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {lesson.description}
              </p>
              <div className="flex items-center mt-2">
                <Award className="h-3 w-3 text-amber-500 mr-1" />
                <span className="text-xs text-muted-foreground">
                  {lesson.difficulty || "Standard"} difficulty
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleLessonSelect(lesson)}
              >
                <Play className="mr-2 h-4 w-4" /> Start Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
