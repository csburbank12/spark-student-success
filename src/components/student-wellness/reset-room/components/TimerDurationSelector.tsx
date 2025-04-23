
import React from 'react';
import { Button } from "@/components/ui/button";

interface TimerDurationSelectorProps {
  isCustomTime: boolean;
  customTime: number;
  onDurationSelect: (minutes: number) => void;
}

const TimerDurationSelector: React.FC<TimerDurationSelectorProps> = ({
  isCustomTime,
  customTime,
  onDurationSelect
}) => {
  return (
    <div className="mt-3">
      <p className="text-sm font-medium mb-2">Timer duration:</p>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={!isCustomTime ? "default" : "outline"} 
          size="sm" 
          onClick={() => onDurationSelect(5)}
        >
          5 minutes
        </Button>
        <Button 
          variant={isCustomTime && customTime === 180 ? "default" : "outline"} 
          size="sm" 
          onClick={() => onDurationSelect(3)}
        >
          3 minutes
        </Button>
        <Button 
          variant={isCustomTime && customTime === 60 ? "default" : "outline"} 
          size="sm" 
          onClick={() => onDurationSelect(1)}
        >
          1 minute
        </Button>
      </div>
    </div>
  );
};

export default TimerDurationSelector;
