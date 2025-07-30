import { useConversationsContext } from "@/hooks/useConversationsContext";
import { useLogout } from "@/hooks/useLogout";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { CirclePlus, LogOut, RotateCcw, TriangleAlert, X } from "lucide-react";
import { LoadingSidebar } from "@/components/ui/loading/LoadingSidebar";
import { SidebarListConversation } from "@/components/ui/sidebar/SidebarListConversation";
import { Link } from "react-router";

export const MobileSidebar = () => {
  const { conversations, loading, refetch, error } = useConversationsContext();
  const { isDrawerOpen, closeSidebar } = useSidebarContext();
  const { logout } = useLogout();
  return (
    <>
      {isDrawerOpen && (
        <div
          className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300`}
          onClick={closeSidebar}
        />
      )}

      <div
        className={`
fixed top-0 left-0 h-full z-50 bg-white dark:bg-dark-main-bg border-r border-light-border dark:border-dark-border
transform transition-transform duration-500 ease-in-out w-64 p-4 flex flex-col space-y-4
${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
`}
      >
        <div className="flex justify-between items-center">
          <span>logo</span>
          <button
            type="button"
            className="hover:text-dark-accent hover:cursor-pointer hover:scale-110 transition-all"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col space-y-4 mt-2 grow">
          <div>
            <Link
              to="/chat"
              className="flex gap-2 p-1.5 items-center rounded-lg hover:bg-dark-accent hover:text-dark-primary-text transition-colors"
              onClick={closeSidebar}
            >
              <CirclePlus size={20} />
              <span>New chat</span>
            </Link>
          </div>
          <div className="text-xs">Chats</div>
          {error && !loading && (
            <div className="flex gap-2">
              <span className="text-xs text-red-500 flex items-center gap-1">
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
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
};
