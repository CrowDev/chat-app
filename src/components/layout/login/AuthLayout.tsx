import { Theme } from "@/components/common/Theme/Theme";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="relative p-4 min-h-dvh bg-light-main-bg dark:bg-dark-main-bg text-light-primary-text dark:text-dark-primary-text  flex items-center justify-center">
      <Theme />
      <Outlet />
    </div>
  );
};
