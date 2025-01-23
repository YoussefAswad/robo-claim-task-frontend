import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./requests";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 60,
  });
};
