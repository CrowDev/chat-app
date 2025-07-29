import { Outlet } from "react-router";
import { Sidebar } from "../sidebar/Sidebar";
import { ConversationContextProvider } from "@/contexts/ConversationsContext";
import { Theme } from "@/components/common/Theme/Theme";

export const DashboardLayout = () => {
  return (
    <ConversationContextProvider>
      <div className="relative min-h-dvh bg-light-main-bg dark:bg-dark-main-bg text-light-primary-text dark:text-dark-primary-text grid grid-cols-[200px_1fr]">
        <Theme />
        <Sidebar />
        <div className="p-6 mx-auto max-w-3xl w-full">
          <Outlet />
        </div>
      </div>
    </ConversationContextProvider>
  );
};
