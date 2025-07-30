import { useConversationsContext } from "@/hooks/useConversationsContext";
import { useLogout } from "@/hooks/useLogout";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { LoadingSidebar } from "@/components/ui/loading/LoadingSidebar";
import {
  CirclePlus,
  LogOut,
  PanelLeftOpen,
  PanelRightOpen,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import { SidebarListConversation } from "@/components/ui/sidebar/SidebarListConversation";
import { Link } from "react-router";

export const DesktopSidebar = () => {
  const { conversations, loading, refetch, error } = useConversationsContext();
  const { isMinimized, toggleSidebar } = useSidebarContext();
  const { logout } = useLogout();
  return (
    <div
      className={`${isMinimized ? "max-w-16" : "max-w-[calc(100%-4rem)]"} w-full transition-all duration-300 ease min-h-dvh border-r-light-border dark:border-r-dark-border border-r p-4 flex flex-col space-y-4 truncate`}
    >
      <div
        className={`flex ${isMinimized ? "justify-center" : "justify-between"} items-center`}
      >
        {!isMinimized && <span>logo</span>}
        <button
          type="button"
          className={`hover:text-dark-accent ${isMinimized ? "hover:cursor-e-resize" : "hover:cursor-w-resize"} hover:scale-130 transition-all`}
          onClick={toggleSidebar}
        >
          {isMinimized ? (
            <PanelLeftOpen size={16} />
          ) : (
            <PanelRightOpen size={16} />
          )}
        </button>
      </div>
      {!isMinimized && (
        <div className="flex flex-col space-y-4 mt-2 grow transition-opacity duration-300 ease-in-out">
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
      )}
      {isMinimized && (
        <div className="flex flex-col items-center space-y-4 mt-2 grow">
          <Link
            to="/chat"
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-dark-accent hover:text-dark-primary-text transition-colors"
          >
            <CirclePlus size={20} />
          </Link>
        </div>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          className="text-light-primary-text font-medium hover:cursor-pointer hover:text-dark-accent transition-colors dark:text-dark-primary-text flex gap-3 items-center"
          onClick={logout}
          title={isMinimized ? "Log out" : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!isMinimized && <span>Log out</span>}
        </button>
      </div>
    </div>
  );
};
