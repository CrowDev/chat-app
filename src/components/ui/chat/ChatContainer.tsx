import type { Message } from "@/api/mockApi";
import { ErrorSendMessage } from "@/components/common/Error/ErrorSendMessage";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { useEffect, useRef } from "react";
import { TypeIndicator } from "./TypeIndicator";
import { ChatBubble } from "./ChatBubble";

interface IProps {
  messages: Message[];
  isTyping: boolean;
  error: boolean;
  loading: boolean;
}

export const ChatContainer = ({
  messages,
  isTyping,
  error,
  loading,
}: IProps) => {
  const chatContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul
      className="flex flex-col space-y-4 h-full overflow-auto p-6"
      ref={chatContainerRef}
    >
      {messages.map((message: Message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {isTyping && <TypeIndicator />}
      {error && <ErrorSendMessage />}
      {loading && (
        <div className="w-fit mx-auto">
          <Spinner size={24} />
        </div>
      )}
    </ul>
  );
};
