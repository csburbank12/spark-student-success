
import React, { useState, useEffect } from 'react';
import { useMicroCoach } from '@/contexts/MicroCoachContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface MicroCoachPromptProps {
  studentId: string;
}

const MICRO_COACH_PROMPTS = [
  {
    context: 'Academic Performance',
    prompt: 'Consider scheduling a personalized tutoring session to support learning gaps.'
  },
  {
    context: 'Social-Emotional Support',
    prompt: 'Explore peer mentoring or small group counseling to enhance social skills.'
  },
  {
    context: 'Behavioral Intervention',
    prompt: 'Review and update the student\'s behavior support plan.'
  }
];

export const MicroCoachPrompt: React.FC<MicroCoachPromptProps> = ({ studentId }) => {
  const [currentPrompt, setCurrentPrompt] = useState<{ context: string; prompt: string } | null>(null);
  const { logMicroCoachView } = useMicroCoach();

  useEffect(() => {
    // Randomly select a prompt
    const randomPrompt = MICRO_COACH_PROMPTS[Math.floor(Math.random() * MICRO_COACH_PROMPTS.length)];
    setCurrentPrompt(randomPrompt);
  }, [studentId]);

  const handlePromptAction = () => {
    if (currentPrompt) {
      logMicroCoachView(studentId, currentPrompt.prompt, currentPrompt.context);
    }
  };

  if (!currentPrompt) return null;

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
          Micro-Coach Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">
          <span className="font-semibold">Context: </span>{currentPrompt.context}
        </div>
        <p className="text-muted-foreground mb-3">{currentPrompt.prompt}</p>
        <Button size="sm" onClick={handlePromptAction}>
          Take Action
        </Button>
      </CardContent>
    </Card>
  );
};
