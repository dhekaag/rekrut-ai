import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { finishProcessingResults } from "@/features/slices/interviewSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

const ProcessingModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              dispatch(finishProcessingResults());
            }, 500);
            return 100;
          }
          return prevProgress + 100 / 15; // Increase to complete in 15 seconds
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isOpen, dispatch]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Analyzing Your Interview
          </DialogTitle>
          <DialogDescription className="text-center">
            Please wait while our AI analyzes your responses and prepares your
            feedback.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative mb-6">
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-700">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <Progress className="w-full h-2" value={progress} />

          <div className="mt-4 text-sm text-gray-500">
            {progress < 33
              ? "Analyzing response content..."
              : progress < 66
              ? "Evaluating communication style..."
              : "Generating personalized feedback..."}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingModal;
