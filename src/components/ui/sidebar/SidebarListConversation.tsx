import type { Conversation } from "@/types";
import { SidebarConversation } from "./SidebarConversation";

interface IProps {
  conversations: Conversation[];
}

export const SidebarListConversation = ({ conversations }: IProps) => {
  return (
    <ul className="flex flex-col space-y-1">
      {conversations.map((conversation: Conversation) => (
        <SidebarConversation
          key={conversation.id}
          conversation={conversation}
        />
      ))}
    </ul>
  );
};
