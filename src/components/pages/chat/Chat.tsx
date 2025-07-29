import { useNavigate, useParams } from "react-router";
import type { Message } from "@/types";
import { InputChat } from "@/components/common/InputChat/InputChat";
import { useMessages } from "@/hooks/useMessages";
import { Dot } from "lucide-react";
import { ErrorSendMessage } from "@/components/common/Error/ErrorSendMessage";
import { useEffect, useRef, useState } from "react";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { Spinner } from "@/components/common/Spinner/Spinner";

export const Chat = () => {
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { conversationId } = useParams();
  if (!conversationId) {
    navigate("/chat");
    return;
  }
  const {
    messages,
    sendMessage,
    isTyping,
    error,
    retrySend,
    conversationHandler,
    loading,
  } = useMessages(conversationId);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const { conversations } = useConversationsContext();

  const conversationTitle = () => {
    const conversation = conversations.find(
      (conversation) => conversation.id === Number(conversationId),
    );
    if (!conversation) return "Title not found";
    return conversation.title;
  };

  const handleSendMessage = async () => {
    if (message) {
      sendMessage(message);
    }
  };

  const refetch = () => {
    if (message) {
      retrySend(message);
    } else {
      conversationHandler();
    }
  };

  return (
    <div className="relative h-full">
      <div className="h-[5vh] font-semibold">{conversationTitle()}</div>
      <div className="relative h-[70vh] max-h-[70vh] overflow-hidden mb-[5vh] bg-light-chat-bubble dark:bg-dark-chat-bubble rounded-xl border border-light-border dark:border-dark-border">
        <ul
          className="flex flex-col space-y-4 h-full overflow-auto p-6"
          ref={chatContainerRef}
        >
          {messages.map((message: Message) => {
            return (
              <li
                key={message.id}
                className={`flex ${message.is_from_ai ? "justify-start" : "justify-end"} `}
              >
                <div
                  className={`p-2 rounded-lg max-w-[70%] ${message.is_from_ai ? "bg-light-border text-light-primary-text dark:bg-dark-border dark:text-dark-secondary-text" : "bg-light-primary text-dark-primary-text"}`}
                >
                  {message.content}
                </div>
              </li>
            );
          })}
          {isTyping && (
            <li className={`flex justify-start`}>
              <div className="flex gap-0.5 bg-light-border text-light-primary-text dark:bg-dark-border dark:text-dark-secondary-text rounded-lg p-2 w-fit">
                <Dot className="animate-bounce" size={16} />
                <Dot className="animate-bounce" size={16} />
                <Dot className="animate-bounce" size={16} />
              </div>
            </li>
          )}
          {error && <ErrorSendMessage refetch={refetch} />}
          {loading && (
            <div className="w-fit mx-auto">
              <Spinner size={24} />
            </div>
          )}
        </ul>
      </div>
      <div className="h-[15vh]">
        <InputChat sendFn={handleSendMessage} setMessage={setMessage} />
      </div>
    </div>
  );
};
