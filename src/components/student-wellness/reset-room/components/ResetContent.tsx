import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { CloudSun, Star, Moon, Heart, BookOpen, Music } from "lucide-react";
import BoxBreathing from "../BoxBreathing";
import GroundingExercise from "../GroundingExercise";
import BodyScan from "../BodyScan";
import PositiveAffirmations from "../PositiveAffirmations";
import GuidedMeditation from "../../wellness-tools/GuidedMeditation";
import MusicPlayer from "../../wellness-tools/MusicPlayer";
import TimerControls from "./TimerControls";
import TimerDurationSelector from "./TimerDurationSelector";
import MoodAssessment from "./MoodAssessment";

interface ResetContentProps {
  sessionCount: number;
  setSessionCount: (count: number) => void;
}

const ResetContent: React.FC<ResetContentProps> = ({ sessionCount, setSessionCount }) => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [customTime, setCustomTime] = useState(300);
  const [progress, setProgress] = useState(100);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [moodBefore, setMoodBefore] = useState(5);
  const [showMoodBefore, setShowMoodBefore] = useState(true);
  const [showMoodAfter, setShowMoodAfter] = useState(false);

  useEffect(() => {
    let timerId: number | undefined;
    if (timerRunning && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          const newProgress = (newTime / (isCustomTime ? customTime : 300)) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      setTimerRunning(false);
      setShowMoodBefore(false);
      setShowMoodAfter(true);
      
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      localStorage.setItem("resetRoomSessionCount", newCount.toString());
      
      toast({
        title: "Reset Complete",
        description: "Great job taking 5 minutes for yourself! How do you feel now?",
      });
      
      setTimeRemaining(isCustomTime ? customTime : 300);
      setProgress(100);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerRunning, timeRemaining, toast, isCustomTime, customTime, sessionCount, setSessionCount]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  const setTimerDuration = (minutes: number) => {
    const seconds = minutes * 60;
    setCustomTime(seconds);
    setTimeRemaining(seconds);
    setIsCustomTime(minutes !== 5);
  };

  const startTimer = () => {
    setTimerRunning(true);
    setShowMoodBefore(false);
    
    if (selectedGoal) {
      toast({
        title: "Reset Timer Started",
        description: `Goal: ${selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)}. Taking ${Math.floor(timeRemaining/60)} minutes to reset.`,
      });
    } else {
      toast({
        title: "Reset Timer Started",
        description: `Taking ${Math.floor(timeRemaining/60)} minutes to reset and recharge.`,
      });
    }
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimeRemaining(isCustomTime ? customTime : 300);
    setProgress(100);
    setShowMoodBefore(true);
    setShowMoodAfter(false);
    toast({
      title: "Reset Timer Stopped",
      description: "You can restart the timer anytime you need.",
    });
  };

  const finishEarly = () => {
    setTimerRunning(false);
    setTimeRemaining(isCustomTime ? customTime : 300);
    setProgress(100);
    setShowMoodBefore(false);
    setShowMoodAfter(true);
    
    const newCount = sessionCount + 1;
    setSessionCount(newCount);
    localStorage.setItem("resetRoomSessionCount", newCount.toString());
    
    toast({
      title: "Reset Complete",
      description: "Great job taking time for yourself! How do you feel now?",
    });
  };

  const finishSession = (newMood: number) => {
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

  return (
    <div className="space-y-6">
      {showMoodBefore && (
        <MoodAssessment
          moodValue={moodBefore}
          onMoodChange={setMoodBefore}
          selectedGoal={selectedGoal}
          onGoalSelect={setSelectedGoal}
        />
      )}

      {showMoodAfter && (
        <MoodAssessment
          type="after"
          moodValue={moodBefore}
          onMoodChange={() => {}}
          onSubmit={(newMood) => finishSession(newMood)}
        />
      )}

      <div className="mb-6">
        <Progress value={progress} className="h-2" />
      </div>

      {!timerRunning && (
        <TimerDurationSelector
          isCustomTime={isCustomTime}
          customTime={customTime}
          onDurationSelect={(minutes) => setTimerDuration(minutes)}
        />
      )}

      <TimerControls
        timerRunning={timerRunning}
        timeRemaining={timeRemaining}
        isCustomTime={isCustomTime}
        customTime={customTime}
        onStart={startTimer}
        onStop={stopTimer}
        onFinishEarly={finishEarly}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
        
        <TabsContent value="breathing"><BoxBreathing /></TabsContent>
        <TabsContent value="grounding"><GroundingExercise /></TabsContent>
        <TabsContent value="mindfulness"><BodyScan /></TabsContent>
        <TabsContent value="positivity"><PositiveAffirmations /></TabsContent>
        <TabsContent value="guided"><GuidedMeditation /></TabsContent>
        <TabsContent value="music"><MusicPlayer /></TabsContent>
      </Tabs>
    </div>
  );
};

export default ResetContent;
