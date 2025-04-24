
import React, { useState } from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import { useAuth } from "@/contexts/AuthContext";
import { useSELRecommendations } from "@/hooks/useSELRecommendations";
import SELLessonPlayer from "@/components/sel-pathways/SELLessonPlayer";
import { SELLoadingState } from "@/components/sel-pathways/SELLoadingState";
import { SELErrorState } from "@/components/sel-pathways/SELErrorState";
import { SELEmptyState } from "@/components/sel-pathways/SELEmptyState";
import { SELRecommendationsGrid } from "@/components/sel-pathways/SELRecommendationsGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PersonalizedSELPathways: React.FC = () => {
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<SelLesson | null>(null);
  const { recommendedLessons, isLoading, isError } = useSELRecommendations();

  if (isLoading) {
    return <SELLoadingState />;
  }
  
  if (isError) {
    return <SELErrorState />;
  }
  
  if (!recommendedLessons || recommendedLessons.length === 0) {
    return <SELEmptyState />;
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
        onComplete={() => setSelectedLesson(null)}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h2 className="text-3xl font-heading font-bold">Personalized SEL Pathways</h2>
        </div>
      </div>
      
      <SELRecommendationsGrid 
        lessons={recommendedLessons}
        onSelectLesson={setSelectedLesson}
      />
    </div>
  );
};

export default PersonalizedSELPathways;
