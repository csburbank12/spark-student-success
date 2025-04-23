
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight, Award, Sparkles, Star, Trophy } from "lucide-react";
import { SelLesson } from "@/components/sel-pathways/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SELRecommendationsGridProps {
  lessons: SelLesson[];
  onSelectLesson: (lesson: SelLesson) => void;
}

export const SELRecommendationsGrid = ({ lessons, onSelectLesson }: SELRecommendationsGridProps) => {
  const navigate = useNavigate();
  
  const handleViewAllClick = () => {
    navigate("/sel-pathways");
  };

  const handleLessonSelect = (lesson: SelLesson) => {
    onSelectLesson(lesson);
    toast.success("Great choice! 🌟", {
      description: "This activity will help you grow your " + lesson.competency_area + " skills."
    });
  };

  // Get a motivational message based on time of day
  const getTimeBasedMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Start your day with personal growth!";
    if (hour < 17) return "Take a moment to develop your skills!";
    return "End your day with meaningful reflection!";
  };

  return (
    <div className="space-y-4" data-testid="sel-recommendations">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-heading font-bold flex items-center gap-2">
            Recommended For You
            <Sparkles className="h-5 w-5 text-amber-500" />
          </h2>
          <p className="text-sm text-muted-foreground">{getTimeBasedMessage()}</p>
        </div>
        <Button variant="link" onClick={handleViewAllClick} className="group">
          View All <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lessons.slice(0, 3).map((lesson, index) => (
          <Card 
            key={lesson.id} 
            className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            role="article"
          >
            <div className={`relative h-32 bg-gradient-to-r 
              ${index === 0 ? 'from-violet-500 to-fuchsia-500' : 
                index === 1 ? 'from-blue-500 to-cyan-500' : 
                'from-emerald-500 to-teal-500'}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge variant="outline" className="bg-white/90 text-sm backdrop-blur-sm">
                  {lesson.activity_type || "Activity"}
                </Badge>
              </div>
              {index === 0 && (
                <div className="absolute top-2 right-2">
                  <Trophy className="h-5 w-5 text-amber-300 drop-shadow animate-bounce" />
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <Badge variant="secondary" className="font-medium">
                  {lesson.competency_area}
                </Badge>
              </div>
              <CardDescription>
                {lesson.estimated_duration || 5} min activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {lesson.description}
              </p>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Award className="h-4 w-4 text-primary/70" />
                <span className="text-xs">Earn points for completion</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full group" 
                onClick={() => handleLessonSelect(lesson)}
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> 
                Start Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
