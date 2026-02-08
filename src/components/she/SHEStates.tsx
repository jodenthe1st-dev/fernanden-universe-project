import { Button } from "@/components/ui/button";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Chargement..." }: LoadingStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-she-saffron border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

interface ErrorStateProps {
  error?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const defaultError = error || 'Configuration non trouvée';
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{defaultError}</p>
        <Button onClick={onRetry || (() => window.location.reload())}>
          Réessayer
        </Button>
      </div>
    </div>
  );
};
