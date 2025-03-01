import { useQuery } from "@tanstack/react-query";
import interviewService from "../services/interviewService";

export const useCategories = () => {
  return useQuery({
    queryKey: ["interviewCategories"],
    queryFn: interviewService.getInterviewCategories,
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useCategories;
