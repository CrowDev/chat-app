import { SunMoon } from "lucide-react";
export const Theme = () => {
  const handleChangeTheme = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
  };
  return (
    <div className="absolute top-5 right-5 text-light-primary-text dark:text-dark-primary-text">
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
