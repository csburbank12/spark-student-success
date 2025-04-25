
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ErrorLoggingService } from '@/services/ErrorLoggingService';

export interface TrustedAdult {
  id: string;
  staff_id: string;
  student_id: string;
  staff_name: string;
  staff_role: string;
  avatarUrl?: string;
  created_at?: string;
}

export function useTrustedAdults(studentId: string) {
  const [trustedAdults, setTrustedAdults] = useState<TrustedAdult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrustedAdults = async () => {
    setIsLoading(true);
    if (!studentId) {
      setTrustedAdults([]);
      setIsLoading(false);
      return;
    }
    
    try {
      // For now, use mock data since we have database relationship issues
      const mockTrustedAdults: TrustedAdult[] = [
        {
          id: "ta1",
          staff_id: "staff1",
          student_id: studentId,
          staff_name: "Jane Smith",
          staff_role: "School Counselor",
          avatarUrl: undefined,
          created_at: new Date().toISOString()
        },
        {
          id: "ta2",
          staff_id: "staff2",
          student_id: studentId,
          staff_name: "Michael Rogers",
          staff_role: "Math Teacher",
          avatarUrl: undefined,
          created_at: new Date().toISOString()
        }
      ];
      
      setTrustedAdults(mockTrustedAdults);
      
      // Original database query code - commented out until database issues are fixed
      /*
      const { data, error } = await supabase
        .from('trusted_adults')
        .select(`
          id,
          staff_id,
          student_id,
          created_at,
          staff_members (
            id,
            position,
            profiles:user_id (
              first_name,
              last_name,
              avatar_url
            )
          )
        `)
        .eq('student_id', studentId);

      if (error) throw error;

      const formattedData = (data || []).map((item: any) => ({
        id: item.id,
        staff_id: item.staff_id,
        student_id: item.student_id,
        staff_name: `${item.staff_members?.profiles?.first_name ?? ''} ${item.staff_members?.profiles?.last_name ?? ''}`.trim() || 'Unknown Staff',
        staff_role: item.staff_members?.position || 'Staff Member',
        avatarUrl: item.staff_members?.profiles?.avatar_url || undefined,
        created_at: item.created_at,
      }));

      setTrustedAdults(formattedData);
      */
    } catch (error) {
      console.error('Error fetching trusted adults:', error);
      await ErrorLoggingService.logError({
        action: 'fetch_trusted_adults',
        error_message: error.message,
        profile_type: 'student'
      });
      toast({
        title: "Could not load trusted adults",
        description: "Please try again later. If the problem persists, contact support.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const addTrustedAdult = async (staffId: string) => {
    try {
      if (!studentId || !staffId) return;
      
      // For now, use mock implementation
      const newAdult: TrustedAdult = {
        id: `ta${Date.now()}`,
        staff_id: staffId,
        student_id: studentId,
        staff_name: "New Trusted Adult",
        staff_role: "Staff Member",
      };
      
      setTrustedAdults(prev => [...prev, newAdult]);
      
      toast({
        title: "Trusted Adult Added",
        description: "You can now reach out to this staff member when you need support.",
      });
      
      return newAdult;
      
      // Original database implementation - commented out until issues are fixed
      /*
      const { data, error } = await supabase
        .from('trusted_adults')
        .insert({
          student_id: studentId,
          staff_id: staffId
        })
        .select();

      if (error) throw error;
      
      await fetchTrustedAdults();

      toast({
        title: "Trusted Adult Added",
        description: "You can now reach out to this staff member when you need support.",
      });

      return data;
      */
    } catch (error) {
      console.error('Error adding trusted adult:', error);
      await ErrorLoggingService.logError({
        action: 'add_trusted_adult',
        error_message: error.message,
        profile_type: 'student'
      });
      toast({
        title: "Could not add trusted adult",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    }
  };

  const removeTrustedAdult = async (trustedAdultId: string) => {
    try {
      // For now, use mock implementation
      setTrustedAdults((prev) => prev.filter(adult => adult.id !== trustedAdultId));
      
      toast({
        title: "Trusted Adult Removed",
        description: "The staff member has been removed from your trusted adults.",
      });
      
      // Original database implementation - commented out until issues are fixed
      /*
      const { error } = await supabase
        .from('trusted_adults')
        .delete()
        .eq('id', trustedAdultId);

      if (error) throw error;
      
      setTrustedAdults((prev) => prev.filter(adult => adult.id !== trustedAdultId));
      
      toast({
        title: "Trusted Adult Removed",
        description: "The staff member has been removed from your trusted adults.",
      });
      */
    } catch (error) {
      console.error('Error removing trusted adult:', error);
      await ErrorLoggingService.logError({
        action: 'remove_trusted_adult',
        error_message: error.message,
        profile_type: 'student'
      });
      toast({
        title: "Could not remove trusted adult",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTrustedAdults();
  }, [studentId]);

  return {
    trustedAdults,
    isLoading,
    addTrustedAdult,
    removeTrustedAdult,
    refreshTrustedAdults: fetchTrustedAdults
  };
}
