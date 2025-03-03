import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  currentQuestion: 0,
  answers: {},
  isInterviewComplete: false,
  showCongratulations: false,
  showResults: false,
  processingResults: false,
  results: null,
  timeRemaining: 15 * 60,
  sessionId: null,
  questionId: null,
  questions: {},
  selectedJob: null,
  selectedTopics: [],
};

export const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    saveAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers = {
        ...state.answers,
        [questionId]: answer,
      };
      // Save to cookies
      Cookies.set("interview_answers", JSON.stringify(state.answers), {
        expires: 1,
      });
    },
    nextQuestion: (state) => {
      if (state.currentQuestion < Object.keys(state.questions).length - 1) {
        state.currentQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
    setInterviewSession: (state, action) => {
      const { session_id, question_id, questions } = action.payload;
      state.sessionId = session_id;
      state.questionId = question_id;
      state.questions = questions;
      // Save to cookies for persistence
      Cookies.set(
        "interview_session",
        JSON.stringify({
          sessionId: session_id,
          questionId: question_id,
          questions: questions,
        }),
        { expires: 1 }
      );
    },
    setSelectedJobAndTopics: (state, action) => {
      const { job, topics } = action.payload;
      state.selectedJob = job;
      state.selectedTopics = topics;
      // Save to cookies
      Cookies.set(
        "selected_job_topics",
        JSON.stringify({
          job,
          topics,
        }),
        { expires: 1 }
      );
    },
    loadFromCookies: (state) => {
      const interviewSession = Cookies.get("interview_session");
      const interviewAnswers = Cookies.get("interview_answers");
      const selectedJobTopics = Cookies.get("selected_job_topics");

      if (interviewSession) {
        const { sessionId, questionId, questions } =
          JSON.parse(interviewSession);
        state.sessionId = sessionId;
        state.questionId = questionId;
        state.questions = questions;
      }

      if (interviewAnswers) {
        state.answers = JSON.parse(interviewAnswers);
      }

      if (selectedJobTopics) {
        const { job, topics } = JSON.parse(selectedJobTopics);
        state.selectedJob = job;
        state.selectedTopics = topics;
      }
    },
    completeInterview: (state) => {
      state.isInterviewComplete = true;
      state.showCongratulations = true;
    },
    startProcessingResults: (state) => {
      state.processingResults = true;
      state.showCongratulations = false;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    finishProcessingResults: (state) => {
      state.processingResults = false;
      state.showResults = true;
    },
    resetInterview: (state) => {
      Cookies.remove("interview_session");
      Cookies.remove("interview_answers");
      Cookies.remove("selected_job_topics");
      return initialState;
    },
    updateTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
  },
});

export const {
  setCurrentQuestion,
  saveAnswer,
  nextQuestion,
  previousQuestion,
  setInterviewSession,
  setSelectedJobAndTopics,
  loadFromCookies,
  completeInterview,
  startProcessingResults,
  setResults,
  finishProcessingResults,
  resetInterview,
  updateTimeRemaining,
} = interviewSlice.actions;

export const selectCurrentQuestion = (state) => state.interview.currentQuestion;
export const selectAnswers = (state) => state.interview.answers;
export const selectIsInterviewComplete = (state) =>
  state.interview.isInterviewComplete;
export const selectShowCongratulations = (state) =>
  state.interview.showCongratulations;
export const selectShowResults = (state) => state.interview.showResults;
export const selectProcessingResults = (state) =>
  state.interview.processingResults;
export const selectResults = (state) => state.interview.results;
export const selectTimeRemaining = (state) => state.interview.timeRemaining;
export const selectQuestions = (state) => state.interview.questions;
export const selectSessionId = (state) => state.interview.sessionId;
export const selectQuestionId = (state) => state.interview.questionId;
export const selectSelectedJob = (state) => state.interview.selectedJob;
export const selectSelectedTopics = (state) => state.interview.selectedTopics;

export default interviewSlice.reducer;
