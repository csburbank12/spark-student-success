import React, { useState } from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { MoreVertical, Edit, Trash2, Search, Plus, FileX } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  lessons?: SelLesson[];
}

const SELPathwayManagement: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: lessons = [], isLoading, isError } = useQuery({
    queryKey: ["sel-lessons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sel_lessons')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as SelLesson[];
    }
  });

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lesson.competency_area || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteLesson = async (id: string) => {
    try {
      const { count } = await supabase
        .from('sel_assignments')
        .select('*', { count: 'exact', head: true })
        .eq('lesson_id', id);
        
      if (count && count > 0) {
        toast.error("Cannot delete lesson with existing assignments", {
          description: "Please remove all assignments first"
        });
        return;
      }
      
      const { error } = await supabase
        .from('sel_lessons')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Lesson deleted successfully");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Failed to delete lesson");
    }
  };

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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Competency Area</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Activity Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.title}</TableCell>
                  <TableCell>{lesson.competency_area || 'General'}</TableCell>
                  <TableCell>{lesson.estimated_duration || lesson.duration || '--'} minutes</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {lesson.activity_type || 'Activity'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/edit-sel-lesson/${lesson.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDeleteLesson(lesson.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredLessons.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Search className="h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-medium">No lessons found</p>
              <p className="text-muted-foreground">
                {lessons.length > 0 
                  ? "Try adjusting your search criteria."
                  : "Add your first SEL lesson to get started."}
              </p>
              {lessons.length === 0 && (
                <Link to="/create-sel-lesson">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Lesson
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SELPathwayManagement;
