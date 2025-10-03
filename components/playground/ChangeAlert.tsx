import { RefreshCw, RotateCcw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ChangeAlertProps {
  hasChanges: boolean;
  onApply: () => void;
  onReset: () => void;
}

export function ChangeAlert({ hasChanges, onApply, onReset }: ChangeAlertProps) {
  if (!hasChanges) return null;

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span>You have unsaved changes</span>
        <div className="flex gap-2">
          <Button
            onClick={onApply}
            size="sm"
            className="flex-1 sm:flex-none"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Apply Changes
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
