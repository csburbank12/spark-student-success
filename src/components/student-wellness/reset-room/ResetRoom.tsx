import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResetSession } from "./hooks/useResetSession";
import { useResetTimer } from "./hooks/useResetTimer";
import ResetHeader from "./components/ResetHeader";
import ResetBenefits from "./components/ResetBenefits";
import ResetVisualizer from "./components/ResetVisualizer";
import MoodAssessment from "./components/MoodAssessment";
import TimerControls from "./components/TimerControls";
import TimerDurationSelector from "./components/TimerDurationSelector";
import BoxBreathing from "./BoxBreathing";
import GroundingExercise from "./GroundingExercise";
import BodyScan from "./BodyScan";
import PositiveAffirmations from "./PositiveAffirmations";
import GuidedMeditation from "../wellness-tools/GuidedMeditation";
import MusicPlayer from "../wellness-tools/MusicPlayer";

const ANIMATION_URLS = [
  "/animations/breathing.mp4",
  "/animations/meditation.mp4",
  "/animations/visualization.mp4",
];

const ResetRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [animationUrl, setAnimationUrl] = useState<string>(ANIMATION_URLS[0]);
  
  const {
    initialMood,
    finalMood,
    selectedGoal,
    completedReset,
    sessionCount,
    updateInitialMood,
    updateFinalMood,
    setSelectedGoal,
    completeReset,
    finishSession
  } = useResetSession();

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

  // Handle timer completion
  useEffect(() => {
    if (timerRunning && timeRemaining === 0) {
      completeReset();
      toast({
        title: "Reset Complete",
        description: "Great job! How are you feeling now?",
      });
    }
  }, [timerRunning, timeRemaining]);

  // Update animation when goal changes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ANIMATION_URLS.length);
    setAnimationUrl(ANIMATION_URLS[randomIndex]);
  }, [selectedGoal]);

  const handleStartTimer = () => {
    startTimer();
    toast({
      title: "Reset Started",
      description: `Taking ${isCustomTime ? customTime / 60 : 5} minutes to ${selectedGoal}.`,
    });
  };

  const handleStopTimer = () => {
    stopTimer();
    resetTimer();
    toast({
      description: "Reset paused. Take your time.",
    });
  };

  const handleFinishEarly = () => {
    stopTimer();
    completeReset();
    toast({
      title: "Reset Completed Early",
      description: "How are you feeling now?",
    });
  };

  return (
    <div className="space-y-6">
      <ResetHeader sessionCount={sessionCount} />

      <div className="grid md:grid-cols-2 gap-6">
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
                  onMoodChange={updateInitialMood}
                  selectedGoal={selectedGoal}
                  onGoalSelect={setSelectedGoal}
                />
              )}

              {!completedReset && (
                <>
                  {!timerRunning && (
                    <TimerDurationSelector
                      isCustomTime={isCustomTime}
                      customTime={customTime}
                      onDurationSelect={(minutes) => setCustomTime(minutes * 60)}
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
                  onMoodChange={updateFinalMood}
                  onSubmit={finishSession}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <ResetVisualizer
          animationUrl={animationUrl}
          isTimerRunning={timerRunning}
          selectedGoal={selectedGoal}
        />
      </div>

      <Card>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="breathing">Breathing</TabsTrigger>
              <TabsTrigger value="grounding">Grounding</TabsTrigger>
              <TabsTrigger value="body-scan">Body Scan</TabsTrigger>
              <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
              <TabsTrigger value="meditation">Meditation</TabsTrigger>
            </TabsList>

            <TabsContent value="breathing">
              <BoxBreathing />
            </TabsContent>

            <TabsContent value="grounding">
              <GroundingExercise />
            </TabsContent>

            <TabsContent value="body-scan">
              <BodyScan />
            </TabsContent>

            <TabsContent value="affirmations">
              <PositiveAffirmations />
            </TabsContent>

            <TabsContent value="meditation">
              <GuidedMeditation />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ResetBenefits />
    </div>
  );
};

export default ResetRoom;
