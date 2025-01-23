import { useMutation } from "@tanstack/react-query";
import { register } from "./requests";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
