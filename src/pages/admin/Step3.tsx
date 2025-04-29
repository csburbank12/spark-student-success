
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

interface Step3Props {
  onNext: () => void;
}

export const Step3: React.FC<Step3Props> = ({ onNext }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'pending' | 'processing' | 'validating' | 'complete' | 'error'>('pending');
  const [logs, setLogs] = useState<Array<{ message: string; type: 'info' | 'warning' | 'error' | 'success' }>>([]);

  useEffect(() => {
    // Simulate import process
    const startImport = () => {
      setStatus('processing');
      setLogs(prev => [...prev, { message: 'Starting import process...', type: 'info' }]);

      const interval = setInterval(() => {
        setProgress(oldProgress => {
          if (oldProgress === 30) {
            setLogs(prev => [...prev, { message: 'Validating data format...', type: 'info' }]);
            setStatus('validating');
          }
          
          if (oldProgress === 40) {
            setLogs(prev => [...prev, { message: 'Found 3 duplicate student IDs', type: 'warning' }]);
          }
          
          if (oldProgress === 70) {
            setLogs(prev => [...prev, { message: 'Processing grade assignments...', type: 'info' }]);
          }
          
          if (oldProgress === 85) {
            setLogs(prev => [...prev, { message: 'Finalizing import...', type: 'info' }]);
          }
          
          if (oldProgress === 95) {
            setLogs(prev => [...prev, { message: 'Import completed successfully!', type: 'success' }]);
            setStatus('complete');
            clearInterval(interval);
            setTimeout(() => onNext(), 1500);
          }
          
          return Math.min(oldProgress + 5, 95);
        });
      }, 500);

      return () => clearInterval(interval);
    };

    startImport();
  }, [onNext]);

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
      case 'validating':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Processing data...';
      case 'validating':
        return 'Validating records...';
      case 'complete':
        return 'Import complete';
      case 'error':
        return 'Import failed';
      default:
        return 'Starting import...';
    }
  };

  const getLogIcon = (type: 'info' | 'warning' | 'error' | 'success') => {
    switch (type) {
      case 'info':
        return <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Importing Data</CardTitle>
            <CardDescription>
              Processing and validating your data
            </CardDescription>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{getStatusText()}</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Import Log</h3>
          <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-muted/30 space-y-2">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                {getLogIcon(log.type)}
                <span 
                  className={
                    log.type === 'error' ? 'text-red-600 dark:text-red-400' :
                    log.type === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                    log.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    'text-muted-foreground'
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
            {status !== 'complete' && (
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full animate-pulse bg-blue-500" />
                <span className="text-muted-foreground">Waiting for next operation...</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-right">
          <Button disabled={status !== 'complete'} onClick={onNext}>
            Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
