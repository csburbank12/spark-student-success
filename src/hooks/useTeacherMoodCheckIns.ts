
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TeacherMoodCheckIn {
  id: string;
  student_id: string;
  teacher_id: string;
  mood_type: string;
  energy_level: number;
  notes?: string;
  created_at: string;
}

function isArrayGuard<T>(data: any): data is T[] {
  return Array.isArray(data) && (data.length === 0 || typeof data[0] === 'object');
}

export function useTeacherMoodCheckIns(studentId: string, daysBack = 30) {
  const [checkIns, setCheckIns] = useState<TeacherMoodCheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTeacherMoodCheckIns = async () => {
    try {
      setIsLoading(true);

      if (!studentId) {
        setCheckIns([]);
        return;
      }

      const { data, error } = await supabase.rpc('get_teacher_mood_check_ins', {
        p_student_id: studentId,
        p_days_back: daysBack
      });

      if (error) throw error;
      if (isArrayGuard<TeacherMoodCheckIn>(data)) {
        setCheckIns(data);
      } else {
        setCheckIns([]);
      }
    } catch (error) {
      console.error('Error fetching teacher mood check-ins:', error);
      toast({
        title: "Error",
        description: "Could not load teacher mood check-ins. Please try again.",
        variant: "destructive"
      });
      setCheckIns([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addTeacherMoodCheckIn = async (checkIn: Omit<TeacherMoodCheckIn, 'id' | 'created_at'>) => {
    try {
      if (!user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to add a check-in.",
          variant: "destructive"
        });
        return null;
      }

      const { data, error } = await supabase.rpc('insert_teacher_mood_check_in', {
        p_student_id: checkIn.student_id,
        p_teacher_id: checkIn.teacher_id,
        p_mood_type: checkIn.mood_type,
        p_energy_level: checkIn.energy_level,
        p_notes: checkIn.notes || null
      });

      if (error) throw error;
      await fetchTeacherMoodCheckIns();

      toast({
        title: "Check-in recorded",
        description: "Student mood check-in has been recorded successfully.",
      });

      // data is an array of results usually
      return data;
    } catch (error) {
      console.error('Error adding teacher mood check-in:', error);
      toast({
        title: "Error",
        description: "Could not record check-in. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchTeacherMoodCheckIns();
    // eslint-disable-next-line
  }, [studentId, daysBack]);

  return {
    checkIns,
    isLoading,
    addTeacherMoodCheckIn,
    refreshTeacherMoodCheckIns: fetchTeacherMoodCheckIns
  };
}

export function useTeacherMoodTrends(studentId: string, daysBack = 30) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setIsLoading(true);

        if (!studentId) {
          setData([]);
          return;
        }

        const { data, error } = await supabase.rpc('get_teacher_mood_trends', {
          p_student_id: studentId,
          p_days_back: daysBack
        });

        if (error) throw error;
        if (isArrayGuard<any>(data)) {
          setData(data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching teacher mood trends:', error);
        toast({
          title: "Error",
          description: "Could not load teacher mood trends. Please try again.",
          variant: "destructive"
        });
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrends();
    // eslint-disable-next-line
  }, [studentId, daysBack]);

  return { data, isLoading };
}
