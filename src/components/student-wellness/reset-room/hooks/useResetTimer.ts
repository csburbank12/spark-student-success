
import { useState, useEffect, useRef } from "react";

export const useResetTimer = (defaultTime = 5 * 60) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(defaultTime);
  const [totalTime, setTotalTime] = useState(defaultTime);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState(defaultTime);
  const timerRef = useRef<number | null>(null);

  // Calculate progress as a percentage
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;

  useEffect(() => {
    // If the timer is running, decrement the time
    if (timerRunning && timeRemaining > 0) {
      // Set up the interval to decrement the time
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      // If time is up, stop the timer
      setTimerRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    // Clean up the interval when component unmounts or timer stops
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerRunning, timeRemaining]);

  // Start the timer
  const startTimer = () => {
    // If custom time is set, use it
    if (isCustomTime) {
      setTimeRemaining(customTime);
      setTotalTime(customTime);
    } else {
      setTimeRemaining(defaultTime);
      setTotalTime(defaultTime);
    }
    setTimerRunning(true);
  };

  // Stop the timer
  const stopTimer = () => {
    setTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Reset the timer to initial values
  const resetTimer = () => {
    stopTimer();
    setTimeRemaining(isCustomTime ? customTime : defaultTime);
    setTotalTime(isCustomTime ? customTime : defaultTime);
  };

  // Set custom timer duration
  const handleSetCustomTime = (minutes: number) => {
    const seconds = minutes * 60;
    setCustomTime(seconds);
    setTotalTime(seconds);
    setTimeRemaining(seconds);
    setIsCustomTime(true);
  };

  return {
    timerRunning,
    progress,
    timeRemaining,
    isCustomTime,
    customTime,
    startTimer,
    stopTimer,
    resetTimer,
    setCustomTime: handleSetCustomTime
  };
};
