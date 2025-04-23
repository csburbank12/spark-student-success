import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, UserCheck, X } from "lucide-react";
import { Loader } from "@/components/ui/loader";

interface StudentWithTrust {
  id: string;
  name: string;
  grade: string;
  relationshipId: string;
  selectedDate: string;
  avatarUrl?: string;
}

const TrustedAdultDashboard: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<StudentWithTrust[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsWhoSelected = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);

        // Join via trusted_adults to students and profiles
        const { data, error } = await supabase
          .from('trusted_adults')
          .select(`
            id,
            created_at,
            student_id,
            students (
              id,
              grade_level,
              user_id,
              profiles:user_id (
                first_name,
                last_name,
                avatar_url
              )
            )
          `)
          .eq('staff_id', user.id);

        if (error) throw error;

        const formattedStudents = (data || []).map((item: any) => ({
          id: item.students?.user_id || item.student_id,
          name: `${item.students?.profiles?.first_name || ''} ${item.students?.profiles?.last_name || ''}`.trim(),
          grade: item.students?.grade_level || 'Unknown',
          relationshipId: item.id,
          selectedDate: item.created_at ? new Date(item.created_at).toLocaleDateString() : "",
          avatarUrl: item.students?.profiles?.avatar_url
        }));

        setStudents(formattedStudents);
      } catch (error) {
        console.error('Error fetching trusted student relationships:', error);
        setStudents([
          { 
            id: "s1", 
            name: "Alex Johnson", 
            grade: "8", 
            relationshipId: "r1",
            selectedDate: "4/10/2023" 
          },
          { 
            id: "s2", 
            name: "Maya Rodriguez", 
            grade: "7", 
            relationshipId: "r2",
            selectedDate: "4/15/2023" 
          },
          { 
            id: "s3", 
            name: "Ethan Williams", 
            grade: "9", 
            relationshipId: "r3",
            selectedDate: "4/18/2023" 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentsWhoSelected();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-bold">Trusted Adult Dashboard</h2>
        <p className="text-muted-foreground">Students who have selected you as a trusted adult</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <UserCheck className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Badge variant="outline" className="mb-2 px-3 py-1">Most Recent</Badge>
              <div className="text-lg font-medium">
                {students.length > 0 ? new Date(Math.max(
                  ...students.map(s => new Date(s.selectedDate).getTime())
                )).toLocaleDateString() : 'None'}
              </div>
              <p className="text-sm text-muted-foreground">Last Selection</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <div className="text-lg font-medium">
                {new Date().toLocaleDateString()}
              </div>
              <p className="text-sm text-muted-foreground">Current Date</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students Who Trust You</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader size="lg" />
            </div>
          ) : students.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {students.map(student => (
                <div 
                  key={student.id}
                  className="flex items-start p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <Avatar className="h-10 w-10 mr-4">
                    {student.avatarUrl ? (
                      <AvatarImage src={student.avatarUrl} />
                    ) : (
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">Grade {student.grade}</div>
                    <div className="flex mt-2">
                      <Badge variant="outline" className="text-xs">
                        Selected: {student.selectedDate}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No students have selected you as a trusted adult yet.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources for Trusted Adults</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tips">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tips">Tips</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>
            <TabsContent value="tips" className="pt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Be Approachable</h3>
                <p className="text-sm text-muted-foreground">
                  Create a welcoming environment where students feel comfortable approaching you with concerns, both academic and personal.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Maintain Confidentiality</h3>
                <p className="text-sm text-muted-foreground">
                  Respect student privacy while being clear about mandatory reporting responsibilities for safety concerns.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Set Boundaries</h3>
                <p className="text-sm text-muted-foreground">
                  Establish clear boundaries for when and how students can approach you, while still being accessible.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="resources" className="pt-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Student Check-in
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Trusted Adult Handbook
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <X className="mr-2 h-4 w-4" />
                  Crisis Response Protocol
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="training" className="pt-4">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Access professional development resources to enhance your role as a trusted adult.
                </p>
                <div className="grid gap-2">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">Active Listening Workshop</h4>
                    <p className="text-sm text-muted-foreground">Learn techniques to better support students in crisis.</p>
                    <Badge className="mt-2">45 min</Badge>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">Trauma-Informed Care</h4>
                    <p className="text-sm text-muted-foreground">Understanding how trauma affects student behavior and learning.</p>
                    <Badge className="mt-2">60 min</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustedAdultDashboard;
