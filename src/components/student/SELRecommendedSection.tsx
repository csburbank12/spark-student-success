
import React from "react";
import { SELRecommendationCard } from "./SELRecommendationCard";
import { useSELRecommendations, useSELProgress } from "@/hooks/useSELRecommendations";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const SELRecommendedSection = () => {
  const { recommendedLessons, isLoading } = useSELRecommendations();
  const { updateProgress } = useSELProgress();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartActivity = async (lessonId: string) => {
    // Log that user started the activity
    const success = await updateProgress(lessonId, 10, false);
    if (success) {
      toast({
        title: "Activity started",
        description: "Your progress will be saved automatically.",
      });
      navigate(`/sel-lessons/${lessonId}`);
    } else {
      toast({
        title: "Could not start activity",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendedLessons.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-bold">Recommended For You</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedLessons.slice(0, 3).map((lesson) => (
          <SELRecommendationCard
            key={lesson.id}
            lesson={lesson}
            onStartActivity={handleStartActivity}
          />
        ))}
      </div>
    </div>
  );
};
