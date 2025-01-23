import { useEffect, useState } from "react";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const isTokenValid = () => {
    return accessToken !== null;
  };

  return { accessToken, isTokenValid };
}
