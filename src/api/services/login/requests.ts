import client from "@/api/client";
import { LoginData } from "./types";
import { setAccessToken, setRefreshToken } from "@/api/tokens";

export async function login(data: LoginData) {
  console.log("data", data);
  const { response, data: responseData } = await client.POST("/auth/login", {
    body: data,
  });

  if (responseData) {
    const { accessToken, refreshToken } = responseData;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
  }

  return response;
}
