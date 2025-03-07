import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Mic, Speaker, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  selectCurrentQuestion,
  selectAnswers,
  selectTimeRemaining,
  selectShowCongratulations,
  selectShowResults,
  selectProcessingResults,
  selectQuestions,
  saveAnswer,
  nextQuestion,
  previousQuestion,
  completeInterview,
  updateTimeRemaining,
  loadFromCookies,
} from "@/features/slices/interviewSlice";
import { useStartInterview } from "@/hooks/useInterviewCategories";
import speechUtils from "@/utils/speechUtils";
import CongratulationsScreen from "./Congratulation";
import ProcessingModal from "./ProcessingModal";
import InterviewResults from "./InterviewResults";

const InterviewProcess = () => {
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector(selectCurrentQuestion);
  const answers = useSelector(selectAnswers);
  const timeRemaining = useSelector(selectTimeRemaining);
  const showCongratulations = useSelector(selectShowCongratulations);
  const showResults = useSelector(selectShowResults);
  const processingResults = useSelector(selectProcessingResults);
  const questions = useSelector(selectQuestions);

  const { mutate: startInterview, isLoading: isStartingInterview } =
    useStartInterview();

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const speechInstance = useRef(null);
  const recognitionInstance = useRef(null);
  const audioLevelsRef = useRef([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    dispatch(loadFromCookies());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(questions).length === 0 && !isInitialized) {
      startInterview();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (Object.keys(questions).length > 0) {
      const questionNumber = currentQuestionIndex + 1;
      const savedAnswer = answers[questionNumber] || "";
      setTranscript(savedAnswer);
    }
  }, [currentQuestionIndex, answers, questions]);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch(updateTimeRemaining(timeRemaining - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeRemaining, dispatch]);

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

  const handleVolumeChange = (volume) => {
    setAudioLevel(volume);
    const newLevels = [...audioLevelsRef.current];
    newLevels.shift();
    newLevels.push(volume);
    audioLevelsRef.current = newLevels;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getCurrentQuestionText = () => {
    if (Object.keys(questions).length > 0) {
      return questions[currentQuestionIndex + 1];
    }
    return "Loading question...";
  };

  const progress =
    Object.keys(questions).length > 0
      ? ((currentQuestionIndex + 1) / Object.keys(questions).length) * 100
      : 0;

  const handleNext = () => {
    const questionNumber = currentQuestionIndex + 1;

    if (transcript) {
      dispatch(
        saveAnswer({
          questionId: questionNumber,
          answer: transcript,
        })
      );
    }

    if (currentQuestionIndex < Object.keys(questions).length - 1) {
      dispatch(nextQuestion());
    } else {
      dispatch(completeInterview());
    }
  };

  const handlePrevious = () => {
    const questionNumber = currentQuestionIndex + 1;

    if (transcript) {
      dispatch(
        saveAnswer({
          questionId: questionNumber,
          answer: transcript,
        })
      );
    }

    dispatch(previousQuestion());
  };

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionInstance.current) {
        recognitionInstance.current.stop();
        recognitionInstance.current = null;
      }
      setIsRecording(false);
      setAudioLevel(0);
      audioLevelsRef.current = [0, 0, 0, 0, 0, 0];
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
          setAudioLevel(0);
          audioLevelsRef.current = [0, 0, 0, 0, 0, 0];
        },
        handleVolumeChange
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
        setAudioLevel(0);
        audioLevelsRef.current = [0, 0, 0, 0, 0, 0];
      }

      const questionText = getCurrentQuestionText();

      speechInstance.current = speechUtils.speak(questionText, () => {
        setIsPlaying(false);
        speechInstance.current = null;
      });
      setIsPlaying(true);
    }
  };

  if (showCongratulations) {
    return <CongratulationsScreen />;
  }

  if (showResults) {
    return <InterviewResults />;
  }

  if (isStartingInterview || Object.keys(questions).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Preparing Your Interview...
          </h2>
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ProcessingModal isOpen={processingResults} />

      <Card className="w-full max-w-3xl border-none bg-transparent shadow-none">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Interview Process
            </h1>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Question {currentQuestionIndex + 1} of{" "}
                {Object.keys(questions).length}
              </span>
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 flex items-center justify-center mb-4 relative">
                <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
                  {isPlaying ? (
                    <Volume2 size={36} className="text-cyan-700" />
                  ) : (
                    <Speaker size={36} className="text-cyan-700" />
                  )}
                </div>
                {isPlaying && (
                  <div className="absolute inset-0">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="absolute w-[90%] h-[90%] rounded-full border-4 border-blue-400/30 animate-ping"></div>
                      <div
                        className="absolute w-[70%] h-[70%] rounded-full border-4 border-blue-500/40 animate-ping"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="absolute w-[50%] h-[50%] rounded-full border-4 border-blue-600/50 animate-ping"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                )}
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
                  {getCurrentQuestionText()}
                </p>
              </Card>

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
                  disabled={currentQuestionIndex === 0}
                  className="bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentQuestionIndex === Object.keys(questions).length - 1
                    ? "Submit"
                    : "Next"}
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
              } relative`}
              onClick={toggleRecording}
            >
              {isRecording ? <Mic size={20} /> : <MicOff size={20} />}
              <span>{isRecording ? "Recording..." : "Tap to Answer"}</span>

              {isRecording && (
                <div className="absolute -inset-1 overflow-hidden rounded-full">
                  <div className="flex justify-center items-center gap-1 absolute bottom-0 left-0 right-0">
                    {[...audioLevelsRef.current].map((level, i) => (
                      <div
                        key={i}
                        className="w-1 bg-white/80 rounded-t-full"
                        style={{
                          height: `${Math.min(Math.max(level / 5, 4), 20)}px`,
                          transition: "height 150ms ease",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewProcess;
