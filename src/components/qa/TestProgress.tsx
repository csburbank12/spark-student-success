
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TestProgressProps {
  currentTest: string;
  progress: number;
}

const TestProgress: React.FC<TestProgressProps> = ({ currentTest, progress }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Test Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">{currentTest}</div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-right">{progress}% complete</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestProgress;

