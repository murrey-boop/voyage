// components/ErrorBoundary.tsx
import React from "react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500 text-center">Something went wrong loading this section.</div>;
    }

    return this.props.children;
  }
}
