
import React from "react";
import { Award, Check, Heart, Brain, Target, Shield, Book, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementProps {
  title: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
}

const Achievement: React.FC<AchievementProps> = ({ title, icon, earned, date }) => (
  <div 
    className={cn(
      "p-3 flex flex-col items-center text-center rounded-lg border",
      earned 
        ? "bg-gradient-to-br from-card to-primary/5 shadow-sm" 
        : "bg-muted/20 opacity-70"
    )}
  >
    <div className={cn(
      "h-12 w-12 rounded-full flex items-center justify-center mb-2",
      earned ? "bg-primary/10 text-primary" : "bg-muted/30 text-muted-foreground"
    )}>
      {icon}
    </div>
    <h4 className="text-sm font-medium">{title}</h4>
    {earned && date && (
      <p className="text-xs text-muted-foreground mt-1">Earned: {date}</p>
    )}
    {!earned && (
      <p className="text-xs text-muted-foreground mt-1">Not yet earned</p>
    )}
  </div>
);

const AchievementGrid: React.FC = () => {
  const achievements = [
    { title: "Consistency Champion", icon: <Check className="h-5 w-5" />, earned: true, date: "Today" },
    { title: "Mood Master", icon: <Heart className="h-5 w-5" />, earned: true, date: "Apr 21" },
    { title: "Reflection Guru", icon: <Brain className="h-5 w-5" />, earned: true, date: "Apr 15" },
    { title: "Goal Getter", icon: <Target className="h-5 w-5" />, earned: true, date: "Apr 10" },
    { title: "Self Care Star", icon: <Shield className="h-5 w-5" />, earned: true, date: "Mar 28" },
    { title: "Learning Explorer", icon: <Book className="h-5 w-5" />, earned: false },
    { title: "Feedback Friend", icon: <Star className="h-5 w-5" />, earned: false },
    { title: "Wellness Warrior", icon: <Award className="h-5 w-5" />, earned: false }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {achievements.map((achievement, index) => (
        <Achievement
          key={index}
          title={achievement.title}
          icon={achievement.icon}
          earned={achievement.earned}
          date={achievement.date}
        />
      ))}
    </div>
  );
};

export default AchievementGrid;
