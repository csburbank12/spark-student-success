
import React, { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { ErrorBoundary } from "react-error-boundary";
import EmotionSchedulingErrorFallback from "@/components/emotion-scheduling/EmotionSchedulingErrorFallback";
import EmotionSchedulingUI from "@/components/emotion-scheduling/EmotionSchedulingUI";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

const EmotionAwareScheduling: React.FC = () => {
  const { reset } = useQueryErrorResetBoundary();
  const [selectedStudent, setSelectedStudent] = useState("student-123"); // Default student ID

  return (
    <ErrorBoundary
      FallbackComponent={EmotionSchedulingErrorFallback}
      onReset={reset}
    >
      <Suspense fallback={
        <Card>
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <Loader size="lg" />
          </CardContent>
        </Card>
      }>
        <EmotionSchedulingUI studentId={selectedStudent} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default EmotionAwareScheduling;
