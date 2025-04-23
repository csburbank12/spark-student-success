
import React, { Suspense } from "react";
import PredictiveSupportEngine from "@/components/predictive-support/PredictiveSupportEngine";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const PredictiveSupport = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Card className="border-red-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-4">
              {error.message || "There was an error loading the predictive support dashboard."}
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
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <Loader size="lg" />
          </CardContent>
        </Card>
      }>
        <PredictiveSupportEngine />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PredictiveSupport;
