
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wind } from "lucide-react";

const MindfulBreathing: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [timer, setTimer] = useState(0);
  
  // Durations in seconds for each breath phase
  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2,
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => {
          const newTime = prevTimer + 1;
          
          // Calculate when to move to next phase
          switch (breathPhase) {
            case "inhale":
              if (newTime >= phaseDurations.inhale) {
                setBreathPhase("hold");
                return 0;
              }
              break;
            case "hold":
              if (newTime >= phaseDurations.hold) {
                setBreathPhase("exhale");
                return 0;
              }
              break;
            case "exhale":
              if (newTime >= phaseDurations.exhale) {
                setBreathPhase("rest");
                return 0;
              }
              break;
            case "rest":
              if (newTime >= phaseDurations.rest) {
                setBreathPhase("inhale");
                return 0;
              }
              break;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, breathPhase]);
  
  const getInstructions = () => {
    switch (breathPhase) {
      case "inhale":
        return "Breathe in slowly through your nose";
      case "hold":
        return "Hold your breath";
      case "exhale":
        return "Breathe out slowly through your mouth";
      case "rest":
        return "Pause briefly";
      default:
        return "Breathe mindfully";
    }
  };
  
  // Calculate progress percentage for the current phase
  const getProgressPercentage = () => {
    const maxDuration = phaseDurations[breathPhase];
    return (timer / maxDuration) * 100;
  };

  const toggleExercise = () => {
    if (!isActive) {
      // Reset when starting
      setBreathPhase("inhale");
      setTimer(0);
    }
    setIsActive(!isActive);
  };
  
  const progressStyle = {
    height: breathPhase === "inhale" ? `${getProgressPercentage()}%` : 
           breathPhase === "exhale" ? `${100 - getProgressPercentage()}%` : 
           breathPhase === "hold" ? "100%" : "0%",
    transition: "height 0.5s ease",
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <Wind className="w-5 h-5 mr-2 text-blue-500" /> Mindful Breathing
        </h3>
        <Button 
          variant={isActive ? "destructive" : "default"}
          onClick={toggleExercise}
          size="sm"
        >
          {isActive ? "Stop" : "Start"}
        </Button>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-36 border-2 border-blue-400 rounded-lg overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full bg-blue-200"
            style={progressStyle}
          ></div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-lg font-medium">{getInstructions()}</p>
          {isActive && (
            <p className="text-sm text-muted-foreground">
              {timer}/{phaseDurations[breathPhase]} seconds
            </p>
          )}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">Benefits of mindful breathing:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reduces anxiety and stress</li>
          <li>Improves focus and attention</li>
          <li>Helps regulate emotions</li>
          <li>Promotes overall well-being</li>
        </ul>
        <p className="mt-2">Practice for 3-5 minutes for best results.</p>
      </div>
    </div>
  );
};

export default MindfulBreathing;
