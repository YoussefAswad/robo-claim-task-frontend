import { useMutation } from "@tanstack/react-query";
import { logout } from "./requests";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
