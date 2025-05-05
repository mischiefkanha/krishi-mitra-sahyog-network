
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive" className="my-4 animate-fade-in border-red-500/20">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Something went wrong</AlertTitle>
          <AlertDescription className="text-base">
            {this.state.error?.message || 'An unexpected error occurred'}
          </AlertDescription>
          <Button 
            variant="outline" 
            className="mt-4 border-red-500/20 hover:bg-red-500/10"
            onClick={this.handleReset}
          >
            Try again
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}
