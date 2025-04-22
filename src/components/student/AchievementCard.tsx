
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: "check" | "award" | "star" | "clock";
  completed: boolean;
}

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

export const AchievementCard = ({ achievement, className }: AchievementCardProps) => {
  const getIcon = () => {
    switch (achievement.icon) {
      case "check":
        return <CheckCircle className="h-6 w-6" />;
      case "award":
        return <Award className="h-6 w-6" />;
      case "star":
        return <Star className="h-6 w-6" />;
      case "clock":
        return <Clock className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        achievement.completed ? "border-2 border-primary" : "",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            {achievement.title}
          </CardTitle>
          <div
            className={cn(
              "p-1 rounded-full",
              achievement.completed ? "text-primary" : "text-muted-foreground"
            )}
          >
            {getIcon()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{achievement.progress}%</span>
            <span>{achievement.completed ? "Completed!" : "In Progress"}</span>
          </div>
          <Progress value={achievement.progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
