
import React from "react";

export interface SELLesson {
  id: string;
  title: string;
  description?: string;  // Changed from required to optional
  competency_area?: string;
  recommended_moods?: string[];
  estimated_duration?: number;
  difficulty?: string;
  thumbnail?: string;
  activity_type?: string;
}

export interface SELRecommendationsGridProps {
  lessons: SELLesson[];
  onSelectLesson: (lesson: SELLesson) => void;
}

export const SELRecommendationsGrid = ({ lessons, onSelectLesson }: SELRecommendationsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
          onClick={() => onSelectLesson(lesson)}
        >
          {lesson.thumbnail && (
            <div className="flex justify-center mb-2">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="h-24 w-auto object-contain"
              />
            </div>
          )}
          <h3 className="font-medium text-sm mb-1">{lesson.title}</h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {lesson.description || "No description available"}
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
              {lesson.competency_area || "Self-Awareness"}
            </span>
            <span className="text-muted-foreground">
              {lesson.estimated_duration ? `${lesson.estimated_duration} min` : "10-15 min"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
