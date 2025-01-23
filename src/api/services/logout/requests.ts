import client from "@/api/client";
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "@/api/tokens";

export async function logout() {
  const refreshToken = getRefreshToken();
  const { response, error } = await client.POST("/auth/logout", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (error) {
    throw new Error("Invalid credentials");
  }

  removeAccessToken();
  removeRefreshToken();

  return response;
}
