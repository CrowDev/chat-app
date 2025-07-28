import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TOKEN_KEY = "token";

export const useToken = (conversationId: number) => {
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/login");
    } else {
      setToken(token);
    }
  }, [conversationId]);

  return {
    token,
  };
};
