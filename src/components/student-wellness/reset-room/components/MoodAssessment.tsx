
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MoodAssessmentProps {
  type: 'before' | 'after';
  moodValue: number;
  onMoodChange: (value: number) => void;
  onSubmit?: (value: number) => void;
  selectedGoal?: string;
  onGoalSelect?: (goal: string) => void;
}

const MoodAssessment: React.FC<MoodAssessmentProps> = ({
  type,
  moodValue,
  onMoodChange,
  onSubmit,
  selectedGoal,
  onGoalSelect
}) => {
  const getGoalClass = (goal: string) => {
    if (selectedGoal === goal) {
      return "bg-primary/20 border-primary";
    }
    return "hover:bg-muted";
  };

  return (
    <div className="p-4 bg-muted/30 rounded-lg">
      <p className="text-sm font-medium mb-2">
        How are you feeling {type === 'before' ? 'right now' : 'after your reset'}? (1-10)
      </p>
      <div className="flex items-center gap-4">
        <span className="text-sm">1</span>
        <Slider 
          value={[moodValue]} 
          min={1} 
          max={10} 
          step={1} 
          className="flex-1"
          onValueChange={(val) => onMoodChange(val[0])}
        />
        <span className="text-sm">10</span>
        <span className="text-sm font-medium w-8 text-center">{moodValue}</span>
      </div>

      {type === 'before' && onGoalSelect && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-2">What's your goal for this reset?</p>
          <div className="flex flex-wrap gap-2">
            {['calm', 'focus', 'confidence', 'energy'].map((goal) => (
              <Button 
                key={goal}
                variant="outline" 
                size="sm" 
                onClick={() => onGoalSelect(goal)}
                className={getGoalClass(goal)}
              >
                {goal.charAt(0).toUpperCase() + goal.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {type === 'after' && onSubmit && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => onSubmit(moodValue)}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoodAssessment;
