
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelLesson } from "@/hooks/useSELRecommendations";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, Video, FileText, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SELRecommendationCardProps {
  lesson: SelLesson;
  onStartActivity?: (lessonId: string) => void;
}

export const SELRecommendationCard: React.FC<SELRecommendationCardProps> = ({
  lesson,
  onStartActivity,
}) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (lesson.activity_type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'reflection':
        return <Lightbulb className="h-4 w-4" />;
      case 'worksheet':
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getColorByCompetency = () => {
    switch (lesson.competency_area) {
      case 'Self-Awareness':
        return 'border-blue-100';
      case 'Self-Management':
        return 'border-green-100';
      case 'Social Awareness':
        return 'border-purple-100';
      case 'Relationship Skills':
        return 'border-amber-100';
      case 'Responsible Decision-Making':
        return 'border-teal-100';
      default:
        return 'border-slate-100';
    }
  };

  const handleStartActivity = () => {
    if (onStartActivity) {
      onStartActivity(lesson.id);
    } else {
      navigate(`/sel-lessons/${lesson.id}`);
    }
  };

  return (
    <Card className={`border-l-4 ${getColorByCompetency()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{lesson.title}</CardTitle>
            <CardDescription>{lesson.competency_area}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            {getIcon()}
            <span>{lesson.activity_type}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
        {lesson.estimated_duration && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{lesson.estimated_duration} min</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleStartActivity} className="w-full">
          Start Activity
        </Button>
      </CardFooter>
    </Card>
  );
};
