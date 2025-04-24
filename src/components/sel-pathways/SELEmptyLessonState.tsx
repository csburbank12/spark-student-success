
import React from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SELEmptyLessonStateProps {
  hasLessons: boolean;
  searchActive: boolean;
}

export const SELEmptyLessonState = ({ hasLessons, searchActive }: SELEmptyLessonStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <Search className="h-10 w-10 text-muted-foreground" />
      <p className="text-lg font-medium">No lessons found</p>
      <p className="text-muted-foreground">
        {hasLessons 
          ? "Try adjusting your search criteria."
          : "Add your first SEL lesson to get started."}
      </p>
      {!hasLessons && !searchActive && (
        <Link to="/create-sel-lesson">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add First Lesson
          </Button>
        </Link>
      )}
    </div>
  );
};
