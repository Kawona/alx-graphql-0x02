
import React, { ReactNode } from "react";

interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // React lifecycle method — updates state when an error occurs
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // Captures and logs error details
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Error caught by ErrorBoundary:", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 px-4">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. You can try reloading this section.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
