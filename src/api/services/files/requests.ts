import client from "@/api/client";
import { QueryFilesRequest } from "./types";

export async function getFiles({
  signal,
  query,
}: {
  signal: AbortSignal;
  query: QueryFilesRequest;
}) {
  const { data } = await client.GET("/files", {
    signal,
    params: {
      query,
    },
  });
  return data;
}

export async function uploadFile({
  signal,
  files,
}: {
  signal: AbortSignal;
  files: File[];
}) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  const { data } = await client.POST("/upload", {
    signal,
    // @ts-expect-error as FormData is not a valid body type
    body: formData,
    bodySerializer(body) {
      const fd = new FormData();
      for (const name in body) {
        // @ts-expect-error as FormData is not a valid body type
        fd.append(name, body[name]);
      }
      return fd;
    },
  });
  return data;
}

export async function deleteFile({ fileId }: { fileId: string }) {
  const { data } = await client.DELETE(`/files/{id}`, {
    params: {
      path: { id: fileId },
    },
  });
  return data;
}

export async function getSummary() {
  const { data } = await client.GET("/files/summary");
  return data;
}
