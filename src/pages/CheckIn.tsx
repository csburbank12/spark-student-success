
import React from "react";
import { MoodSelector } from "@/components/student/MoodSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const CheckIn = () => {
  const [mood, setMood] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!mood) {
      toast.error("Please select your mood");
      return;
    }

    try {
      // In a real app, this would save to your backend
      toast.success("Check-in submitted successfully!");
      setMood(null);
      setNotes("");
    } catch (error) {
      console.error("Error submitting check-in:", error);
      toast.error("Failed to submit check-in");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Daily Check-In</h2>
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MoodSelector selectedMood={mood} onSelect={setMood} />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Would you like to share more? (Optional)
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share your thoughts..."
              className="min-h-[100px]"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full"
            size="lg"
          >
            Submit Check-in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckIn;

