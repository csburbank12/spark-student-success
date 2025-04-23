
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users, BookOpen, Activity, BarChart2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { SELLesson, useAssignSELLesson } from "@/hooks/useSELRecommendations";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";

const SELPathwayManagement: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<SELLesson | null>(null);
  const { assignLesson } = useAssignSELLesson();
  
  // Fetch SEL lessons
  const { data: lessons = [], isLoading: loadingLessons } = useQuery({
    queryKey: ["sel-lessons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sel_lessons")
        .select("*");
        
      if (error) throw error;
      
      return data.map(lesson => ({
        ...lesson,
        pathway: lesson.competency_area,
        duration: lesson.estimated_duration,
        difficulty: 'Standard'
      })) as SELLesson[];
    }
  });
  
  // Fetch students
  const { data: students = [], isLoading: loadingStudents } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name");
        
      if (error) throw error;
      
      return data.map(student => ({
        id: student.id,
        name: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
      }));
    }
  });
  
  // Fetch assigned lessons
  const { data: assignedLessons = [], isLoading: loadingAssignments } = useQuery({
    queryKey: ["all-sel-assignments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sel_assignments")
        .select(`
          *,
          sel_lessons:lesson_id(*),
          student:student_id(id, first_name, last_name),
          assigner:assigned_by(id, first_name, last_name)
        `)
        .order("assigned_at", { ascending: false });
        
      if (error) throw error;
      
      // Map assignments to include needed fields
      return data.map(assignment => {
        const lesson = assignment.sel_lessons as any;
        const student = assignment.student as any;
        const assigner = assignment.assigner as any;
        
        return {
          id: assignment.id,
          lessonTitle: lesson?.title || "Unknown Lesson",
          pathway: lesson?.competency_area || "Unknown",
          studentName: student ? `${student.first_name || ''} ${student.last_name || ''}`.trim() : "Unknown Student",
          assignedBy: assigner ? `${assigner.first_name || ''} ${assigner.last_name || ''}`.trim() : "Unknown",
          assignedAt: format(new Date(assignment.assigned_at), "PPP"),
          status: assignment.status,
          dueDate: assignment.due_date ? format(new Date(assignment.due_date), "PPP") : "No due date"
        };
      });
    }
  });

  const filteredLessons = lessons.filter(
    lesson => 
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.competency_area.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleAssignLesson = async () => {
    if (!selectedStudent || !selectedLesson) {
      toast("Please select a student and lesson to assign", {
        description: "Both fields are required to assign a lesson",
      });
      return;
    }
    
    const success = await assignLesson(selectedStudent, selectedLesson.id);
    
    if (success) {
      toast("Lesson assigned successfully", {
        description: `The lesson has been assigned to the student`,
      });
      setSelectedLesson(null);
      setSelectedStudent("");
    } else {
      toast("Failed to assign lesson", {
        description: "There was an error assigning the lesson",
      });
    }
  };
  
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "lessonTitle",
      header: "Lesson Title"
    },
    {
      accessorKey: "pathway",
      header: "Pathway",
      cell: ({ row }) => {
        const pathway = row.getValue("pathway") as string;
        return (
          <Badge variant="outline">{pathway}</Badge>
        );
      }
    },
    {
      accessorKey: "studentName",
      header: "Student"
    },
    {
      accessorKey: "assignedBy",
      header: "Assigned By"
    },
    {
      accessorKey: "assignedAt",
      header: "Assigned Date"
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={
            status === "completed" ? "bg-green-100 text-green-800" :
            status === "in-progress" ? "bg-yellow-100 text-yellow-800" :
            "bg-gray-100 text-gray-800"
          }>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      }
    },
    {
      accessorKey: "dueDate",
      header: "Due Date"
    }
  ];
  
  if (loadingLessons || loadingStudents || loadingAssignments) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">SEL Pathway Management</h2>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Lesson
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Assign Lesson
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign SEL Lesson</DialogTitle>
                <DialogDescription>
                  Select a student and lesson to assign
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select 
                    value={selectedStudent} 
                    onValueChange={setSelectedStudent}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lesson">Lesson</Label>
                  <Select 
                    value={selectedLesson?.id || ""} 
                    onValueChange={(value) => {
                      const lesson = lessons.find(l => l.id === value);
                      setSelectedLesson(lesson || null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lesson" />
                    </SelectTrigger>
                    <SelectContent>
                      {lessons.map(lesson => (
                        <SelectItem key={lesson.id} value={lesson.id}>
                          {lesson.title} ({lesson.competency_area})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAssignLesson} className="w-full">
                  Assign Lesson
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search lessons..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">
            <BookOpen className="h-4 w-4 mr-2" />
            Lessons Library
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <Activity className="h-4 w-4 mr-2" />
            Assigned Lessons
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessons" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map(lesson => (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>
                    {lesson.competency_area} • {lesson.estimated_duration || "Unknown"} min
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {lesson.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Assign</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign "{lesson.title}"</DialogTitle>
                        <DialogDescription>
                          Select a student to assign this lesson
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="student">Student</Label>
                          <Select 
                            value={selectedStudent} 
                            onValueChange={(value) => {
                              setSelectedStudent(value);
                              setSelectedLesson(lesson);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                            <SelectContent>
                              {students.map(student => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAssignLesson} className="w-full">
                          Assign Lesson
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No lessons found</h3>
              <p className="text-sm text-muted-foreground">
                Try a different search term or add new lessons to your library
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Assignments</CardTitle>
              <CardDescription>
                View and manage all assigned SEL lessons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={assignedLessons} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEL Analytics</CardTitle>
              <CardDescription>
                Track SEL lesson engagement and impact
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SELPathwayManagement;
