
import React, { createContext, useState, useContext, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MicroCoachContextType {
  logMicroCoachView: (studentId: string, prompt: string, context: string) => Promise<void>;
  getMicroCoachHistory: (studentId?: string) => Promise<any[]>;
}

const MicroCoachContext = createContext<MicroCoachContextType | undefined>(undefined);

export const MicroCoachProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const logMicroCoachView = useCallback(async (studentId: string, prompt: string, context: string) => {
    try {
      const { error } = await supabase.from('micro_coach_logs').insert({
        student_id: studentId,
        viewed_prompt: prompt,
        context: context,
        user_id: supabase.auth.currentUser?.id
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging micro-coach view:', error);
    }
  }, []);

  const getMicroCoachHistory = useCallback(async (studentId?: string) => {
    try {
      const query = supabase
        .from('micro_coach_logs')
        .select('*')
        .order('viewed_at', { ascending: false });

      if (studentId) query.eq('student_id', studentId);

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching micro-coach history:', error);
      return [];
    }
  }, []);

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
