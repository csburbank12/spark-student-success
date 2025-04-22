
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const totalDuration = 40; // Total cycle duration in seconds
  const inhaleTime = 4;
  const holdTime = 4;
  const exhaleTime = 4;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 0.1;
          const cyclePosition = newSeconds % (inhaleTime + holdTime + exhaleTime);
          
          // Update current phase
          if (cyclePosition < inhaleTime) {
            setCurrentPhase("inhale");
          } else if (cyclePosition < inhaleTime + holdTime) {
            setCurrentPhase("hold");
          } else {
            setCurrentPhase("exhale");
          }
          
          // Update progress (0-100)
          setProgress((newSeconds % totalDuration) / totalDuration * 100);
          
          return newSeconds;
        });
      }, 100);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, inhaleTime, holdTime, exhaleTime]);

  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setSeconds(0);
      setProgress(0);
      setCurrentPhase("inhale");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">Box Breathing</h3>
        <p className="text-muted-foreground">
          A simple technique to help reduce stress and improve focus
        </p>
      </div>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div 
          className={`w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ease-in-out ${
            isActive ? 'scale-' + (currentPhase === "inhale" ? "110" : currentPhase === "exhale" ? "90" : "100") : ""
          }`}
        >
          <span className="text-2xl font-medium">
            {currentPhase === "inhale" 
              ? "Breathe In" 
              : currentPhase === "hold" 
              ? "Hold" 
              : "Breathe Out"}
          </span>
        </div>
      </div>
      
      {isActive && (
        <div className="w-full max-w-md space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Cycle: {Math.floor(seconds / (inhaleTime + holdTime + exhaleTime)) + 1}</span>
            <span>
              {currentPhase === "inhale" && "Inhale for 4 seconds"}
              {currentPhase === "hold" && "Hold for 4 seconds"}
              {currentPhase === "exhale" && "Exhale for 4 seconds"}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex gap-4">
        <Button onClick={toggleExercise} size="lg">
          {isActive ? "Stop" : "Start Breathing Exercise"}
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground max-w-md text-center">
        <p>Box breathing can help calm your nervous system, reduce stress, and improve concentration.</p>
        <p className="mt-2">Try to practice for at least 5 minutes (about 8 cycles) for best results.</p>
      </div>
    </div>
  );
};

export default BreathingExercise;
