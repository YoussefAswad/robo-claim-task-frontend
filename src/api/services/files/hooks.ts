import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFile, getFiles, getSummary, uploadFile } from "./requests";
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["files"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["summary"],
      });
    },
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["files"],
      });

      await queryClient.invalidateQueries({
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
