import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, CloudSun, Heart, Moon, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import BoxBreathing from "./reset-room/BoxBreathing";
import GroundingExercise from "./reset-room/GroundingExercise";
import BodyScan from "./reset-room/BodyScan";
import PositiveAffirmations from "./reset-room/PositiveAffirmations";

const ResetRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [progress, setProgress] = useState(100);
  const { toast } = useToast();

  const startTimer = () => {
    setTimerRunning(true);
    toast({
      title: "Reset Timer Started",
      description: "Take 5 minutes to reset and recharge.",
    });
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimeRemaining(300);
    setProgress(100);
    toast({
      title: "Reset Timer Stopped",
      description: "You can restart the timer anytime you need.",
    });
  };

  const finishEarly = () => {
    setTimerRunning(false);
    setTimeRemaining(300);
    setProgress(100);
    toast({
      title: "Reset Complete",
      description: "Great job taking time for yourself! How do you feel now?",
    });
  };

  React.useEffect(() => {
    let timerId: number | undefined;
    if (timerRunning && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          const newProgress = (newTime / 300) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      setTimerRunning(false);
      toast({
        title: "Reset Complete",
        description: "Great job taking 5 minutes for yourself! How do you feel now?",
      });
      setTimeRemaining(300);
      setProgress(100);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerRunning, timeRemaining, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">5-Minute Reset Room</h2>
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
            Choose an activity below and take 5 minutes to refocus your energy.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between gap-4 mb-6">
            {!timerRunning ? (
              <Button onClick={startTimer} className="w-full">Start 5-Minute Reset</Button>
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
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="breathing" className="flex flex-col items-center gap-1 py-2">
                <CloudSun className="h-4 w-4" />
                <span className="text-xs">Quick Breathing</span>
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetRoom;
