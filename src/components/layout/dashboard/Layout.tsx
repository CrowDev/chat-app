import { ConversationContextProvider } from "@/contexts/ConversationsContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { Dashboard } from "./DashboardLayout";

export const DashboardLayout = () => {
  return (
    <ConversationContextProvider>
      <SidebarContextProvider>
        <Dashboard />
      </SidebarContextProvider>
    </ConversationContextProvider>
  );
};
