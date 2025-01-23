import client from "@/api/client";
import { QueryFilesRequest } from "./types";
import { getAccessToken } from "@/api/tokens";
import { FileWithPath } from "react-dropzone";

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
  signal?: AbortSignal;
  files: readonly FileWithPath[];
}) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    signal,
    body: formData,
  });

  if (!response.ok) {
    const responseText = await response.json();
    throw new Error(responseText.message ?? "Failed to upload file");
  }

  return response.json();
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
