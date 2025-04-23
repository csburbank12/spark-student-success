
import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import BehaviorPredictionDashboard from "@/components/predictive-support/dashboard/BehaviorPredictionDashboard";
import PredictionConfidenceCard from "@/components/predictive-support/dashboard/PredictionConfidenceCard";
import { ErrorBoundary } from "react-error-boundary";

const BehaviorPrediction: React.FC = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Card className="border-red-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-4">
              {error.message || "Failed to load behavior prediction data."}
            </p>
            <button 
              onClick={resetErrorBoundary}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      )}
    >
      <Suspense fallback={
        <Card>
          <CardContent className="flex items-center justify-center min-h-[200px]">
            <Loader size="lg" />
          </CardContent>
        </Card>
      }>
        <div className="space-y-6">
          <BehaviorPredictionDashboard />
          <PredictionConfidenceCard />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default BehaviorPrediction;
