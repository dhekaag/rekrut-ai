import api from "../api/axios";

export const fetchInterviewCategories = async () => {
  const response = await api.get("/interviews/categories");
  return response.data;
};

export const interviewService = {
  getInterviewCategories: async () => {
    const response = await api.get("/interviews/categories");
    return response.data;
  },
};

export default interviewService;
