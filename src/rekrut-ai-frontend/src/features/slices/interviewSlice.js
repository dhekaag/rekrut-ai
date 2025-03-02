import { createSlice } from "@reduxjs/toolkit";
import {
  INTERVIEW_QUESTIONS,
  calculateScores,
} from "@/constants/dummyInterview";

const initialState = {
  currentQuestion: 0,
  answers: {},
  isInterviewComplete: false,
  showCongratulations: false,
  showResults: false,
  processingResults: false,
  results: null,
  timeRemaining: 15 * 60,
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
    },
    nextQuestion: (state) => {
      if (state.currentQuestion < INTERVIEW_QUESTIONS.length - 1) {
        state.currentQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
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
    finishProcessingResults: (state) => {
      state.processingResults = false;
      state.showResults = true;
      state.results = calculateScores(state.answers);
    },
    resetInterview: (state) => {
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
  completeInterview,
  startProcessingResults,
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

export default interviewSlice.reducer;
