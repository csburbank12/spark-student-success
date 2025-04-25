
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useAddMoodCheckIn } from "@/hooks/useMoodCheckIns";

// New imports for refactor/selectors
import MoodColorPalette from "./MoodColorPalette";
import EmojiMoodSelector from "./EmojiMoodSelector";
import MusicGifMoodSelector from "./MusicGifMoodSelector";

type MoodSelectionType = 
  | { type: "color"; value: string; tag: string }
  | { type: "emoji"; value: string; tag: string }
  | { type: "musicGif"; value: string; tag: string }
  | null;

interface MoodTrackerProps {
  onSubmit?: (data: { mood: string; energyLevel: number; notes: string; expressionType: string; tag: string }) => void;
}

export const MoodTracker = ({ onSubmit }: MoodTrackerProps) => {
  const [moodSelection, setMoodSelection] = useState<MoodSelectionType>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [notes, setNotes] = useState<string>("");
  const { user } = useAuth();
  const addMoodCheckIn = useAddMoodCheckIn();
  const [activeSelector, setActiveSelector] = useState<"color"|"emoji"|"musicGif">("emoji");

  // Unified handler with useCallback to prevent unnecessary recreations
  const handleMoodSelect = useCallback((value: string, tag: string) => {
    setMoodSelection({ type: activeSelector, value, tag });
  }, [activeSelector]);

  // Helper to map tags to valid mood type
  const validMoodTypes = ["happy", "good", "okay", "sad", "stressed"] as const;
  function tagToMoodType(tag: string): "happy" | "good" | "okay" | "sad" | "stressed" {
    // Fallback to "okay" if not found
    return validMoodTypes.includes(tag as any) ? (tag as "happy" | "good" | "okay" | "sad" | "stressed") : "okay";
  }

  const handleSubmit = async () => {
    if (!moodSelection) {
      toast.error("Please select your mood before submitting");
      return;
    }
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }
    
    addMoodCheckIn.mutate(
      {
        userId: user.id,
        mood: tagToMoodType(moodSelection.tag),
        energyLevel,
        notes,
        expressionType: moodSelection.type,
      },
      {
        onSuccess: () => {
          toast.success("Check-in submitted successfully!");
          setMoodSelection(null);
          setEnergyLevel(5);
          setNotes("");
          if (onSubmit) {
            onSubmit({ 
              mood: moodSelection.tag, 
              energyLevel, 
              notes, 
              expressionType: moodSelection.type, 
              tag: moodSelection.tag 
            });
          }
        },
        onError: (error: any) => {
          toast.error("Error submitting check-in.");
        },
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How are you expressing yourself today?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selector Switch */}
        <div className="flex gap-2 justify-center">
          <Button size="sm" variant={activeSelector==="emoji"?"default":"outline"} onClick={()=>setActiveSelector("emoji")} aria-label="Emoji selector">😊 Emoji</Button>
          <Button size="sm" variant={activeSelector==="color"?"default":"outline"} onClick={()=>setActiveSelector("color")} aria-label="Color palette selector"><span className="block w-4 h-4 rounded-full bg-primary mr-1 inline-block" />Color</Button>
          <Button size="sm" variant={activeSelector==="musicGif"?"default":"outline"} onClick={()=>setActiveSelector("musicGif")} aria-label="Music or GIF selector">🎶 GIF/Music</Button>
        </div>
        {/* Mood Selector */}
        <div>
          {activeSelector === "emoji" && (
            <EmojiMoodSelector
              selectedEmoji={moodSelection?.type==="emoji"?moodSelection.value:null}
              onSelect={handleMoodSelect}
            />
          )}
          {activeSelector === "color" && (
            <MoodColorPalette
              selectedColor={moodSelection?.type==="color"?moodSelection.value:null}
              onSelect={handleMoodSelect}
            />
          )}
          {activeSelector === "musicGif" && (
            <MusicGifMoodSelector
              onSelect={handleMoodSelect}
            />
          )}
        </div>
        {/* Energy slider, notes */}
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
          disabled={!moodSelection}
        >
          Submit Check-in
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
