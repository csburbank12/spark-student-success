
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export const ConfidentialityNotice: React.FC = () => {
  return (
    <Card className="bg-muted/50 border-dashed">
      <CardContent className="p-4 flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Lock className="h-4 w-4 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground">
          Your login information is confidential and protected. Never share your password with others.
        </p>
      </CardContent>
    </Card>
  );
};
