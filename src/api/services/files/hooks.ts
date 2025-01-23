import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteFile, getFiles, getSummary, uploadFile } from "./requests";
import { QueryFilesRequest } from "./types";
import { useAllProgress } from "../progress/hooks";

export const useFiles = (query: QueryFilesRequest) => {
  const progress = useAllProgress();
  return useQuery({
    queryKey: ["files", query, progress.data.length],
    queryFn: async ({ signal }) => await getFiles({ signal, query }),
    retry: 0,
    placeholderData: keepPreviousData,
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
