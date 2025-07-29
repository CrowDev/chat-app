import { Link } from "react-router";
import { CirclePlus, LogOut, RotateCcw, TriangleAlert } from "lucide-react";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { LoadingSidebar } from "@/components/ui/loading/LoadingSidebar";
import { SidebarListConversation } from "@/components/ui/sidebar/SidebarListConversation";
import { useLogout } from "@/hooks/useLogout";

export const Sidebar = () => {
  const { conversations, loading, refetch, error } = useConversationsContext();
  const { logout } = useLogout();

  return (
    <div className="min-h-dvh border-r-light-border dark:border-r-dark-border border-r p-4 flex flex-col space-y-4">
      <div>logo</div>
      <div className="flex flex-col space-y-4 mt-2 grow">
        <div>
          <Link
            to="/chat"
            className="flex gap-2 p-1.5 items-center rounded-lg hover:bg-dark-accent hover:text-dark-primary-text transition-colors"
          >
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
      <button
        type="button"
        className="text-light-primary-text font-medium hover:cursor-pointer hover:text-dark-accent transition-colors dark:text-dark-primary-text flex gap-3 items-center"
        onClick={logout}
      >
        <span>Log out</span> <LogOut size={16} />
      </button>
    </div>
  );
};
