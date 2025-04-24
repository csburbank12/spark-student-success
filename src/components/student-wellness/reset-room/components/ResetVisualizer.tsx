
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ResetVisualizerProps {
  animationUrl: string;
  isTimerRunning: boolean;
  selectedGoal: string;
}

const ResetVisualizer: React.FC<ResetVisualizerProps> = ({
  animationUrl,
  isTimerRunning,
  selectedGoal,
}) => {
  return (
    <Card>
      <CardContent className="p-0 overflow-hidden rounded-md">
        <div className="bg-muted aspect-video flex items-center justify-center">
          <p className="text-muted-foreground">
            {isTimerRunning
              ? `${selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)} exercise visualization would appear here`
              : "Start the timer to begin your reset exercise"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetVisualizer;
