import client from "@/api/client";

export async function getProfile({ signal }: { signal: AbortSignal }) {
  const { data } = await client.GET("/auth/profile", { signal });
  console.log("User", data);
  return data;
}
