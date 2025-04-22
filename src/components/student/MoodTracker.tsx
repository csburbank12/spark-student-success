import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useAddMoodCheckIn } from "@/hooks/useMoodCheckIns";

interface MoodTrackerProps {
  onSubmit?: (data: { mood: MoodType; energyLevel: number; notes: string }) => void;
}

export const MoodTracker = ({ onSubmit }: MoodTrackerProps) => {
  const [mood, setMood] = useState<MoodType | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [notes, setNotes] = useState<string>("");
  const { user } = useAuth();
  const addMoodCheckIn = useAddMoodCheckIn();

  const handleMoodSelect = (selectedMood: MoodType) => {
    setMood(selectedMood);
  };

  const handleSubmit = async () => {
    if (!mood) {
      toast.error("Please select a mood before submitting");
      return;
    }
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    addMoodCheckIn.mutate(
      {
        userId: user.id,
        mood,
        energyLevel,
        notes,
      },
      {
        onSuccess: () => {
          toast.success("Check-in submitted successfully!");
          setMood(null);
          setEnergyLevel(5);
          setNotes("");
          if (onSubmit) {
            onSubmit({ mood, energyLevel, notes });
          }
        },
        onError: (error: any) => {
          toast.error("Error submitting check-in.");
        },
      }
    );
  };

  const moods: { type: MoodType; emoji: string; label: string }[] = [
    { type: "happy", emoji: "😃", label: "Happy" },
    { type: "good", emoji: "🙂", label: "Good" },
    { type: "okay", emoji: "😐", label: "Okay" },
    { type: "sad", emoji: "😔", label: "Sad" },
    { type: "stressed", emoji: "😣", label: "Stressed" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between gap-2 mb-4">
          {moods.map((m) => (
            <button
              key={m.type}
              className={`emoji-button ${mood === m.type ? "scale-125" : ""}`}
              onClick={() => handleMoodSelect(m.type)}
              aria-label={`Select ${m.label} mood`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-4xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="energy" className="text-sm font-medium">
            Energy Level
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Low</span>
            <Slider
              id="energy"
              min={1}
              max={10}
              step={1}
              value={[energyLevel]}
              onValueChange={(value) => setEnergyLevel(value[0])}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">High</span>
          </div>
          <div className="text-center mt-1">
            <span className="text-sm font-medium">{energyLevel}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Anything you want to share? (Optional)
          </label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-24"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          disabled={!mood}
        >
          Submit Check-in
        </Button>
      </CardContent>
    </Card>
  );
};
