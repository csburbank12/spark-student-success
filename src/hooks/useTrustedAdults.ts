
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface TrustedAdult {
  id: string;
  staff_id: string;
  student_id: string;
  staff_name: string;
  staff_role: string;
  created_at?: string;
}

export function useTrustedAdults(studentId: string) {
  const [trustedAdults, setTrustedAdults] = useState<TrustedAdult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTrustedAdults = async () => {
    if (!studentId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // Get the student's trusted adults
      const { data, error } = await supabase
        .from('trusted_adults')
        .select(`
          id, 
          staff_id,
          student_id,
          created_at,
          staff_members(id, position)
        `)
        .eq('student_id', studentId);

      if (error) {
        throw error;
      }

      // Transform the data to include staff information
      const formattedData = data ? data.map((item: any) => ({
        id: item.id,
        staff_id: item.staff_id,
        student_id: item.student_id,
        staff_name: item.staff_members?.name || 'Unknown Staff',
        staff_role: item.staff_members?.position || 'Staff Member',
        created_at: item.created_at,
      })) : [];

      setTrustedAdults(formattedData);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching trusted adults:', error);
      toast({
        title: "Error",
        description: "Could not load trusted adults. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const addTrustedAdult = async (staffId: string) => {
    try {
      if (!studentId || !staffId) return;

      const { data, error } = await supabase
        .from('trusted_adults')
        .insert({
          student_id: studentId,
          staff_id: staffId
        })
        .select();

      if (error) throw error;

      // Refresh the list after adding
      fetchTrustedAdults();
      
      toast({
        title: "Trusted Adult Added",
        description: "This staff member has been added to your trusted adults.",
      });

      return data;
    } catch (error: any) {
      console.error('Error adding trusted adult:', error);
      toast({
        title: "Error",
        description: "Could not add trusted adult. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeTrustedAdult = async (trustedAdultId: string) => {
    try {
      const { error } = await supabase
        .from('trusted_adults')
        .delete()
        .eq('id', trustedAdultId);

      if (error) throw error;

      // Update the local state by filtering out the removed item
      setTrustedAdults(trustedAdults.filter(adult => adult.id !== trustedAdultId));
      
      toast({
        title: "Trusted Adult Removed",
        description: "This staff member has been removed from your trusted adults.",
      });
    } catch (error: any) {
      console.error('Error removing trusted adult:', error);
      toast({
        title: "Error",
        description: "Could not remove trusted adult. Please try again.",
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
