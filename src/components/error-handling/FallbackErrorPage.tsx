
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";

interface FallbackErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  isAdmin?: boolean;
}

/**
 * User-friendly fallback page shown when a critical error occurs
 * Shows different information based on whether the user is an admin
 */
const FallbackErrorPage: React.FC<FallbackErrorPageProps> = ({
  error,
  resetErrorBoundary,
  isAdmin = false
}) => {
  const handleReportError = () => {
    if (error) {
      ErrorLoggingService.logError({
        action: 'manual_error_report',
        error_message: error.message,
        profile_type: isAdmin ? 'admin' : 'unknown'
      });
    }
    
    alert('Error has been reported to our team. Thank you!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center pb-2">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <CardTitle className="text-xl">Something Went Wrong</CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We encountered an unexpected issue while loading this page.
            Our team has been notified and is working on a fix.
          </p>
          
          {isAdmin && error && (
            <div className="mt-6 text-left">
              <h3 className="font-medium mb-2">Error Details (Admin Only)</h3>
              <div className="bg-muted p-3 rounded-md overflow-auto max-h-32 text-xs font-mono">
                <p>{error.message}</p>
                <p className="text-muted-foreground mt-2">{error.stack}</p>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex gap-2 w-full">
            <Button className="flex-1" onClick={resetErrorBoundary}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button className="flex-1" variant="outline" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={handleReportError}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Report this Issue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FallbackErrorPage;
