
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudSun, Heart, Moon, Star, Music, BookOpen } from "lucide-react";
import BoxBreathing from "./BoxBreathing";
import GroundingExercise from "./GroundingExercise";
import BodyScan from "./BodyScan";
import PositiveAffirmations from "./PositiveAffirmations";
import GuidedMeditation from "../wellness-tools/GuidedMeditation";
import MusicPlayer from "../wellness-tools/MusicPlayer";
import { useResetTimer } from "./hooks/useResetTimer";
import TimerControls from "./components/TimerControls";
import MoodAssessment from "./components/MoodAssessment";
import TimerDurationSelector from "./components/TimerDurationSelector";

const ResetRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [customTime, setCustomTime] = useState(300);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [moodBefore, setMoodBefore] = useState(5);
  const [showMoodBefore, setShowMoodBefore] = useState(true);
  const [showMoodAfter, setShowMoodAfter] = useState(false);
  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem("resetRoomSessionCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  const {
    timerRunning,
    timeRemaining,
    progress,
    startTimer,
    stopTimer,
    finishEarly
  } = useResetTimer(customTime, isCustomTime);

  const handleDurationSelect = (minutes: number) => {
    const seconds = minutes * 60;
    setCustomTime(seconds);
    setIsCustomTime(minutes !== 5);
  };

  const handleFinishSession = (newMood: number) => {
    const moodChange = newMood - moodBefore;
    let message = "";
    
    if (moodChange > 2) {
      message = "Wow! That was really helpful for you.";
    } else if (moodChange > 0) {
      message = "Glad to see a positive change in your mood!";
    } else if (moodChange === 0) {
      message = "Your mood stayed the same. Try a different activity next time?";
    } else {
      message = "If you're still feeling down, consider talking with a counselor.";
    }
    
    toast({
      title: "Session Completed",
      description: message,
    });
    
    setShowMoodAfter(false);
    setShowMoodBefore(true);
  };

  const handleStartTimer = () => {
    setShowMoodBefore(false);
    startTimer();
  };

  const handleFinishEarly = () => {
    finishEarly();
    setShowMoodBefore(false);
    setShowMoodAfter(true);
    
    // Increment and save session count
    const newCount = sessionCount + 1;
    setSessionCount(newCount);
    localStorage.setItem("resetRoomSessionCount", newCount.toString());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold">5-Minute Reset Room</h2>
          <p className="text-muted-foreground">Take a moment to pause, breathe, and reset</p>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          Total resets: {sessionCount}
        </div>
      </div>

      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-muted/30 pb-0">
          <CardTitle>Take a moment to reset</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {showMoodBefore && (
            <div className="mb-6">
              <MoodAssessment
                type="before"
                moodValue={moodBefore}
                onMoodChange={setMoodBefore}
                selectedGoal={selectedGoal}
                onGoalSelect={setSelectedGoal}
              />
              <TimerDurationSelector
                isCustomTime={isCustomTime}
                customTime={customTime}
                onDurationSelect={handleDurationSelect}
              />
            </div>
          )}
          
          {showMoodAfter && (
            <div className="mb-6">
              <MoodAssessment
                type="after"
                moodValue={moodBefore}
                onMoodChange={setMoodBefore}
                onSubmit={handleFinishSession}
              />
            </div>
          )}
          
          <TimerControls
            progress={progress}
            timerRunning={timerRunning}
            timeRemaining={timeRemaining}
            isCustomTime={isCustomTime}
            customTime={customTime}
            onStart={handleStartTimer}
            onStop={stopTimer}
            onFinishEarly={handleFinishEarly}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
            <TabsList className="grid grid-cols-6 mb-6">
              <TabsTrigger value="breathing" className="flex flex-col items-center gap-1 py-2">
                <CloudSun className="h-4 w-4" />
                <span className="text-xs">Breathing</span>
              </TabsTrigger>
              <TabsTrigger value="grounding" className="flex flex-col items-center gap-1 py-2">
                <Star className="h-4 w-4" />
                <span className="text-xs">Grounding</span>
              </TabsTrigger>
              <TabsTrigger value="mindfulness" className="flex flex-col items-center gap-1 py-2">
                <Moon className="h-4 w-4" />
                <span className="text-xs">Mindfulness</span>
              </TabsTrigger>
              <TabsTrigger value="positivity" className="flex flex-col items-center gap-1 py-2">
                <Heart className="h-4 w-4" />
                <span className="text-xs">Positivity</span>
              </TabsTrigger>
              <TabsTrigger value="guided" className="flex flex-col items-center gap-1 py-2">
                <BookOpen className="h-4 w-4" />
                <span className="text-xs">Guided</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex flex-col items-center gap-1 py-2">
                <Music className="h-4 w-4" />
                <span className="text-xs">Music</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="breathing">
              <BoxBreathing />
            </TabsContent>
            <TabsContent value="grounding">
              <GroundingExercise />
            </TabsContent>
            <TabsContent value="mindfulness">
              <BodyScan />
            </TabsContent>
            <TabsContent value="positivity">
              <PositiveAffirmations />
            </TabsContent>
            <TabsContent value="guided">
              <GuidedMeditation />
            </TabsContent>
            <TabsContent value="music">
              <MusicPlayer />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="border border-muted">
        <CardHeader>
          <CardTitle className="text-lg">Reset Room Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <h4 className="font-medium">Emotional Regulation</h4>
              <p className="text-muted-foreground">Help manage strong emotions through mindful practices</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">Improved Focus</h4>
              <p className="text-muted-foreground">Reset your attention to better engage in learning</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">Stress Reduction</h4>
              <p className="text-muted-foreground">Decrease stress hormones and promote calm</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetRoom;
