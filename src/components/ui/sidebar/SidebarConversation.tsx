import type { Conversation } from "@/api/mockApi";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { NavLink } from "react-router";

interface IProps {
  conversation: Conversation;
}

export const SidebarConversation = ({ conversation }: IProps) => {
  const { isMobile, toggleSidebar } = useSidebarContext();
  const handleClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  return (
    <NavLink to={`/chat/${conversation.id}`} onClick={handleClick}>
      {({ isActive }) => (
        <li
          className={`overflow-hidden rounded-lg hover:bg-dark-accent hover:text-dark-primary-text hover:cursor-pointer transition-colors p-1.5 ${isActive ? "bg-dark-accent text-dark-primary-text" : ""}`}
        >
          <p className="truncate text-sm">{conversation.title}</p>
        </li>
      )}
    </NavLink>
  );
};
