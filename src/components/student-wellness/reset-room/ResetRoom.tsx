
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useResetTimer } from "./hooks/useResetTimer";
import MoodAssessment from "./components/MoodAssessment";
import TimerControls from "./components/TimerControls";
import TimerDurationSelector from "./components/TimerDurationSelector";

const ANIMATION_URLS = [
  "/animations/breathing.mp4",
  "/animations/meditation.mp4",
  "/animations/visualization.mp4",
];

const ResetRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [initialMood, setInitialMood] = useState<number>(5);
  const [finalMood, setFinalMood] = useState<number>(5);
  const [selectedGoal, setSelectedGoal] = useState<string>("calm");
  const [animationUrl, setAnimationUrl] = useState<string>(ANIMATION_URLS[0]);
  const [completedReset, setCompletedReset] = useState<boolean>(false);
  const {
    timerRunning,
    progress,
    timeRemaining,
    startTimer,
    stopTimer,
    resetTimer,
    setCustomTime,
    isCustomTime,
    customTime,
  } = useResetTimer();

  // When timer completes, prompt for final mood assessment
  useEffect(() => {
    if (timerRunning && timeRemaining === 0) {
      setCompletedReset(true);
      toast({
        title: "Reset Complete",
        description: "Great job! How are you feeling now?",
      });
    }
  }, [timerRunning, timeRemaining, toast]);

  // Randomly choose an animation when goal changes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ANIMATION_URLS.length);
    setAnimationUrl(ANIMATION_URLS[randomIndex]);
  }, [selectedGoal]);

  const handleSubmitFinalMood = (moodValue: number) => {
    // In a real app, we would save the mood data to the database
    toast({
      title: "Recovery Recorded",
      description: `Your mood improved from ${initialMood} to ${moodValue}. Great progress!`,
    });
    
    // Reset the timer state
    resetTimer();
    setCompletedReset(false);
    
    // Navigate back after a short delay
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleDurationSelect = (minutes: number) => {
    setCustomTime(minutes * 60);
  };

  const handleStartTimer = () => {
    startTimer();
    toast({
      title: "Reset Started",
      description: `Taking ${isCustomTime ? customTime / 60 : 5} minutes to ${selectedGoal}.`,
    });
  };

  const handleStopTimer = () => {
    stopTimer();
    toast({
      description: "Reset paused. Take your time.",
    });
  };

  const handleFinishEarly = () => {
    stopTimer();
    setCompletedReset(true);
    toast({
      title: "Reset Completed Early",
      description: "How are you feeling now?",
    });
  };

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Mood Assessment and Timer Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reset Room</CardTitle>
              <CardDescription>
                Take a moment to reset and regain focus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!timerRunning && !completedReset && (
                <MoodAssessment
                  type="before"
                  moodValue={initialMood}
                  onMoodChange={setInitialMood}
                  selectedGoal={selectedGoal}
                  onGoalSelect={handleGoalSelect}
                />
              )}

              {!completedReset && (
                <>
                  {!timerRunning && (
                    <TimerDurationSelector
                      isCustomTime={isCustomTime}
                      customTime={customTime}
                      onDurationSelect={handleDurationSelect}
                    />
                  )}

                  <TimerControls
                    progress={progress}
                    timerRunning={timerRunning}
                    timeRemaining={timeRemaining}
                    isCustomTime={isCustomTime}
                    customTime={customTime}
                    onStart={handleStartTimer}
                    onStop={handleStopTimer}
                    onFinishEarly={handleFinishEarly}
                  />
                </>
              )}

              {completedReset && (
                <MoodAssessment
                  type="after"
                  moodValue={finalMood}
                  onMoodChange={setFinalMood}
                  onSubmit={handleSubmitFinalMood}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Visualization / Animation */}
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-md">
            {/* Placeholder for animation/video content */}
            <div className="bg-muted aspect-video flex items-center justify-center">
              <p className="text-muted-foreground">
                {timerRunning
                  ? `${selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)} exercise visualization would appear here`
                  : "Start the timer to begin your reset exercise"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guidance and Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Guidance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Tips for {selectedGoal}</h3>
              <ul className="list-disc pl-5 pt-2 space-y-1">
                {selectedGoal === "calm" && (
                  <>
                    <li>Take slow, deep breaths through your nose.</li>
                    <li>Focus on each breath as it enters and leaves your body.</li>
                    <li>
                      When your mind wanders, gently bring it back to your breath.
                    </li>
                  </>
                )}
                {selectedGoal === "focus" && (
                  <>
                    <li>Find a comfortable position and sit upright.</li>
                    <li>Focus on one specific object or thought.</li>
                    <li>
                      Notice when your mind wanders and return to your focal point.
                    </li>
                  </>
                )}
                {selectedGoal === "confidence" && (
                  <>
                    <li>Stand or sit in a confident posture.</li>
                    <li>Recall a time when you felt capable and strong.</li>
                    <li>
                      Use positive self-talk and affirmations during this exercise.
                    </li>
                  </>
                )}
                {selectedGoal === "energy" && (
                  <>
                    <li>Take several energizing breaths.</li>
                    <li>Gently stretch your arms, legs and shoulders.</li>
                    <li>
                      Visualize energy flowing through your body with each breath.
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetRoom;
