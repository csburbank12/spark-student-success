
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart, Brain, BookOpen, ArrowRight } from "lucide-react";

interface SuggestionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  duration: string;
  type: string;
}

const Suggestion: React.FC<SuggestionProps> = ({
  title,
  description,
  icon,
  color,
  link,
  duration,
  type
}) => (
  <Card className="overflow-hidden hover:shadow-md transition-all">
    <CardContent className="p-0">
      <div className="flex flex-col md:flex-row">
        <div 
          className={cn(
            "p-4 md:p-6 flex items-center justify-center md:w-1/4",
            color
          )}
        >
          <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="p-4 md:w-3/4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="text-right">
              <span className="text-xs bg-muted px-2 py-1 rounded-full">{type}</span>
              <p className="text-xs text-muted-foreground mt-1">{duration}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button size="sm" variant="ghost" className="text-primary" asChild>
              <a href={link}>
                Start Activity <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SuggestionList: React.FC = () => {
  const suggestions = [
    {
      title: "Gratitude Reflection",
      description: "Write down three things you're grateful for today",
      icon: <Heart className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-red-400 to-pink-500",
      link: "/activities/gratitude",
      duration: "5 minutes",
      type: "Wellness"
    },
    {
      title: "Mindful Breathing",
      description: "Guided breathing exercise to reduce stress",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-blue-400 to-indigo-500",
      link: "/activities/breathing",
      duration: "3 minutes",
      type: "Mindfulness"
    },
    {
      title: "Emotion Vocabulary",
      description: "Learn to identify and express your feelings more precisely",
      icon: <BookOpen className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-green-400 to-emerald-500",
      link: "/activities/emotions",
      duration: "10 minutes",
      type: "SEL Learning"
    }
  ];

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={index}
          title={suggestion.title}
          description={suggestion.description}
          icon={suggestion.icon}
          color={suggestion.color}
          link={suggestion.link}
          duration={suggestion.duration}
          type={suggestion.type}
        />
      ))}
    </div>
  );
};

export default SuggestionList;
