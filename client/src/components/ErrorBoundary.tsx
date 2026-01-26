import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: Readonly<ErrorInfo>) {
    console.error(
      '%c[ERROR] ErrorBoundary caught an error:',
      'color: red; font-weight: bold;',
      error,
      info.componentStack,
      info,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md rounded-lg border border-red-300 bg-red-50 p-6">
            <h2 className="mb-2 text-lg font-semibold text-red-800">Something went wrong</h2>

            <p className="mb-4 text-sm text-red-700">
              An unexpected error occurred. Please try reloading the page.
            </p>

            <button
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              onClick={() => window.location.reload()}
              type="button">
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
