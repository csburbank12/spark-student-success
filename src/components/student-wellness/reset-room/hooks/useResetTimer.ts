
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const useResetTimer = (customTime: number, isCustomTime: boolean) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [progress, setProgress] = useState(100);
  const { toast } = useToast();

  useEffect(() => {
    let timerId: number | undefined;
    if (timerRunning && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          const newProgress = (newTime / (isCustomTime ? customTime : 300)) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      setTimerRunning(false);
      setTimeRemaining(isCustomTime ? customTime : 300);
      setProgress(100);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerRunning, timeRemaining, isCustomTime, customTime]);

  const startTimer = () => {
    setTimerRunning(true);
    toast({
      title: "Reset Timer Started",
      description: `Taking ${Math.floor(timeRemaining/60)} minutes to reset and recharge.`,
    });
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimeRemaining(isCustomTime ? customTime : 300);
    setProgress(100);
    toast({
      title: "Reset Timer Stopped",
      description: "You can restart the timer anytime you need.",
    });
  };

  const finishEarly = () => {
    setTimerRunning(false);
    setTimeRemaining(isCustomTime ? customTime : 300);
    setProgress(100);
    toast({
      title: "Reset Complete",
      description: "Great job taking time for yourself! How do you feel now?",
    });
  };

  return {
    timerRunning,
    timeRemaining,
    progress,
    startTimer,
    stopTimer,
    finishEarly
  };
};
