import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TriangleAlert, XCircle } from "lucide-react";

interface ErrorAlertProps {
  error?: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onRetry,
  onDismiss,
  className = "",
}) => {
  if (!error) return null; // Don’t render if there’s no error

  return (
    <Alert variant="destructive" className={`flex items-start ${className}`}>
      <TriangleAlert className="h-5 w-5 mt-1 text-red-600" />
      <div className="ml-3 flex-1">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <div className="mt-3 flex space-x-2">
          {onRetry && (
            <Button size="sm" variant="outline" onClick={onRetry}>
              Retry
            </Button>
          )}
          {onDismiss && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onDismiss}
              className="text-red-600 hover:bg-red-100"
            >
              <XCircle className="h-4 w-4 mr-1" /> Dismiss
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};
