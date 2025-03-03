import api from "../api/axios";

const interviewService = {
  getInterviewCategories: async () => {
    const response = await api.get("/interviews/categories");
    return response.data.data; // Return data array directly
  },

  startInterview: async (jobData) => {
    const response = await api.post("/interviews/start", jobData);
    return response.data;
  },

  submitInterviewResults: async (resultData) => {
    const response = await api.post("/interviews/result", resultData);
    return response.data;
  },
};

export default interviewService;
