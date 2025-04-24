
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface TimerControlsProps {
  progress: number;
  timerRunning: boolean;
  timeRemaining: number;
  isCustomTime: boolean;
  customTime: number;
  onStart: () => void;
  onStop: () => void;
  onFinishEarly: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  progress,
  timerRunning,
  timeRemaining,
  isCustomTime,
  customTime,
  onStart,
  onStop,
  onFinishEarly
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span className="font-mono text-lg font-bold">{formatTime(timeRemaining)}</span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-between gap-4">
        {!timerRunning ? (
          <Button onClick={onStart} className="w-full">
            {isCustomTime ? `Start ${customTime / 60}-Minute Reset` : "Start 5-Minute Reset"}
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={onStop} className="flex-1">Cancel</Button>
            <Button variant="default" onClick={onFinishEarly} className="flex-1">
              I'm Ready to Return
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerControls;
