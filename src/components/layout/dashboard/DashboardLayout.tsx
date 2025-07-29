import { Outlet } from "react-router";
import { Sidebar } from "../sidebar/Sidebar";
import { Theme } from "@/components/common/Theme/Theme";
import { useSidebarContext } from "@/hooks/useSidebarContext";

export const Dashboard = () => {
  const { isMinimized, isMobile } = useSidebarContext();
  let gridCols = "";
  if (!isMobile) {
    gridCols = isMinimized
      ? "grid md:grid-cols-[64px_1fr]"
      : "grid md:grid-cols-[200px_1fr]";
  }
  return (
    <div
      className={`relative min-h-dvh bg-light-main-bg dark:bg-dark-main-bg text-light-primary-text dark:text-dark-primary-text ${gridCols}`}
    >
      <Theme />
      <Sidebar />
      <div className="p-6 mx-auto max-w-3xl w-full">
        <Outlet />
      </div>
    </div>
  );
};
