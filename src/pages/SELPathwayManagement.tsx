import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmotionFilterSection } from "@/components/teacher/EmotionFilterSection";
import { SELLesson, SELAssignment } from "@/hooks/useSELRecommendations";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Edit, FileText, Plus, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";

const SELPathwayManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newLesson, setNewLesson] = useState<Partial<SELLesson>>({
    title: "",
    description: "",
    activity_type: "reflection",
    competency_area: "Self-Awareness",
    estimated_duration: 15
  });
  
  // Query all SEL lessons
  const { data: lessons = [], isLoading: isLoadingLessons, refetch } = useQuery({
    queryKey: ["sel-lessons-management"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("sel_lessons")
          .select("*")
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        
        return (data || []).map(lesson => ({
          ...lesson,
          pathway: lesson.competency_area,
          duration: lesson.estimated_duration,
          difficulty: 'Standard'
        })) as SELLesson[];
      } catch (error) {
        console.error("Error fetching SEL lessons:", error);
        return [];
      }
    },
  });
  
  // Query all SEL assignments
  const { data: assignments = [], isLoading: isLoadingAssignments } = useQuery({
    queryKey: ["sel-assignments-management"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("sel_assignments")
          .select(`
            id, lesson_id, student_id, assigned_by, assigned_at, due_date, status,
            lesson:sel_lessons(*)
          `)
          .order("assigned_at", { ascending: false })
          .limit(20);
          
        if (error) throw error;
        
        // Map assignments to include needed fields
        return (data || []).map(assignment => {
          if (assignment.lesson) {
            return {
              ...assignment,
              lesson: {
                ...assignment.lesson,
                pathway: assignment.lesson.competency_area,
                duration: assignment.lesson.estimated_duration,
                difficulty: 'Standard'
              }
            };
          }
          return assignment;
        }) as SELAssignment[];
      } catch (error) {
        console.error("Error fetching SEL assignments:", error);
        return [];
      }
    },
  });
  
  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.competency_area.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddLesson = async () => {
    try {
      setIsAddingLesson(true);
      
      if (!user?.id || !newLesson.title || !newLesson.competency_area) {
        toast({
          title: "Error",
          description: "Missing required fields",
          variant: "destructive"
        });
        setIsAddingLesson(false);
        return;
      }
      
      const lessonData = {
        title: newLesson.title,
        description: newLesson.description,
        activity_type: newLesson.activity_type,
        competency_area: newLesson.competency_area,
        estimated_duration: newLesson.estimated_duration,
        age_range: newLesson.age_range,
        created_by: user.id
      };
      
      const { error } = await supabase
        .from("sel_lessons")
        .insert(lessonData);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Lesson created successfully"
      });
      
      // Reset form
      setNewLesson({
        title: "",
        description: "",
        activity_type: "reflection",
        competency_area: "Self-Awareness",
        estimated_duration: 15
      });
      
      // Close dialog and refresh data
      setIsAddingLesson(false);
      refetch();
    } catch (error) {
      console.error("Error adding SEL lesson:", error);
      toast({
        title: "Error",
        description: "Failed to create lesson",
        variant: "destructive"
      });
      setIsAddingLesson(false);
    }
  };
  
  const getActivityIcon = (type?: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'worksheet': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getCompetencyColor = (area?: string) => {
    switch (area) {
      case 'Self-Awareness': return 'bg-blue-100 text-blue-800';
      case 'Self-Management': return 'bg-green-100 text-green-800';
      case 'Social Awareness': return 'bg-purple-100 text-purple-800';
      case 'Relationship Skills': return 'bg-amber-100 text-amber-800';
      case 'Responsible Decision-Making': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">SEL Pathway Management</h2>
      </div>
      
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="lessons">SEL Library</TabsTrigger>
          <TabsTrigger value="assignments">Student Assignments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessons" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lesson
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New SEL Lesson</DialogTitle>
                  <DialogDescription>
                    Create a new SEL lesson or activity to assign to students.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newLesson.description}
                      onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="competency">Competency Area</Label>
                      <Select
                        value={newLesson.competency_area}
                        onValueChange={(value) => setNewLesson({...newLesson, competency_area: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Self-Awareness">Self-Awareness</SelectItem>
                          <SelectItem value="Self-Management">Self-Management</SelectItem>
                          <SelectItem value="Social Awareness">Social Awareness</SelectItem>
                          <SelectItem value="Relationship Skills">Relationship Skills</SelectItem>
                          <SelectItem value="Responsible Decision-Making">Responsible Decision-Making</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="activity_type">Activity Type</Label>
                      <Select
                        value={newLesson.activity_type}
                        onValueChange={(value) => setNewLesson({...newLesson, activity_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="reflection">Reflection</SelectItem>
                          <SelectItem value="breathing exercise">Breathing Exercise</SelectItem>
                          <SelectItem value="worksheet">Worksheet</SelectItem>
                          <SelectItem value="game">Game</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newLesson.estimated_duration || ""}
                        onChange={(e) => setNewLesson({...newLesson, estimated_duration: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="age_range">Age Range</Label>
                      <Select
                        value={newLesson.age_range}
                        onValueChange={(value) => setNewLesson({...newLesson, age_range: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="K-2">K-2</SelectItem>
                          <SelectItem value="3-5">3-5</SelectItem>
                          <SelectItem value="6-8">6-8</SelectItem>
                          <SelectItem value="9-12">9-12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddLesson} disabled={isAddingLesson}>
                    {isAddingLesson ? "Adding..." : "Add Lesson"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {isLoadingLessons ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                Showing {filteredLessons.length} of {lessons.length} lessons
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          <Badge 
                            variant="secondary"
                            className={getCompetencyColor(lesson.competency_area)}
                          >
                            {lesson.competency_area}
                          </Badge>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Lesson</DialogTitle>
                            </DialogHeader>
                            {/* Edit form would go here */}
                            <div className="text-center py-4">
                              <p className="text-muted-foreground">Edit lesson functionality</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getActivityIcon(lesson.activity_type)}
                            <span>{lesson.activity_type}</span>
                          </Badge>
                          {lesson.estimated_duration && (
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.estimated_duration} min
                            </div>
                          )}
                        </div>
                        <Badge variant="outline">{lesson.age_range || "All ages"}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>SEL lessons assigned to students</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAssignments ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : assignments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No assignments found
                </div>
              ) : (
                <div className="space-y-3">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{assignment.lesson?.title}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Assigned: {new Date(assignment.assigned_at).toLocaleDateString()}</span>
                          {assignment.due_date && (
                            <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant={assignment.status === 'completed' ? 'default' : 'outline'}
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <EmotionFilterSection />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEL Pathway Analytics</CardTitle>
              <CardDescription>Overview of student engagement with SEL content</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                Analytics dashboard will be displayed here
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Effective Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Mindfulness Breathing</div>
                    <div className="text-sm font-medium">89% effective</div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "89%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Managing Strong Emotions</div>
                    <div className="text-sm font-medium">76% effective</div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "76%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Peer Relationship Building</div>
                    <div className="text-sm font-medium">65% effective</div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Competency Areas Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">Self-Awareness</div>
                      <div className="text-sm text-muted-foreground">32%</div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">Self-Management</div>
                      <div className="text-sm text-muted-foreground">40%</div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">Social Awareness</div>
                      <div className="text-sm text-muted-foreground">15%</div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">Relationship Skills</div>
                      <div className="text-sm text-muted-foreground">8%</div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">Responsible Decision-Making</div>
                      <div className="text-sm text-muted-foreground">5%</div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SELPathwayManagement;
