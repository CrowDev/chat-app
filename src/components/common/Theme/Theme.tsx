import { SunMoon } from "lucide-react";
import { useEffect } from "react";

const STORE_KEY = "theme";

export const Theme = () => {
  const htmlElement = document.documentElement;

  useEffect(() => {
    const handleThemeStore = () => {
      const theme = localStorage.getItem(STORE_KEY);
      if (!theme) {
        localStorage.setItem(STORE_KEY, "dark");
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.add(theme);
      }
    };
    handleThemeStore();
  }, []);

  const handleChangeTheme = () => {
    if (htmlElement.classList.contains("dark")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    htmlElement.classList.toggle("dark");
  };

  return (
    <div className="z-50 absolute top-5 right-5 text-light-primary-text dark:text-dark-primary-text">
      <button
        type="button"
        className="p-1.5 rounded-full hover:cursor-pointer hover:scale-120 transition-transform"
        onClick={handleChangeTheme}
      >
        <SunMoon size={24} />
      </button>
    </div>
  );
};
