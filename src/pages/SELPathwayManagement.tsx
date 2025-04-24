
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { FileX } from "lucide-react";
import { useSELLessons } from "@/hooks/useSELLessons";
import { useDeleteSELLesson } from "@/hooks/useDeleteSELLesson";
import { SELLessonsTable } from "@/components/sel-pathways/SELLessonsTable";
import { SELEmptyLessonState } from "@/components/sel-pathways/SELEmptyLessonState";

const SELPathwayManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { lessons, isLoading, isError } = useSELLessons();
  const { handleDeleteLesson } = useDeleteSELLesson();

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lesson.competency_area || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center py-20">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <FileX className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Error Loading SEL Lessons</h3>
            <p className="text-muted-foreground mb-4">
              There was a problem loading the SEL lessons data.
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">SEL Pathway Management</h1>
        <Link to="/create-sel-lesson">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SEL Lessons</CardTitle>
          <CardDescription>Manage and organize SEL lessons.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lessons..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Badge variant="outline">
              {filteredLessons.length} lessons
            </Badge>
          </div>

          {filteredLessons.length > 0 ? (
            <SELLessonsTable 
              lessons={filteredLessons} 
              onDeleteLesson={handleDeleteLesson} 
            />
          ) : (
            <SELEmptyLessonState 
              hasLessons={lessons.length > 0}
              searchActive={searchQuery.length > 0}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SELPathwayManagement;
