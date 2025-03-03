import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Smile, Frown, Meh, Home } from "lucide-react";
import {
  selectResults,
  resetInterview,
  selectSelectedJob,
  selectSelectedTopics,
  startProcessingResults,
} from "@/features/slices/interviewSlice";
import { useSubmitResults } from "@/hooks/useInterviewCategories";

const InterviewResults = () => {
  const results = useSelector(selectResults);
  const selectedJob = useSelector(selectSelectedJob);
  const selectedTopics = useSelector(selectSelectedTopics);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: submitResults } = useSubmitResults();

  const handleQuit = () => {
    dispatch(resetInterview());
    navigate("/");
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading results...</h2>
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Check if we received an error response
  if (results === "AI response is empty") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-red-600">
              Interview Analysis Failed
            </h2>
            <p className="mt-2 text-gray-600">
              We encountered an issue while analyzing your interview responses.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => {
                dispatch(startProcessingResults());
                submitResults();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Again
            </Button>

            <Button
              variant="outline"
              onClick={handleQuit}
              className="border-gray-300"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate impression percentage from overall_rating (assuming it's on a scale of 1-10)
  const impressionPercentage = (results.overall_rating / 10) * 100;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            Your Interview Results
          </h1>
          <Button
            onClick={handleQuit}
            className="bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-2"
          >
            <Home size={16} />
            <span>Quit</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Evaluation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-gray-600 font-medium">Job Role:</span>
                <span className="ml-2 text-blue-700">{selectedJob}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{results.summary}</p>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="shadow-sm border-blue-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Interview Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">
                    Technical Accuracy
                  </span>
                  <span className="font-bold text-2xl">
                    {results.technical_accuracy}/10
                  </span>
                </div>
                <Progress
                  className="h-3 bg-gray-100"
                  value={results.technical_accuracy * 10}
                />

                <div className="flex items-center justify-between mt-6 mb-2">
                  <span className="font-medium text-gray-700">
                    Overall Rating
                  </span>
                  <span className="font-bold text-2xl">
                    {results.overall_rating}/10
                  </span>
                </div>
                <Progress
                  className="h-3 bg-gray-100"
                  value={results.overall_rating * 10}
                />
              </CardContent>
            </Card>

            <Card className="shadow-sm border-blue-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  General Impression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <ThumbsDown className="text-yellow-400 h-6 w-6" />
                  <Frown className="text-yellow-500 h-6 w-6" />
                  <Meh className="text-blue-400 h-6 w-6" />
                  <Smile className="text-green-400 h-6 w-6" />
                  <ThumbsUp className="text-green-500 h-6 w-6" />
                </div>
                <Progress
                  className="h-3 bg-gray-100"
                  value={impressionPercentage}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="leading-relaxed">
                    {strength}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Skills to Enhance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                {results.skills_to_improve.map((skill, index) => (
                  <li key={index} className="leading-relaxed">
                    {skill}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleQuit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            Finish & Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;
