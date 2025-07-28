import { Link } from "react-router";
import { CirclePlus } from "lucide-react";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { LoadingSidebar } from "@/components/ui/loading/LoadingSidebar";
import { SidebarListConversation } from "@/components/ui/sidebar/SidebarListConversation";

export const Sidebar = () => {
  const { conversations, loading } = useConversationsContext();

  return (
    <div className="min-h-dvh border-r-slate-600 border-r p-4 flex flex-col space-y-4">
      <div>logo</div>
      <div className="flex flex-col space-y-4 mt-2">
        <div>
          <Link to="/chat" className="flex gap-2 items-center">
            <CirclePlus size={20} /> <span>New chat</span>
          </Link>
        </div>
        <div className="text-xs">Chats</div>
        {loading ? (
          <LoadingSidebar />
        ) : (
          <SidebarListConversation conversations={conversations} />
        )}
      </div>
    </div>
  );
};
