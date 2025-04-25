
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface RepairToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isRepairing: boolean;
  status: 'passed' | 'warning' | 'failed' | 'unknown';
}

export const RepairTool: React.FC<RepairToolProps> = ({
  title,
  description,
  icon,
  onClick,
  isRepairing,
  status
}) => {
  const getStatusIndicator = () => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'passed':
        return 'bg-green-50 border-green-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'failed':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <Card className={`overflow-hidden ${getStatusClass()}`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-background mr-3">
              {icon}
            </div>
            <div>
              <h3 className="text-base font-medium">{title}</h3>
            </div>
          </div>
          <div>
            {getStatusIndicator()}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-3">
        <Button 
          onClick={onClick}
          disabled={isRepairing || status === 'passed'}
          className="w-full"
          variant={status === 'failed' ? "destructive" : "default"}
        >
          {isRepairing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Repairing...
            </>
          ) : status === 'passed' ? (
            'No Repair Needed'
          ) : (
            'Repair Now'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
