
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useResetSession } from "./hooks/useResetSession";
import { useResetTimer } from "./hooks/useResetTimer";
import { useResetAnimation } from "./hooks/useResetAnimation";
import ResetHeader from "./components/ResetHeader";
import ResetBenefits from "./components/ResetBenefits";
import ResetVisualizer from "./components/ResetVisualizer";
import ActivityTabs from "./components/ActivityTabs";
import TimerDurationSelector from "./components/TimerDurationSelector";
import TimerControls from "./components/TimerControls";
import MoodAssessment from "./components/MoodAssessment";

const ResetRoom: React.FC = () => {
  const { toast } = useToast();
  
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

  const { animationUrl } = useResetAnimation(selectedGoal);

  useEffect(() => {
    if (timerRunning && timeRemaining === 0) {
      completeReset();
      toast({
        title: "Reset Complete",
        description: "Great job! How are you feeling now?",
      });
    }
  }, [timerRunning, timeRemaining, completeReset, toast]);

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
        <Card>
          <div className="space-y-6 p-6">
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
          </div>
        </Card>

        <ResetVisualizer
          animationUrl={animationUrl}
          isTimerRunning={timerRunning}
          selectedGoal={selectedGoal}
        />
      </div>

      <ActivityTabs />
      <ResetBenefits />
    </div>
  );
};

export default ResetRoom;
