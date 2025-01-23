import client from "@/api/client";
import { setAccessToken, setRefreshToken } from "@/api/tokens";
import { RegisterRequest } from "./types";

export async function register(body: RegisterRequest) {
  const { data } = await client.POST("/auth/register", {
    body,
  });

  if (data) {
    const { accessToken, refreshToken } = data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }
}
