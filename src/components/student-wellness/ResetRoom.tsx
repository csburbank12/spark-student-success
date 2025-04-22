
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, CloudSun, Heart, Moon, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

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

  // Effect to handle the countdown timer
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

  // Format the time as mm:ss
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
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Box Breathing</h3>
                <div className="flex justify-center">
                  <div className="w-48 h-48 border-4 border-primary/30 rounded-xl relative p-4 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <p className="text-sm">Inhale for 4</p>
                      <p className="text-sm">Hold for 4</p>
                      <p className="text-sm">Exhale for 4</p>
                      <p className="text-sm">Hold for 4</p>
                      <p className="text-xs text-muted-foreground mt-4">Follow the rhythm</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Box breathing helps reduce stress and improve focus. Breathe in through your nose, hold, breathe out through your mouth, hold, and repeat.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="grounding">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">5-4-3-2-1 Grounding Exercise</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4">
                      <p className="font-semibold text-center">5</p>
                      <p className="text-sm text-center">things you can see</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-4">
                      <p className="font-semibold text-center">4</p>
                      <p className="text-sm text-center">things you can touch</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50 dark:bg-yellow-900/20">
                    <CardContent className="p-4">
                      <p className="font-semibold text-center">3</p>
                      <p className="text-sm text-center">things you can hear</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 dark:bg-purple-900/20">
                    <CardContent className="p-4">
                      <p className="font-semibold text-center">2</p>
                      <p className="text-sm text-center">things you can smell</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-pink-50 dark:bg-pink-900/20">
                    <CardContent className="p-4">
                      <p className="font-semibold text-center">1</p>
                      <p className="text-sm text-center">thing you can taste</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>This exercise helps you reconnect with your surroundings and the present moment.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mindfulness">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Body Scan</h3>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <ol className="space-y-2 text-sm">
                    <li>1. Sit or lie down in a comfortable position</li>
                    <li>2. Close your eyes and take a few deep breaths</li>
                    <li>3. Focus your attention on your feet, noticing any sensations</li>
                    <li>4. Slowly move your attention up through your legs, torso, arms, and head</li>
                    <li>5. Notice any areas of tension or discomfort</li>
                    <li>6. Breathe into those areas and imagine them relaxing</li>
                    <li>7. Continue until you've scanned your whole body</li>
                  </ol>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>A body scan helps you become aware of physical sensations and release tension you may be holding.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="positivity">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Positive Affirmations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <CardContent className="p-4 text-center">
                      <p className="italic">"I am capable of handling whatever comes my way today."</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20">
                    <CardContent className="p-4 text-center">
                      <p className="italic">"I believe in my abilities and am doing my best."</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20">
                    <CardContent className="p-4 text-center">
                      <p className="italic">"I am allowed to take breaks when I need them."</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                    <CardContent className="p-4 text-center">
                      <p className="italic">"My feelings are valid, and I can express them in healthy ways."</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Choose an affirmation that resonates with you and repeat it to yourself. Take a deep breath between each repetition.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetRoom;
