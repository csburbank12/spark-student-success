
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const MOOD_SCALE = [
  { label: "😄 Very Good", value: 5 },
  { label: "🙂 Good", value: 4 },
  { label: "😐 Okay", value: 3 },
  { label: "🙁 Bad", value: 2 },
  { label: "😢 Very Bad", value: 1 },
];

const SAFETY_SCALE = [
  { label: "I feel very safe", value: 5 },
  { label: "I feel safe", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "I feel unsafe at times", value: 2 },
  { label: "I do not feel safe", value: 1 },
];

const BELONGING_SCALE = [
  { label: "I feel I really belong", value: 5 },
  { label: "I often belong", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "I sometimes feel left out", value: 2 },
  { label: "I do not feel I belong", value: 1 },
];

const CulturePulseSurvey: React.FC = () => {
  const { user } = useAuth();
  const [surveyType, setSurveyType] = useState<"student" | "staff">("student");
  const [mood, setMood] = useState<number | null>(null);
  const [safety, setSafety] = useState<number | null>(null);
  const [belonging, setBelonging] = useState<number | null>(null);
  const [openFeedback, setOpenFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitSurvey = async () => {
    if (!user?.id) {
      toast("Please log in to submit your survey.");
      return;
    }
    if (!mood || !safety || !belonging) {
      toast("Please complete all questions!");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("culture_pulse_surveys").insert({
      user_id: user.id,
      survey_type: surveyType,
      mood_score: mood,
      safety_perception: safety,
      belonging_score: belonging,
      open_feedback: openFeedback,
    });
    setLoading(false);
    if (error) {
      toast("Submission failed", { description: error.message });
    } else {
      setSubmitted(true);
      toast("Thank you! Your survey has been submitted.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Survey Received</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Thank you for submitting the Culture Pulse survey! Your voice matters.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Culture Pulse Tracker</CardTitle>
          <div className="text-muted-foreground text-sm">
            Weekly check-in on mood, safety, and belonging ({user?.role === "staff" ? "Staff" : "Student"})
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block font-medium mb-1">Your mood this week:</label>
            <div className="flex flex-col gap-2">
              {MOOD_SCALE.map((o) => (
                <label key={o.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mood"
                    value={o.value}
                    checked={mood === o.value}
                    onChange={() => setMood(o.value)}
                    className="accent-primary"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">How safe do you feel at school?</label>
            <div className="flex flex-col gap-2">
              {SAFETY_SCALE.map((o) => (
                <label key={o.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="safety"
                    value={o.value}
                    checked={safety === o.value}
                    onChange={() => setSafety(o.value)}
                    className="accent-primary"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Do you feel you belong at school?</label>
            <div className="flex flex-col gap-2">
              {BELONGING_SCALE.map((o) => (
                <label key={o.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="belonging"
                    value={o.value}
                    checked={belonging === o.value}
                    onChange={() => setBelonging(o.value)}
                    className="accent-primary"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Anything else you'd like to share?</label>
            <Textarea
              value={openFeedback}
              onChange={(e) => setOpenFeedback(e.target.value)}
              placeholder="Optional comments or suggestions..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={submitSurvey} disabled={loading}>
            {loading ? "Submitting..." : "Submit Survey"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CulturePulseSurvey;
