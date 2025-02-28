import { useQuery } from "@tanstack/react-query";
import { fetchInterviewCategories } from "../services/interviewService";

export const useInterviewCategories = () => {
  return useQuery({
    queryKey: ["interviewCategories"],
    queryFn: fetchInterviewCategories,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
