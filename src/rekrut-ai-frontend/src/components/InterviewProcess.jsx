import React, { useState, useEffect, useRef } from "react";
import { Mic, Speaker, MicOff, Volume2, Volume1, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  INTERVIEW_QUESTIONS,
  TIMER_INITIAL_VALUE,
} from "@/constants/dummyInterview";
import speechUtils from "@/utils/speechUtils";

const InterviewProcess = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_INITIAL_VALUE);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState({});

  const speechInstance = useRef(null);
  const recognitionInstance = useRef(null);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeRemaining]);

  useEffect(() => {
    return () => {
      if (speechInstance.current) {
        speechInstance.current.stop();
      }
      if (recognitionInstance.current) {
        recognitionInstance.current.stop();
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = ((currentQuestion + 1) / INTERVIEW_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (currentQuestion < INTERVIEW_QUESTIONS.length - 1) {
      if (transcript) {
        setAnswers({
          ...answers,
          [INTERVIEW_QUESTIONS[currentQuestion].id]: transcript,
        });
      }

      setCurrentQuestion(currentQuestion + 1);
      setTranscript("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      if (transcript) {
        setAnswers({
          ...answers,
          [INTERVIEW_QUESTIONS[currentQuestion].id]: transcript,
        });
      }

      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer =
        answers[INTERVIEW_QUESTIONS[currentQuestion - 1].id] || "";
      setTranscript(prevAnswer);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionInstance.current) {
        recognitionInstance.current.stop();
        recognitionInstance.current = null;
      }
      setIsRecording(false);
    } else {
      if (speechInstance.current) {
        speechInstance.current.stop();
        speechInstance.current = null;
        setIsPlaying(false);
      }

      recognitionInstance.current = speechUtils.startSpeechRecognition(
        (newTranscript) => {
          setTranscript(newTranscript);
        },
        () => {
          setIsRecording(false);
          recognitionInstance.current = null;
        }
      );
      setIsRecording(true);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      if (speechInstance.current) {
        speechInstance.current.stop();
        speechInstance.current = null;
      }
      setIsPlaying(false);
    } else {
      if (recognitionInstance.current) {
        recognitionInstance.current.stop();
        recognitionInstance.current = null;
        setIsRecording(false);
      }

      speechInstance.current = speechUtils.speak(
        INTERVIEW_QUESTIONS[currentQuestion].text,
        () => {
          setIsPlaying(false);
          speechInstance.current = null;
        }
      );
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl border-none bg-transparent shadow-none">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Interview Process
            </h1>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Question {currentQuestion + 1} of {INTERVIEW_QUESTIONS.length}
              </span>
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
                  {isPlaying ? (
                    <Volume2 size={36} className="text-cyan-700" />
                  ) : (
                    <Speaker size={36} className="text-cyan-700" />
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                onClick={togglePlayback}
              >
                {isPlaying ? "Stop" : "Play Question"}
              </Button>
            </div>

            <div className="md:w-3/4">
              <Card className="h-40 mb-4 border-none bg-indigo-50/70 flex items-center justify-center p-4">
                <p className="text-lg text-gray-700">
                  {INTERVIEW_QUESTIONS[currentQuestion].text}
                </p>
              </Card>

              {/* Speech-to-text result area */}
              <Card className="mb-4 border-none bg-blue-50/70 p-4 min-h-[100px] max-h-[200px] overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Your Answer:
                </h3>
                <p className="text-gray-700">
                  {transcript || (
                    <span className="text-gray-400 italic">
                      {isRecording
                        ? "Listening to your answer..."
                        : "Click 'Tap to Answer' to start speaking"}
                    </span>
                  )}
                </p>
              </Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentQuestion === INTERVIEW_QUESTIONS.length - 1}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={toggleRecording}
            >
              {isRecording ? <Mic size={20} /> : <MicOff size={20} />}
              <span>{isRecording ? "Recording..." : "Tap to Answer"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewProcess;
