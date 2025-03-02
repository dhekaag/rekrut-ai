import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Smile, Frown, Meh, Home } from "lucide-react";
import {
  selectResults,
  resetInterview,
} from "@/features/slices/interviewSlice";

const InterviewResults = () => {
  const results = useSelector(selectResults);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuit = () => {
    dispatch(resetInterview());
    navigate("/");
  };

  if (!results) {
    return <div>Loading results...</div>;
  }

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
              <p className="text-gray-700 leading-relaxed">
                {results.evaluationSummary}
              </p>
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
                    Overall Score
                  </span>
                  <span className="font-bold text-2xl">
                    {results.overallScore}/100
                  </span>
                </div>
                <Progress
                  className="h-3 bg-gray-100"
                  value={results.overallScore}
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
                  value={results.generalImpression}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="shadow-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Top Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                {results.topSkills.map((skill, index) => (
                  <li key={index}>
                    <span className="font-medium">{skill.skill}</span> -{" "}
                    {skill.description}
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
                {results.skillsToEnhance.map((skill, index) => (
                  <li key={index}>
                    <span className="font-medium">{skill.skill}</span> -{" "}
                    {skill.description}
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
