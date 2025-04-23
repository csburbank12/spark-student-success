
import React, { Suspense } from "react";
import PredictiveSupportEngine from "@/components/predictive-support/PredictiveSupportEngine";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";

const PredictiveSupport = () => {
  return (
    <Suspense fallback={
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <Loader size="lg" />
        </CardContent>
      </Card>
    }>
      <ErrorBoundary>
        <PredictiveSupportEngine />
      </ErrorBoundary>
    </Suspense>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
            <p className="text-muted-foreground">
              There was an error loading the predictive support dashboard. 
              Please try refreshing the page or contact support if the issue persists.
            </p>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default PredictiveSupport;
