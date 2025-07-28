import { Link } from "react-router";
import { CirclePlus, RotateCcw, TriangleAlert } from "lucide-react";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { LoadingSidebar } from "@/components/ui/loading/LoadingSidebar";
import { SidebarListConversation } from "@/components/ui/sidebar/SidebarListConversation";

export const Sidebar = () => {
  const { conversations, loading, refetch, error } = useConversationsContext();

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
        {error && !loading && (
          <div className="flex gap-2">
            <span className="text-xs text-red-500">
              Failed to fetch conversations
              <TriangleAlert size={12} />
            </span>
            <button
              type="button"
              className="focus:outline-none hover:cursor-pointer hover:-rotate-360 hover:scale-110 transition-transform duration-500"
              onClick={refetch}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        )}
        {loading ? (
          <LoadingSidebar />
        ) : (
          <SidebarListConversation conversations={conversations} />
        )}
      </div>
    </div>
  );
};
