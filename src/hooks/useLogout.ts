import { useCallback } from "react";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    const theme = localStorage.getItem("theme");
    localStorage.clear();
    theme
      ? localStorage.setItem("theme", theme)
      : localStorage.setItem("theme", "dark");
    navigate("/login");
  }, [navigate]);
  return {
    logout,
  };
};
