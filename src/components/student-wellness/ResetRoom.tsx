
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, CloudSun, Heart, Moon, Star, Music, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import BoxBreathing from "./reset-room/BoxBreathing";
import GroundingExercise from "./reset-room/GroundingExercise";
import BodyScan from "./reset-room/BodyScan";
import PositiveAffirmations from "./reset-room/PositiveAffirmations";
import GuidedMeditation from "./wellness-tools/GuidedMeditation";
import MusicPlayer from "./wellness-tools/MusicPlayer";

type ResetRoomGoal = "calm" | "focus" | "confidence" | "energy" | "";

const ResetRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [customTime, setCustomTime] = useState(300); // Custom timer setting
  const [progress, setProgress] = useState(100);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<ResetRoomGoal>("");
  const [moodBefore, setMoodBefore] = useState<number>(5); // 1-10 scale
  const [showMoodBefore, setShowMoodBefore] = useState(true);
  const [showMoodAfter, setShowMoodAfter] = useState(false);
  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem("resetRoomSessionCount");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Load session count from localStorage
    const savedSessionCount = localStorage.getItem("resetRoomSessionCount");
    if (savedSessionCount) {
      setSessionCount(parseInt(savedSessionCount, 10));
    }
  }, []);

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
    
    // Increment and save session count
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

  React.useEffect(() => {
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
      
      // Increment and save session count
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
  }, [timerRunning, timeRemaining, toast, isCustomTime, customTime, sessionCount]);

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
  
  const getGoalClass = (goal: ResetRoomGoal) => {
    if (selectedGoal === goal) {
      return "bg-primary/20 border-primary";
    }
    return "hover:bg-muted";
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
          <div className="flex items-center justify-between">
            <CardTitle>Take a moment to reset</CardTitle>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg font-bold">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <CardDescription>
            Choose an activity below and take a few minutes to refocus your energy.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {showMoodBefore && (
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-2">How are you feeling right now? (1-10)</p>
              <div className="flex items-center gap-4">
                <span className="text-sm">1</span>
                <Slider 
                  value={[moodBefore]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  className="flex-1"
                  onValueChange={(val) => setMoodBefore(val[0])}
                />
                <span className="text-sm">10</span>
                <span className="text-sm font-medium w-8 text-center">{moodBefore}</span>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">What's your goal for this reset?</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedGoal("calm")}
                    className={getGoalClass("calm")}
                  >
                    Find calm
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedGoal("focus")}
                    className={getGoalClass("focus")}
                  >
                    Improve focus
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedGoal("confidence")}
                    className={getGoalClass("confidence")}
                  >
                    Build confidence
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedGoal("energy")}
                    className={getGoalClass("energy")}
                  >
                    Boost energy
                  </Button>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Timer duration:</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={!isCustomTime ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTimerDuration(5)}
                  >
                    5 minutes
                  </Button>
                  <Button 
                    variant={isCustomTime && customTime === 180 ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTimerDuration(3)}
                  >
                    3 minutes
                  </Button>
                  <Button 
                    variant={isCustomTime && customTime === 60 ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTimerDuration(1)}
                  >
                    1 minute
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {showMoodAfter && (
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-2">How are you feeling after your reset? (1-10)</p>
              <div className="flex items-center gap-4">
                <span className="text-sm">1</span>
                <Slider 
                  defaultValue={[moodBefore]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  className="flex-1"
                  onValueChange={(val) => {}}
                />
                <span className="text-sm">10</span>
                <span className="text-sm font-medium w-8 text-center" id="mood-value">{moodBefore}</span>
              </div>
              <div className="flex justify-center mt-4">
                <Button onClick={() => finishSession(moodBefore)}>
                  Submit
                </Button>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between gap-4 mb-6">
            {!timerRunning ? (
              <Button onClick={startTimer} className="w-full">
                {isCustomTime ? `Start ${customTime / 60}-Minute Reset` : "Start 5-Minute Reset"}
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={stopTimer} className="flex-1">Cancel</Button>
                <Button variant="default" onClick={finishEarly} className="flex-1">
                  I'm Ready to Return
                </Button>
              </>
            )}
          </div>

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
