import { Outlet } from "react-router";
import { Sidebar } from "../sidebar/Sidebar";

export const ChatPageLayout = () => {
  return (
    <div className="min-h-dvh bg-background text-light-font grid grid-cols-[200px_1fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
};
