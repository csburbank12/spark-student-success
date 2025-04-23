
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRole } from "@/types/roles";

interface EmotionStudent {
  id: string;
  name: string;
  mood: string;
  lastCheckIn: string;
}

export const EmotionFilterSection: React.FC = () => {
  const { user } = useAuth();
  const [selectedEmotion, setSelectedEmotion] = useState<string>("all");
  
  // Query to get students and their recent moods
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["emotion-filter-students", user?.schoolId],
    queryFn: async () => {
      if (!user?.id || (user.role !== UserRole.teacher && user.role !== UserRole.staff)) {
        return [];
      }
      
      try {
        // This would normally be a JOIN query with students and mood_check_ins
        // For now, we'll use mock data
        const mockStudents: EmotionStudent[] = [
          { id: "s1", name: "Alex Johnson", mood: "sad", lastCheckIn: "Today, 8:15 AM" },
          { id: "s2", name: "Zoe Martin", mood: "okay", lastCheckIn: "Today, 9:20 AM" },
          { id: "s3", name: "Ethan Brown", mood: "good", lastCheckIn: "Yesterday, 3:45 PM" },
          { id: "s4", name: "Lily Chen", mood: "stressed", lastCheckIn: "2 days ago" },
          { id: "s5", name: "Noah Williams", mood: "happy", lastCheckIn: "Today, 7:30 AM" },
          { id: "s6", name: "Emma Davis", mood: "sad", lastCheckIn: "3 days ago" },
          { id: "s7", name: "Mason Taylor", mood: "angry", lastCheckIn: "Today, 10:45 AM" },
          { id: "s8", name: "Sophia Martinez", mood: "tired", lastCheckIn: "Yesterday, 1:20 PM" },
          { id: "s9", name: "Lucas Garcia", mood: "stressed", lastCheckIn: "Today, 8:50 AM" },
        ];
        
        return mockStudents;
      } catch (error) {
        console.error("Error fetching students with moods:", error);
        return [];
      }
    },
    enabled: !!user?.id && (user.role === UserRole.teacher || user.role === UserRole.staff),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { assignLesson } = useAssignSELLesson();

  const filteredStudents = selectedEmotion === "all" 
    ? students 
    : students.filter(student => student.mood === selectedEmotion);

  const handleBulkAssign = async () => {
    // Implementation for bulk assigning lessons
    // This would open a dialog to select a lesson and assign to all filtered students
    console.log(`Bulk assign SEL lesson to ${filteredStudents.length} students with mood: ${selectedEmotion}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Student Emotion Filter</CardTitle>
          <CardDescription>Filter students by emotions and assign interventions</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Emotion Filter</CardTitle>
        <CardDescription>Filter students by emotions and assign interventions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={selectedEmotion} onValueChange={setSelectedEmotion}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sad">Sad</TabsTrigger>
            <TabsTrigger value="stressed">Stressed</TabsTrigger>
            <TabsTrigger value="angry">Angry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Showing all students. Select an emotion to filter.
            </div>
          </TabsContent>
          
          {["all", "sad", "stressed", "angry"].map((emotion) => (
            <TabsContent key={emotion} value={emotion} className="space-y-4">
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.lastCheckIn}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2">
                        <span className="text-sm font-medium">Mood:</span>{" "}
                        <span>{student.mood}</span>
                      </div>
                      <Button size="sm" variant="outline">Assign</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={filteredStudents.length === 0}
          onClick={handleBulkAssign}
        >
          Assign SEL Lesson to {filteredStudents.length} Students
        </Button>
      </CardFooter>
    </Card>
  );
};

import { useAssignSELLesson } from "@/hooks/useSELRecommendations";
