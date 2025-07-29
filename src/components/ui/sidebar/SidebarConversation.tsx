import { useSidebarContext } from "@/hooks/useSidebarContext";
import type { Conversation } from "@/types";
import { Link } from "react-router";

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
    <li className="overflow-hidden rounded-lg hover:bg-dark-accent hover:text-dark-primary-text hover:cursor-pointer transition-colors p-1.5">
      <Link to={`/chat/${conversation.id}`} onClick={handleClick}>
        <p className="truncate text-sm">{conversation.title}</p>
      </Link>
    </li>
  );
};
