import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Home, AlertTriangle } from "lucide-react";
import {
  startProcessingResults,
  resetInterview,
} from "@/features/slices/interviewSlice";
import { useSubmitResults } from "@/hooks/useInterviewCategories";

const CongratulationsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: submitResults, isLoading, isError } = useSubmitResults();
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleViewResults = () => {
    setHasAttemptedSubmit(true);
    dispatch(startProcessingResults());
    submitResults();
  };

  const handleQuit = () => {
    dispatch(resetInterview());
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            className="bg-gray-50 hover:bg-gray-100 border-gray-200 flex items-center gap-2"
            onClick={handleQuit}
          >
            <Home size={16} />
            <span>Quit</span>
          </Button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Congratulations</h1>
        </div>

        <Card className="bg-white border border-blue-100 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                You've just completed your interview with Rekrut AI 👋
              </h2>
            </div>

            <p className="text-gray-700 text-sm mb-8">
              Great job on taking this important step in improving your
              interview skills. Every practice session brings you closer to
              mastering your confidence and performance in real job interviews.
            </p>

            {isError && hasAttemptedSubmit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
                <AlertTriangle size={18} />
                <span className="text-sm">
                  There was an error processing your results. Please try again.
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700"
                onClick={handleQuit}
              >
                Return Home
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                onClick={handleViewResults}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>View Interview Results</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CongratulationsScreen;
