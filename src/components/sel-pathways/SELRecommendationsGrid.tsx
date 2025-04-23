
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight } from "lucide-react";
import { SelLesson } from "@/components/sel-pathways/types";
import { useNavigate } from "react-router-dom";

interface SELRecommendationsGridProps {
  lessons: SelLesson[];
  onSelectLesson: (lesson: SelLesson) => void;
}

export const SELRecommendationsGrid = ({ lessons, onSelectLesson }: SELRecommendationsGridProps) => {
  const navigate = useNavigate();
  
  const handleViewAllClick = () => {
    navigate("/sel-pathways");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading font-bold">Recommended For You</h2>
        <Button variant="link" onClick={handleViewAllClick}>
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lessons.slice(0, 3).map(lesson => (
          <Card key={lesson.id} className="overflow-hidden">
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
              <CardDescription>
                {lesson.estimated_duration || 5} min activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {lesson.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => onSelectLesson(lesson)}
              >
                <Play className="mr-2 h-4 w-4" /> Start Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
