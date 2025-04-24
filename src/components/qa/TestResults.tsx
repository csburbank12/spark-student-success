
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, AlertTriangle, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryResult } from './types';

interface TestResultsProps {
  results: CategoryResult[];
  onDebug: (category: string) => void;
}

const TestResults: React.FC<TestResultsProps> = ({ results, onDebug }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <X className="h-5 w-5 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Loader2 className="h-5 w-5 text-slate-500 animate-spin" />;
    }
  };

  return (
    <div className="space-y-4">
      {results.map((category) => (
        <Card key={category.name}>
          <CardHeader className="py-4">
            <CardTitle className="flex items-center gap-2">
              {category.name}
              {getStatusIcon(category.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {category.tests.map((test) => (
                <div 
                  key={test.name} 
                  className={`p-3 rounded-lg flex justify-between items-start ${
                    test.status === 'failed' 
                      ? 'bg-red-50 border border-red-100' 
                      : 'bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-medium text-sm flex items-center gap-2">
                      {getStatusIcon(test.status)}
                      {test.name}
                    </div>
                    {test.message && (
                      <div className="text-xs text-red-600">{test.message}</div>
                    )}
                  </div>
                  
                  {test.status === 'failed' && (
                    <Button size="sm" variant="ghost" onClick={() => onDebug(category.name)}>
                      Debug
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestResults;

