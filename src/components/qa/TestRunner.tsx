
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, LayoutDashboard } from 'lucide-react';
import { CategoryResult } from './types';

interface TestRunnerProps {
  isRunning: boolean;
  results: CategoryResult[];
  onRunTests: () => void;
}

const TestRunner: React.FC<TestRunnerProps> = ({ isRunning, results, onRunTests }) => {
  return (
    <Button
      onClick={onRunTests}
      disabled={isRunning}
      variant={results.length ? "outline" : "default"}
    >
      {isRunning ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Running Tests...
        </>
      ) : results.length ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4" />
          Run Tests Again
        </>
      ) : (
        <>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Run Full QA Test
        </>
      )}
    </Button>
  );
};

export default TestRunner;

