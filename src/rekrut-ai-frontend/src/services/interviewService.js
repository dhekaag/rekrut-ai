import api from "../api/axios";

export const fetchInterviewCategories = async () => {
  const response = await api.get("/interviews/categories");
  return response.data;
};
