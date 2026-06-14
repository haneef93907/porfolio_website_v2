import React from "react";

interface AppErrorBoundaryState {
  error?: Error;
}

export default class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Portfolio render error", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="min-h-screen bg-background px-6 py-20 text-foreground">
          <div className="mx-auto max-w-2xl rounded border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Portfolio load issue
            </p>
            <h1 className="mt-3 font-grotesk text-3xl font-bold">
              The site hit a runtime error instead of rendering.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Please hard refresh the page. If this message remains, clear this
              site&apos;s browser storage or redeploy the latest build assets.
            </p>
            <pre className="mt-5 overflow-auto rounded bg-secondary p-4 text-xs text-muted-foreground">
              {this.state.error.message}
            </pre>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
