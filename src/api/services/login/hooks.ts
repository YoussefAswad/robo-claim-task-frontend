import { useMutation } from "@tanstack/react-query";
import { login } from "./requests";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
