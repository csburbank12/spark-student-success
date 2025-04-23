
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/sonner";
import { Search, BookOpen, PlusCircle, Users, BarChart2 } from "lucide-react";
import SELProgressOverview from "@/components/sel-pathways/SELProgressOverview";
import SELLessonsList from "@/components/sel-pathways/SELLessonsList";
import SELAssignLessonDialog from "@/components/sel-pathways/SELAssignLessonDialog";
import { SelLesson } from "@/components/sel-pathways/types";
import type { Tables } from "@/integrations/supabase/types";

// Define types for student profiles
interface StudentProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  grade_level?: string;
  [key: string]: any;
}

const SELPathwayManagement: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPathway, setSelectedPathway] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<SelLesson | null>(null);

  // Fetch all students (for staff to manage)
  const { data: students, isLoading: loadingStudents } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      if (!user?.id) return null;
      // In a real app, you would filter by staff's class or school
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      
      if (error) throw error;
      return data as StudentProfile[] || [];
    },
    enabled: !!user?.id && (user?.role === "staff" || user?.role === "admin"),
  });

  // Fetch all SEL lessons
  const { data: lessons, isLoading: loadingLessons } = useQuery({
    queryKey: ["sel-lessons", selectedPathway],
    queryFn: async () => {
      let query = supabase
        .from("sel_lessons")
        .select("*");
      
      if (selectedPathway !== "all") {
        query = query.eq("pathway", selectedPathway);
      }
      
      const { data, error } = await query.order("title");
      if (error) throw error;
      return data as SelLesson[] || [];
    },
    enabled: !!user?.id && (user?.role === "staff" || user?.role === "admin"),
  });

  // Fetch student assignments and progress when a student is selected
  const { data: studentData, isLoading: loadingStudentData } = useQuery({
    queryKey: ["student-sel-data", selectedStudent],
    queryFn: async () => {
      if (!selectedStudent) return null;
      
      // Get assignments
      const { data: assignments, error: assignmentsError } = await supabase
        .from("sel_assignments")
        .select(`
          *,
          sel_lessons (*)
        `)
        .eq("student_id", selectedStudent);
      
      if (assignmentsError) throw assignmentsError;
      
      // Get progress
      const { data: progress, error: progressError } = await supabase
        .from("sel_progress")
        .select(`
          *,
          sel_lessons (*)
        `)
        .eq("student_id", selectedStudent);
      
      if (progressError) throw progressError;
      
      return {
        assignments: assignments || [],
        progress: progress || []
      };
    },
    enabled: !!selectedStudent,
  });

  // Assign lesson mutation
  const assignLesson = useMutation({
    mutationFn: async ({ studentId, lessonId, dueDate }: { studentId: string, lessonId: string, dueDate?: string }) => {
      const { error } = await supabase
        .from("sel_assignments")
        .insert({
          student_id: studentId,
          lesson_id: lessonId,
          assigned_at: new Date().toISOString(),
          assigned_by: user?.id,
          due_date: dueDate,
          status: "assigned"
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-sel-data", selectedStudent] });
      toast("Lesson assigned successfully!");
      setIsAssignDialogOpen(false);
    },
    onError: (error: any) => {
      toast("Failed to assign lesson", {
        description: error.message,
      });
    }
  });

  // Handle assign lesson
  const handleAssignLesson = (lessonId: string, dueDate?: string) => {
    if (!selectedStudent) {
      toast("Please select a student first");
      return;
    }
    
    assignLesson.mutate({
      studentId: selectedStudent,
      lessonId,
      dueDate
    });
  };

  // Filter students by search query
  const filteredStudents = students?.filter(s => 
    s.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Filter lessons by search query
  const filteredLessons = lessons?.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Get all unique pathways for filter
  const pathways = [...new Set(lessons?.map(l => l.pathway))].filter(Boolean);

  // If not a staff member, show access denied
  if (user?.role !== "staff" && user?.role !== "admin") {
    return (
      <div className="max-w-lg mx-auto mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have permission to access the SEL Pathway Management.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loadingStudents || loadingLessons) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          SEL Pathway Management
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student selection column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Students
              </CardTitle>
              <CardDescription>
                Select a student to manage their SEL pathways
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                {filteredStudents.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">
                    No students found
                  </p>
                ) : (
                  filteredStudents.map((student) => (
                    <button
                      key={student.id}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        selectedStudent === student.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <div className="font-medium">
                        {student.first_name} {student.last_name}
                      </div>
                      <div className="text-xs opacity-80">
                        {student.grade_level || "No grade specified"}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEL content management column */}
        <div className="md:col-span-2 space-y-4">
          {selectedStudent ? (
            loadingStudentData ? (
              <div className="flex items-center justify-center h-64">
                <Loader size="lg" />
              </div>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5" />
                      Student Progress
                    </CardTitle>
                    <CardDescription>
                      {filteredStudents.find(s => s.id === selectedStudent)?.first_name}'s SEL learning journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SELProgressOverview 
                      studentData={studentData}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Available Lessons
                      </CardTitle>
                      <Button size="sm" onClick={() => setIsAssignDialogOpen(true)}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Assign Lesson
                      </Button>
                    </div>
                    <CardDescription>
                      Assign SEL lessons to this student
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Select value={selectedPathway} onValueChange={setSelectedPathway}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by pathway" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Pathways</SelectItem>
                          {pathways.map(pathway => (
                            <SelectItem key={pathway} value={pathway}>
                              {pathway}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search lessons..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <SELLessonsList 
                      lessons={filteredLessons}
                      studentData={studentData}
                      onAssign={(lesson) => {
                        setSelectedLesson(lesson);
                        setIsAssignDialogOpen(true);
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            )
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a Student</h3>
                <p className="text-muted-foreground">
                  Choose a student from the list to view and manage their SEL pathways.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Assignment Dialog */}
      <SELAssignLessonDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        onAssign={handleAssignLesson}
        selectedLesson={selectedLesson}
        lessons={lessons || []}
        isLoading={assignLesson.isPending}
      />
    </div>
  );
};

export default SELPathwayManagement;
