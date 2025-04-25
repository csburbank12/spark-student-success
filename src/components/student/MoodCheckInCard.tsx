
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const MoodCheckInCard = () => {
  const { user } = useAuth();
  const [mood, setMood] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(5); // 1-10
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const handleSubmit = async () => {
    if (!mood) {
      toast.error('Please select a mood before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, this would save to Supabase
      // const { error } = await supabase
      //   .from('mood_check_ins')
      //   .insert({
      //     user_id: user?.id,
      //     mood_type: mood,
      //     energy_level: energyLevel,
      //     notes: notes || null
      //   });
      
      // if (error) throw error;
      
      toast.success('Check-in submitted successfully!');
      setHasCheckedIn(true);
      
      // Mock some AI response in a real app this would come from the backend
      setTimeout(() => {
        toast.info('WellLens AI has processed your check-in', {
          description: 'Your response has been recorded. Keep tracking your moods to see patterns over time.',
          duration: 5000,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting mood check-in:', error);
      toast.error('Failed to submit check-in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setMood(null);
    setEnergyLevel(5);
    setNotes('');
    setHasCheckedIn(false);
  };

  if (hasCheckedIn) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-green-100 p-3">
            <svg 
              className="h-6 w-6 text-green-600" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-center">Thanks for checking in!</h3>
          <p className="text-center text-muted-foreground">
            Your response has been recorded. Remember, you can check in anytime your mood changes.
          </p>
          <Button onClick={resetForm} variant="outline">
            Check In Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling?</CardTitle>
        <CardDescription>
          Your daily check-in helps us understand how to better support you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Label
            htmlFor="mood-happy"
            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
              mood === 'happy' ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
            onClick={() => setMood('happy')}
          >
            <span className="text-3xl">😃</span>
            <span className="mt-2 font-medium">Happy</span>
            <RadioGroup value={mood || ''} className="hidden">
              <RadioGroupItem value="happy" id="mood-happy" />
            </RadioGroup>
          </Label>
          
          <Label
            htmlFor="mood-good"
            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
              mood === 'good' ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
            onClick={() => setMood('good')}
          >
            <span className="text-3xl">🙂</span>
            <span className="mt-2 font-medium">Good</span>
            <RadioGroup value={mood || ''} className="hidden">
              <RadioGroupItem value="good" id="mood-good" />
            </RadioGroup>
          </Label>
          
          <Label
            htmlFor="mood-okay"
            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
              mood === 'okay' ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
            onClick={() => setMood('okay')}
          >
            <span className="text-3xl">😐</span>
            <span className="mt-2 font-medium">Okay</span>
            <RadioGroup value={mood || ''} className="hidden">
              <RadioGroupItem value="okay" id="mood-okay" />
            </RadioGroup>
          </Label>
          
          <Label
            htmlFor="mood-tired"
            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
              mood === 'tired' ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
            onClick={() => setMood('tired')}
          >
            <span className="text-3xl">😴</span>
            <span className="mt-2 font-medium">Tired</span>
            <RadioGroup value={mood || ''} className="hidden">
              <RadioGroupItem value="tired" id="mood-tired" />
            </RadioGroup>
          </Label>
          
          <Label
            htmlFor="mood-sad"
            className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
              mood === 'sad' ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
            onClick={() => setMood('sad')}
          >
            <span className="text-3xl">😔</span>
            <span className="mt-2 font-medium">Sad</span>
            <RadioGroup value={mood || ''} className="hidden">
              <RadioGroupItem value="sad" id="mood-sad" />
            </RadioGroup>
          </Label>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Energy Level</Label>
            <span className="text-muted-foreground">{energyLevel}/10</span>
          </div>
          <Slider
            value={[energyLevel]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setEnergyLevel(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low Energy</span>
            <span>High Energy</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Anything you'd like to share? (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="How are you feeling? What's on your mind?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit} 
          disabled={!mood || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Check-In'}
        </Button>
      </CardFooter>
    </Card>
  );
};
