
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const BoxBreathing: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale");
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let interval: number | undefined;
    if (isAnimating) {
      interval = window.setInterval(() => {
        setCount(prev => {
          // Each phase lasts 4 seconds
          if (prev >= 3) {
            // Move to next phase
            setBreathingPhase(currentPhase => {
              switch(currentPhase) {
                case "inhale": return "hold1";
                case "hold1": return "exhale";
                case "exhale": return "hold2";
                case "hold2": return "inhale";
                default: return "inhale";
              }
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000); // Update every second
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating]);
  
  const toggleAnimation = () => {
    if (!isAnimating) {
      setBreathingPhase("inhale");
      setCount(0);
    }
    setIsAnimating(prev => !prev);
  };
  
  const getInstructionText = () => {
    switch(breathingPhase) {
      case "inhale": return "Inhale slowly through your nose...";
      case "hold1": return "Hold your breath...";
      case "exhale": return "Exhale slowly through your mouth...";
      case "hold2": return "Hold your breath...";
      default: return "";
    }
  };
  
  // Animation styles for the breathing square
  const squareStyle = {
    width: breathingPhase === "inhale" ? `${(count + 1) * 25}%` : 
           breathingPhase === "exhale" ? `${(4 - count) * 25}%` : "100%",
    height: breathingPhase === "inhale" ? `${(count + 1) * 25}%` : 
            breathingPhase === "exhale" ? `${(4 - count) * 25}%` : "100%",
    transition: "all 1s ease",
    backgroundColor: "rgba(37, 99, 235, 0.1)",
    border: "2px solid rgba(37, 99, 235, 0.5)",
    borderRadius: "8px",
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Box Breathing</h3>
        <Button 
          variant={isAnimating ? "default" : "outline"}
          size="sm"
          onClick={toggleAnimation}
        >
          {isAnimating ? "Stop" : "Start Animation"}
        </Button>
      </div>
      
      <div className="flex justify-center items-center h-48 border rounded-xl bg-muted/30">
        <div className="relative flex items-center justify-center w-full h-full">
          <div style={squareStyle} className="flex items-center justify-center">
            <p className="text-center text-sm font-medium">{isAnimating ? getInstructionText() : "Click Start to begin"}</p>
            {isAnimating && <div className="absolute text-3xl opacity-30 font-bold">{count + 1}</div>}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="font-medium">Instructions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Inhale through your nose for 4 seconds</li>
            <li>Hold your breath for 4 seconds</li>
            <li>Exhale through your mouth for 4 seconds</li>
            <li>Hold your breath for 4 seconds</li>
            <li>Repeat this cycle 3-4 times</li>
          </ol>
        </div>
        <p className="mt-4">
          Box breathing helps reduce stress and improve focus by activating your parasympathetic nervous system.
        </p>
      </div>
    </div>
  );
};

export default BoxBreathing;
