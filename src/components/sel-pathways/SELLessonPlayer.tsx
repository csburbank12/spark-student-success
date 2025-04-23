
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface SELLessonPlayerProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content: string;
    pathway: string;
    duration: number;
    media_url?: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const SELLessonPlayer: React.FC<SELLessonPlayerProps> = ({ lesson, onComplete, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Simulated steps based on content sections
  const steps = [
    { title: "Introduction", content: lesson.description },
    { title: "Main Concept", content: lesson.content },
    { title: "Practice", content: "Let's practice applying what you've learned with a quick exercise." },
    { title: "Reflection", content: "Take a moment to reflect on how this lesson applies to your experiences." },
    { title: "Summary", content: "Great job completing this lesson! Here's what you learned today..." }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
      setProgress(((currentStep + 1) / (steps.length - 1)) * 100);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
      setProgress(((currentStep - 1) / (steps.length - 1)) * 100);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" className="mr-4" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lessons
        </Button>
        <h2 className="text-2xl font-medium">
          {lesson.title}
        </h2>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Start</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {lesson.media_url && currentStep === 1 && (
            <div className="mb-4">
              <img 
                src={lesson.media_url} 
                alt={`Visual for ${lesson.title}`} 
                className="rounded-md mx-auto max-h-[200px] mb-4"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p>{steps[currentStep].content}</p>
            
            {currentStep === 2 && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4>Activity</h4>
                <p>Based on the strategy you just learned, how might you apply this in a situation at school?</p>
                <textarea 
                  className="w-full h-24 p-2 mt-2 border rounded-md" 
                  placeholder="Write your response here..."
                />
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="mt-4 space-y-4">
                <h4>Reflection Questions</h4>
                <ul className="space-y-2">
                  <li>How might this strategy help you in challenging situations?</li>
                  <li>When would be a good time to use what you've learned?</li>
                  <li>Who could support you in practicing this skill?</li>
                </ul>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="flex flex-col items-center justify-center mt-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <p className="text-lg font-medium">You've completed this lesson!</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Complete Lesson" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SELLessonPlayer;
