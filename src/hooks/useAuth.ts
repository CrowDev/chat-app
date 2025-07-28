import { useEffect, useState } from "react";

const TOKEN_KEY = "token";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  return {
    isAuthenticated,
    loading,
  };
};
