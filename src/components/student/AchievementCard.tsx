
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Check } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: "check" | "star" | "award";
  completed: boolean;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const getIcon = () => {
    switch (achievement.icon) {
      case "check":
        return <Check className="h-5 w-5 text-green-600" />;
      case "star":
        return <Star className="h-5 w-5 text-amber-600" />;
      case "award":
      default:
        return <Award className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <Card className={`hover-transform transition-all duration-300 ${achievement.completed ? "border-primary/50" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-start">
          <div className={`p-2 rounded-full mr-3 ${
            achievement.completed 
              ? "bg-primary/10" 
              : "bg-muted"
          }`}>
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">{achievement.title}</h3>
              {achievement.completed && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                  Completed!
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {achievement.description}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span className="font-medium">{achievement.progress}%</span>
              </div>
              <Progress 
                value={achievement.progress} 
                className={`h-2 ${achievement.progress > 0 ? "progress-animate" : ""}`}
                style={{ "--progress-width": `${achievement.progress}%` } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
