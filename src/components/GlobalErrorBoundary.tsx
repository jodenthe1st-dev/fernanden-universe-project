import React from "react";

interface State {
  hasError: boolean;
  message?: string;
}

export class GlobalErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[GlobalErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-xl text-center space-y-3">
            <h1 className="text-2xl font-bold">Une erreur empêche l'affichage du site</h1>
            <p className="text-muted-foreground">
              Ouvre la console navigateur (F12) et envoie-moi le message affiché.
            </p>
            {this.state.message && (
              <pre className="text-left text-xs bg-muted p-3 rounded-md overflow-auto">{this.state.message}</pre>
            )}
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

