import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFile, getFiles, getSummary } from "./requests";
import { QueryFilesRequest } from "./types";

export const useFiles = (query: QueryFilesRequest) => {
  return useQuery({
    queryKey: ["files", query],
    queryFn: async ({ signal }) => await getFiles({ signal, query }),
    retry: 0,
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFile,
    onMutate: async () => {
      await queryClient.refetchQueries({
        queryKey: ["files"],
      });

      await queryClient.refetchQueries({
        queryKey: ["summary"],
      });
    },
  });
};

export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
};
