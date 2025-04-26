
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

const moodOptions: MoodOption[] = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😌", label: "Good", value: "good" },
  { emoji: "😐", label: "Okay", value: "okay" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😫", label: "Stressed", value: "stressed" },
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onSelect: (mood: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {moodOptions.map((option) => (
        <Button
          key={option.value}
          variant="outline"
          className={cn(
            "flex flex-col items-center justify-center h-24 p-4 hover:bg-accent",
            selectedMood === option.value && "border-primary bg-primary/10"
          )}
          onClick={() => onSelect(option.value)}
        >
          <span className="text-3xl mb-1">{option.emoji}</span>
          <span className="text-sm font-medium">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};

