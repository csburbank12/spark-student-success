
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const suggestions = [
  {
    title: "5-Minute Mindfulness",
    description: "Quick breathing exercise to center yourself",
    tags: ["Stress Relief", "Quick Activity"]
  },
  {
    title: "Gratitude Journal",
    description: "Write down three things you're grateful for today",
    tags: ["Positivity", "Reflection"]
  },
  {
    title: "Study Break Walk",
    description: "Take a 10-minute walk to refresh your mind",
    tags: ["Physical", "Energy Boost"]
  }
];

const SuggestionList = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {suggestions.map((suggestion, i) => (
      <Card key={i} className="overflow-hidden hover:shadow-md transition-all card-hover">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium">{suggestion.title}</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
          <div className="flex flex-wrap gap-1">
            {suggestion.tags.map((tag) => (
              <span key={tag} className="badge-primary text-xs">{tag}</span>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default SuggestionList;
