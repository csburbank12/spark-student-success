
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useResetSession = () => {
  const [initialMood, setInitialMood] = useState<number>(5);
  const [finalMood, setFinalMood] = useState<number>(5);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [completedReset, setCompletedReset] = useState(false);
  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem("resetRoomSessionCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  const { toast } = useToast();

  const updateInitialMood = useCallback((value: number) => {
    setInitialMood(value);
  }, []);

  const updateFinalMood = useCallback((value: number) => {
    setFinalMood(value);
  }, []);

  const completeReset = useCallback(() => {
    setCompletedReset(true);
  }, []);

  const finishSession = useCallback(() => {
    const moodChange = finalMood - initialMood;
    const newCount = sessionCount + 1;
    setSessionCount(newCount);
    localStorage.setItem("resetRoomSessionCount", newCount.toString());
    
    // Reset the session state
    setCompletedReset(false);
    setInitialMood(5);
    setFinalMood(5);
    setSelectedGoal("");

    toast({
      description: moodChange > 0 
        ? "Great progress! Your mood has improved." 
        : "Remember, it's okay to have ups and downs. Try another activity if needed."
    });
  }, [finalMood, initialMood, sessionCount, toast]);

  return {
    initialMood,
    finalMood,
    selectedGoal,
    completedReset,
    sessionCount,
    updateInitialMood,
    updateFinalMood,
    setSelectedGoal,
    completeReset,
    finishSession,
  };
};
