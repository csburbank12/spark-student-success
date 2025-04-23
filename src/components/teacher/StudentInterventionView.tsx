import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentSELSupportToolkit } from "./StudentSELSupportToolkit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface StudentInterventionViewProps {
  studentId: string;
  studentName: string;
  onBack: () => void;
}

const StudentInterventionView: React.FC<StudentInterventionViewProps> = ({
  studentId,
  studentName,
  onBack,
}) => {
  const [recentMood, setRecentMood] = useState<string | undefined>(undefined);

  // Fetch student's recent mood
  const { data: moodData } = useQuery({
    queryKey: ["student-mood", studentId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .rpc("get_user_mood_trends", { user_uuid: studentId, days_back: 7 });
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching student mood:", error);
        return [];
      }
    },
    enabled: !!studentId,
  });

  // Set recent mood
  useEffect(() => {
    if (moodData && moodData.length > 0) {
      setRecentMood(moodData[0].mood_type);
    }
  }, [moodData]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src="/student-avatar.png" />
            <AvatarFallback>{studentName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-heading font-bold">{studentName}</h2>
        </div>
        <div></div> {/* Empty div to balance the flex layout */}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <StudentSELSupportToolkit 
            studentId={studentId} 
            studentName={studentName} 
            recentMood={recentMood}
          />
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sel">SEL</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              {/* Original overview tab content */}
            </TabsContent>
            
            <TabsContent value="sel" className="space-y-4">
              <h3 className="text-lg font-medium">SEL Progress</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Self-Awareness</div>
                    <div className="text-sm">65%</div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Self-Management</div>
                    <div className="text-sm">45%</div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Relationship Skills</div>
                    <div className="text-sm">80%</div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="attendance">
              {/* Original attendance tab content */}
            </TabsContent>
            
            <TabsContent value="notes">
              {/* Original notes tab content */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentInterventionView;
