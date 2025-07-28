import { useParams } from "react-router";
import type { Message } from "@/types";
import { InputChat } from "@/components/common/InputChat/InputChat";
import { useMessages } from "@/hooks/useMessages";

export const Chat = () => {
  const { conversationId } = useParams();
  const { messages, sendMessage } = useMessages(conversationId);

  const handleSendMessage = async (message: string) => {
    sendMessage(message);
  };

  return (
    <div className="relative h-full grid grid-rows-[1fr_90px]">
      <ul className="flex flex-col space-y-4">
        {messages.map((message: Message) => {
          return (
            <li
              key={message.id}
              className={`flex ${message.is_from_ai ? "justify-start" : "justify-end"} `}
            >
              <div
                className={`p-2 rounded-lg ${message.is_from_ai ? "" : "bg-slate-600"}`}
              >
                {message.content}
              </div>
            </li>
          );
        })}
      </ul>
      <InputChat sendFn={handleSendMessage} />
    </div>
  );
};
