
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { ErrorLoggingService, ProfileType } from '@/services/ErrorLoggingService';
import { useAuth } from '@/contexts/AuthContext';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  component?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Wrapper function to get user info for error logging
const withErrorLogging = (Component: typeof GlobalErrorBoundary) => {
  return (props: ErrorBoundaryProps) => {
    const { user } = useAuth();
    return <Component {...props} user={user} />;
  };
};

class GlobalErrorBoundary extends Component<ErrorBoundaryProps & { user?: any }, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps & { user?: any }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to our error logging service
    const componentName = this.props.component || 'Unknown Component';
    const profileType = this.props.user?.role as ProfileType || 'unauthenticated';
    
    ErrorLoggingService.logError({
      action: `component_error_${componentName}`,
      error_message: error.message,
      profile_type: profileType
    });
    
    console.error('Component error caught:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If custom fallback is provided, render it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error UI
      return (
        <Card className="border-destructive/50 shadow-sm">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We've logged the issue and we're working on it.
            </p>
            <p className="text-xs text-muted-foreground italic">
              {this.state.error?.message || "An unknown error occurred"}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center border-t bg-muted/50 px-6 py-4">
            <Button 
              onClick={() => this.setState({ hasError: false, error: null })}
              variant="default"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default withErrorLogging(GlobalErrorBoundary);
