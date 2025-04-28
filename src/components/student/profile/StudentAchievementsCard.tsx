
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Calendar, Zap, ArrowUp, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const achievementsData = [
  {
    name: "SEL Master",
    description: "Completed all Social Emotional Learning modules",
    date: "September 18, 2023",
    icon: Star,
    color: "text-amber-500",
    bgColor: "bg-amber-100"
  },
  {
    name: "30 Day Check-in Streak",
    description: "Completed mood check-ins for 30 consecutive days",
    date: "October 5, 2023",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-100"
  },
  {
    name: "Reflection Master",
    description: "Wrote 10 thoughtful journal reflections",
    date: "September 25, 2023",
    icon: BarChart,
    color: "text-purple-500",
    bgColor: "bg-purple-100"
  },
  {
    name: "Growth Mindset",
    description: "Showed significant SEL skill improvement",
    date: "October 1, 2023",
    icon: ArrowUp,
    color: "text-green-500",
    bgColor: "bg-green-100"
  }
];

const progressBadges = [
  {
    name: "Emotion Regulation",
    progress: 80,
    level: "Advanced"
  },
  {
    name: "Self Awareness",
    progress: 65,
    level: "Intermediate"
  },
  {
    name: "Social Skills",
    progress: 90,
    level: "Advanced"
  },
  {
    name: "Responsible Decision Making",
    progress: 70,
    level: "Intermediate"
  }
];

const StudentAchievementsCard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Earned Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievementsData.map((achievement, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-md border"
              >
                <div className={`h-10 w-10 rounded-full ${achievement.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Earned on {achievement.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2" />
            SEL Competency Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progressBadges.map((badge, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between mb-1">
                  <div className="font-medium">{badge.name}</div>
                  <Badge variant="outline">{badge.level}</Badge>
                </div>
                <Progress value={badge.progress} className="h-2" />
                <div className="text-xs text-right text-muted-foreground">{badge.progress}% mastery</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAchievementsCard;
