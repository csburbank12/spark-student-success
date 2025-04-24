
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface ResetSessionState {
  initialMood: number;
  finalMood: number;
  selectedGoal: string;
  completedReset: boolean;
  sessionCount: number;
}

export const useResetSession = () => {
  const [state, setState] = useState<ResetSessionState>({
    initialMood: 5,
    finalMood: 5,
    selectedGoal: '',
    completedReset: false,
    sessionCount: parseInt(localStorage.getItem('resetRoomSessionCount') || '0', 10)
  });

  const updateInitialMood = (value: number) => {
    setState(prev => ({ ...prev, initialMood: value }));
  };

  const updateFinalMood = (value: number) => {
    setState(prev => ({ ...prev, finalMood: value }));
  };

  const setSelectedGoal = (goal: string) => {
    setState(prev => ({ ...prev, selectedGoal: goal }));
  };

  const completeReset = () => {
    const newCount = state.sessionCount + 1;
    setState(prev => ({ 
      ...prev, 
      completedReset: true,
      sessionCount: newCount 
    }));
    localStorage.setItem('resetRoomSessionCount', newCount.toString());
  };

  const finishSession = (finalMoodValue: number) => {
    const moodChange = finalMoodValue - state.initialMood;
    let message = "";
    
    if (moodChange > 2) {
      message = "Wow! That was really helpful for you.";
    } else if (moodChange > 0) {
      message = "Glad to see a positive change in your mood!";
    } else if (moodChange === 0) {
      message = "Your mood stayed the same. Try a different activity next time?";
    } else {
      message = "If you're still feeling down, consider talking with a counselor.";
    }
    
    toast({
      title: "Session Completed",
      description: message,
    });

    setState(prev => ({ 
      ...prev, 
      finalMood: finalMoodValue,
      completedReset: false 
    }));
  };

  return {
    ...state,
    updateInitialMood,
    updateFinalMood,
    setSelectedGoal,
    completeReset,
    finishSession
  };
};
