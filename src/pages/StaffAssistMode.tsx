
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/roles";
import { toast } from "@/components/ui/sonner";
import StaffAssistForm from "@/components/staff-assist/StaffAssistForm";
import InterventionHistory from "@/components/staff-assist/InterventionHistory";
import { StudentProfile, BehaviorLog } from "@/components/staff-assist/types";

const StaffAssistMode: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("assist");

  // Check role, allow only staff or admin
  const isStaffOrAdmin =
    user?.role === UserRole.staff.toString() || user?.role === UserRole.admin.toString();

  // Fetch all students for staff
  const { data: students = [], isLoading: isLoadingStudents } = useQuery({
    queryKey: ["staff-students"],
    queryFn: async () => {
      if (!user?.id || !isStaffOrAdmin) return [] as StudentProfile[];
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student");
        
      if (error) throw error;
      
      // Using explicit type annotation to break type recursion
      return (data || []) as StudentProfile[];
    },
    enabled: !!user?.id && isStaffOrAdmin,
  });

  // Fetch all behavior logs by staff user
  const { data: behaviorLogs = [], refetch: refetchLogs, isLoading: isLoadingLogs } = useQuery({
    queryKey: ["behavior-logs", user?.id],
    queryFn: async () => {
      if (!user?.id || !isStaffOrAdmin) return [] as BehaviorLog[];
      
      const { data, error } = await supabase
        .from("behavior_logs")
        .select("*")
        .eq("staff_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      // Using explicit type annotation to break type recursion
      return (data || []) as BehaviorLog[];
    },
    enabled: !!user?.id && isStaffOrAdmin,
  });

  // Logging new intervention
  const logIntervention = useMutation({
    mutationFn: async (data: {
      studentId: string | null;
      situationType: string;
      interventionUsed: string;
      notes: string;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");
      const { error } = await supabase
        .from("behavior_logs")
        .insert({
          staff_id: user.id,
          student_id: data.studentId,
          situation_type: data.situationType,
          intervention_used: data.interventionUsed,
          notes: data.notes,
          created_at: new Date().toISOString(),
        });
      if (error) throw error;
    },
    onSuccess: () => {
      refetchLogs();
      toast("Intervention logged");
    },
  });

  // Update effectiveness rating
  const updateEffectiveness = useMutation({
    mutationFn: async ({
      logId,
      rating,
    }: {
      logId: string;
      rating: number;
    }) => {
      const { error } = await supabase
        .from("behavior_logs")
        .update({ effectiveness_rating: rating })
        .eq("id", logId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast("Effectiveness rating saved");
      refetchLogs();
    },
    onError: (error) => {
      toast("Failed to save rating", {
        description: error.message,
      });
    },
  });

  // Reset form (noop here for top-level, reset state in child forms)
  const resetForm = () => {};

  if (!isStaffOrAdmin) {
    return (
      <div className="max-w-lg mx-auto mt-20">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Access Denied</h3>
          </div>
          <div className="p-6 pt-0">
            <p>You do not have permission to access Staff Assist Mode.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Staff Assist Mode</h2>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assist">Get Assistance</TabsTrigger>
          <TabsTrigger value="history">Intervention History</TabsTrigger>
        </TabsList>
        <TabsContent value="assist" className="space-y-6 mt-6">
          <StaffAssistForm
            students={students}
            isLogging={logIntervention.isPending}
            onLog={(data) => logIntervention.mutate(data)}
            resetForm={resetForm}
          />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <InterventionHistory
            behaviorLogs={behaviorLogs}
            students={students}
            isLoading={isLoadingLogs}
            updateEffectiveness={(logId, rating) =>
              updateEffectiveness.mutate({ logId, rating })
            }
            isEffectivenessSaving={updateEffectiveness.isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffAssistMode;
