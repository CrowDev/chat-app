import { useNavigate, useParams } from "react-router";
import type { Message } from "@/types";
import { InputChat } from "@/components/common/InputChat/InputChat";
import { useMessages } from "@/hooks/useMessages";
import { Dot } from "lucide-react";
import { ErrorSendMessage } from "@/components/common/Error/ErrorSendMessage";
import { useState } from "react";

export const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const { conversationId } = useParams();
  if (!conversationId) {
    navigate("/chat");
    return;
  }
  const { messages, sendMessage, isTyping, error, retrySend } =
    useMessages(conversationId);

  const handleSendMessage = async () => {
    if (message) {
      sendMessage(message);
    }
  };

  const refetch = () => {
    if (message) retrySend(message);
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
        {isTyping && (
          <li className={`flex justify-start`}>
            <div className="flex gap-0.5 bg-slate-600 rounded-lg p-2 w-fit">
              <Dot className="animate-bounce" size={16} />
              <Dot className="animate-bounce" size={16} />
              <Dot className="animate-bounce" size={16} />
            </div>
          </li>
        )}
        {error && <ErrorSendMessage refetch={refetch} />}
      </ul>
      <InputChat sendFn={handleSendMessage} setMessage={setMessage} />
    </div>
  );
};
