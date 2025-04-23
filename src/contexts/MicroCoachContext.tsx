
import React, { createContext, useState, useContext, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface MicroCoachLog {
  id?: string;
  student_id: string;
  viewed_prompt: string;
  context: string;
  viewed_at?: string;
  user_id: string;
}

interface MicroCoachContextType {
  logMicroCoachView: (studentId: string, prompt: string, context: string) => Promise<void>;
  getMicroCoachHistory: (studentId?: string) => Promise<MicroCoachLog[]>;
}

const MicroCoachContext = createContext<MicroCoachContextType | undefined>(undefined);

export const MicroCoachProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  const logMicroCoachView = useCallback(async (studentId: string, prompt: string, context: string) => {
    try {
      // Use insertable type rather than table name directly
      const { error } = await supabase
        .from('users')  // Use a table that definitely exists
        .select('id')   // Just do a dummy query
        .limit(0);      // Don't actually fetch any data
      
      // Then do our insert via raw SQL to bypass type checking
      // This is a temporary solution until types are regenerated
      if (!error) {
        const userId = (await supabase.auth.getUser()).data.user?.id || 'anonymous';
        
        await supabase.rpc('insert_micro_coach_log', {
          p_student_id: studentId,
          p_user_id: userId,
          p_viewed_prompt: prompt,
          p_context: context
        }).throwOnError();
      }
    } catch (error) {
      console.error('Error logging micro-coach view:', error);
      toast({
        title: "Error",
        description: "Failed to log micro-coach view",
        variant: "destructive"
      });
    }
  }, [toast]);

  const getMicroCoachHistory = useCallback(async (studentId?: string): Promise<MicroCoachLog[]> => {
    try {
      // Use a basic SQL query to get data without type checking
      let query = `
        SELECT * FROM micro_coach_logs 
        ${studentId ? 'WHERE student_id = $1' : ''} 
        ORDER BY viewed_at DESC
      `;
      
      const { data, error } = await supabase.rpc(
        'get_micro_coach_logs',
        studentId ? { p_student_id: studentId } : {}
      );
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching micro-coach history:', error);
      toast({
        title: "Error",
        description: "Failed to fetch micro-coach history",
        variant: "destructive"
      });
      return [];
    }
  }, [toast]);

  return (
    <MicroCoachContext.Provider value={{ logMicroCoachView, getMicroCoachHistory }}>
      {children}
    </MicroCoachContext.Provider>
  );
};

export const useMicroCoach = () => {
  const context = useContext(MicroCoachContext);
  if (!context) {
    throw new Error('useMicroCoach must be used within a MicroCoachProvider');
  }
  return context;
};
