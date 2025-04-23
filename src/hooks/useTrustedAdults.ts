
// Fixed for new trusted_adults schema
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const fetchTrustedAdults = async () => {
    setIsLoading(true);
    if (!studentId) {
      setTrustedAdults([]);
      setIsLoading(false);
      return;
    }
    try {
      // Query trusted_adults join staff_members and profiles
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

      // Build trusted adult objects with avatar/profile support
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
    } catch (error) {
      console.error('Error fetching trusted adults:', error);
      toast({
        title: "Error",
        description: "Could not load trusted adults. Please try again later.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
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
      fetchTrustedAdults();

      toast({
        title: "Trusted Adult Added",
        description: "This staff member has been added to your trusted adults.",
      });

      return data;
    } catch (error) {
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
      setTrustedAdults((prev) => prev.filter(adult => adult.id !== trustedAdultId));
      toast({
        title: "Trusted Adult Removed",
        description: "This staff member has been removed from your trusted adults.",
      });
    } catch (error) {
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
    // eslint-disable-next-line
  }, [studentId]);

  return {
    trustedAdults,
    isLoading,
    addTrustedAdult,
    removeTrustedAdult,
    refreshTrustedAdults: fetchTrustedAdults
  };
}
