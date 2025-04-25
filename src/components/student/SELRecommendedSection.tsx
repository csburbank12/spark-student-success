
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { SELLoadingState } from "@/components/sel-pathways/SELLoadingState";
import { SELErrorState } from "@/components/sel-pathways/SELErrorState";
import { SELRecommendationsGrid } from "@/components/sel-pathways/SELRecommendationsGrid";
import { Sparkles } from "lucide-react";
import { useErrorLogging } from "@/hooks/useErrorLogging";

export const SELRecommendedSection = () => {
  const { logError } = useErrorLogging();

  // Query to fetch recommended SEL lessons
  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ["sel-recommendations"],
    queryFn: async () => {
      try {
        // In a real app, this would fetch from Supabase
        // For demo purposes, returning mock data
        return [
          {
            id: "sel1",
            title: "Managing Big Emotions",
            description: "Learn strategies to handle overwhelming feelings",
            casel_competency: "Self-Management",
            recommended_moods: ["stressed", "sad"],
            duration: "15 min",
            difficulty: "Beginner",
            thumbnail: "/img/sel-emotions.svg",
          },
          {
            id: "sel2",
            title: "Building Empathy",
            description: "Understanding others' perspectives and feelings",
            casel_competency: "Social Awareness",
            recommended_moods: ["good", "okay"],
            duration: "20 min",
            difficulty: "Intermediate",
            thumbnail: "/img/sel-empathy.svg",
          },
          {
            id: "sel3",
            title: "Mindful Communication",
            description: "Express yourself clearly and listen actively",
            casel_competency: "Relationship Skills",
            recommended_moods: ["happy", "good"],
            duration: "10 min",
            difficulty: "Beginner",
            thumbnail: "/img/sel-communication.svg",
          },
        ];
      } catch (err) {
        logError({
          action: "fetch_sel_recommendations",
          error_message: err instanceof Error ? err.message : "Unknown error loading SEL recommendations",
          profile_type: "student"
        });
        throw err;
      }
    },
    refetchOnWindowFocus: false,
  });

  // Log errors if query fails
  useEffect(() => {
    if (error) {
      logError({
        action: "sel_recommendations_component_error",
        error_message: error instanceof Error ? error.message : "Unknown error in SEL recommendations",
        profile_type: "student"
      });
    }
  }, [error, logError]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            Recommended for You
          </div>
        </CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SELLoadingState />
        ) : error ? (
          <SELErrorState />
        ) : (
          <SELRecommendationsGrid recommendations={recommendations || []} />
        )}
      </CardContent>
    </Card>
  );
};

export default SELRecommendedSection;
