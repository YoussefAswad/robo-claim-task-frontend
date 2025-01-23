import { useSSE } from "react-hooks-sse";

export const useAllProgress = () => {
  const progress = useSSE<{
    data: {
      progress: number;
      stage: string;
      fileId: string;
    }[];
  }>("progress", {
    data: [],
  });

  return progress;
};

export const useProgress = ({ fileId }: { fileId: string }) => {
  const allProgress = useAllProgress();
  return allProgress.data.find((p) => p.fileId === fileId);
};
