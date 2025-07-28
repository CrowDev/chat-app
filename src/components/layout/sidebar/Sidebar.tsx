import type { Conversation } from "@/types";
import { Link } from "react-router";
import { CirclePlus } from "lucide-react";
import { useConversationsContext } from "@/hooks/useConversationsContext";

export const Sidebar = () => {
  const { conversations } = useConversationsContext();

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
        <ul className="flex flex-col space-y-1">
          {conversations.map((conversation: Conversation) => {
            return (
              <li
                key={conversation.id}
                className="overflow-hidden rounded-lg hover:bg-slate-600 hover:cursor-pointer transition-colors p-1.5"
              >
                <Link to={`/chat/${conversation.id}`}>
                  <p className="truncate text-sm">{conversation.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
