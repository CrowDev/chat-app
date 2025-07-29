import { Outlet } from "react-router";
import { Sidebar } from "../sidebar/Sidebar";
import { Theme } from "@/components/common/Theme/Theme";
import { useSidebarContext } from "@/hooks/useSidebarContext";

export const Dashboard = () => {
  const { isMinimized, isMobile } = useSidebarContext();
  return (
    <div
      className={`relative min-h-dvh bg-light-main-bg dark:bg-dark-main-bg text-light-primary-text dark:text-dark-primary-text md:grid md:grid-cols-[${isMinimized && !isMobile ? "64px" : "200px"}_1fr]`}
    >
      <Theme />
      <Sidebar />
      <div className="p-6 mx-auto max-w-3xl w-full">
        <Outlet />
      </div>
    </div>
  );
};
