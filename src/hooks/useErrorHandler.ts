
import { useCallback } from 'react';
import { toast } from 'sonner';

interface ErrorHandlerOptions {
  showToast?: boolean;
  fallbackMessage?: string;
  onError?: (error: Error) => void;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    showToast = true,
    fallbackMessage = "An unexpected error occurred",
    onError
  } = options;

  const handleError = useCallback((error: unknown) => {
    const errorMessage = error instanceof Error 
      ? error.message 
      : fallbackMessage;

    console.error('Error handled:', error);

    if (showToast) {
      toast.error(errorMessage);
    }

    if (onError && error instanceof Error) {
      onError(error);
    }
  }, [showToast, fallbackMessage, onError]);

  return handleError;
};
