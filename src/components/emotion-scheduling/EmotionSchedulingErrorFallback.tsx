
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const EmotionSchedulingErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <Card className="border-red-300">
    <CardContent className="p-6">
      <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-4">
        {error.message || "There was an error loading the emotion-aware scheduling data."}
      </p>
      <div className="mt-4">
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </CardContent>
  </Card>
);

export default EmotionSchedulingErrorFallback;
