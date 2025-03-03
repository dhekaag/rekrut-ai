import { useQuery, useMutation } from "@tanstack/react-query";
import interviewService from "../services/interviewService";
import { useDispatch, useSelector } from "react-redux";
import {
  setInterviewSession,
  setResults,
  finishProcessingResults,
  selectSessionId,
  selectQuestionId,
  selectAnswers,
  selectSelectedJob,
  selectSelectedTopics,
} from "../features/slices/interviewSlice";

export const useCategories = () => {
  return useQuery({
    queryKey: ["interviewCategories"],
    queryFn: interviewService.getInterviewCategories,
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useStartInterview = () => {
  const dispatch = useDispatch();
  const selectedJob = useSelector(selectSelectedJob);
  const selectedTopics = useSelector(selectSelectedTopics);

  return useMutation({
    mutationFn: () => {
      const jobData = {
        job: selectedJob,
        topics: selectedTopics,
      };
      return interviewService.startInterview(jobData);
    },
    onSuccess: (data) => {
      dispatch(setInterviewSession(data.data));
    },
  });
};

export const useSubmitResults = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionId);
  const questionId = useSelector(selectQuestionId);
  const answers = useSelector(selectAnswers);

  return useMutation({
    mutationFn: () => {
      const resultData = {
        session_id: sessionId,
        question_id: questionId,
        answers,
      };
      return interviewService.submitInterviewResults(resultData);
    },
    onSuccess: (data) => {
      // Check if AI response failed
      if (data.message === "AI response is empty") {
        dispatch(setResults("AI response is empty"));
      } else {
        dispatch(setResults(data.data.results));
      }

      setTimeout(() => {
        dispatch(finishProcessingResults());
      }, 1000);
    },
    onError: (error) => {
      console.error("Error submitting results:", error);
      dispatch(setResults("AI response is empty"));
      setTimeout(() => {
        dispatch(finishProcessingResults());
      }, 1000);
    },
  });
};

export default useCategories;
