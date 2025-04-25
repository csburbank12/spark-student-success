
import React, { useState } from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import { useAuth } from "@/contexts/AuthContext";
import { useSELRecommendations } from "@/hooks/useSELRecommendations";
import SELLessonPlayer from "@/components/sel-pathways/SELLessonPlayer";
import { SELLoadingState } from "@/components/sel-pathways/SELLoadingState";
import { SELErrorState } from "@/components/sel-pathways/SELErrorState";
import { SELEmptyState } from "@/components/sel-pathways/SELEmptyState";
import { SELRecommendationsGrid } from "@/components/sel-pathways/SELRecommendationsGrid";
import PageHeader from "@/components/layout/PageHeader";

const PersonalizedSELPathways: React.FC = () => {
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<SelLesson | null>(null);
  const { recommendedLessons, isLoading, isError } = useSELRecommendations();

  // Prepare lesson data for player before conditional rendering
  const playerLesson = selectedLesson ? {
    id: selectedLesson.id,
    title: selectedLesson.title,
    description: selectedLesson.description || "",
    content: selectedLesson.description || selectedLesson.content || "",
    pathway: selectedLesson.competency_area || selectedLesson.pathway || "",
    duration: selectedLesson.estimated_duration || selectedLesson.duration || 5,
    difficulty: selectedLesson.difficulty || "Standard",
    media_url: selectedLesson.content_url || undefined
  } : null;

  if (isLoading) return <SELLoadingState />;
  if (isError) return <SELErrorState />;
  if (!recommendedLessons || recommendedLessons.length === 0) return <SELEmptyState />;

  // Display the lesson player when a lesson is selected
  if (selectedLesson && playerLesson) {
    return (
      <SELLessonPlayer 
        lesson={playerLesson}
        onComplete={() => setSelectedLesson(null)}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }
  
  // Display the recommendations grid when no lesson is selected
  return (
    <div className="space-y-6">
      <PageHeader title="Personalized SEL Pathways" />
      <SELRecommendationsGrid 
        lessons={recommendedLessons}
        onSelectLesson={setSelectedLesson}
      />
    </div>
  );
};

export default PersonalizedSELPathways;
