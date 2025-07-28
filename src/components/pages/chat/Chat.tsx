import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { mockApi } from "@/api/mockApi";
import { useToken } from "@/hooks/useToken";
import type { Message } from "@/types";
import { InputChat } from "@/components/common/InputChat/InputChat";

export const Chat = () => {
  const { conversationId } = useParams();
  const { token } = useToken(Number(conversationId));
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!token || !conversationId) return;
      try {
        const result = await mockApi.getMessages(token, conversationId);
        setMessages(result.messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversation();
  }, [token, conversationId]);

  const sendMessage = async (message: string) => {
    const result = await mockApi.sendMessage(token, conversationId, message);
    const aiResult = await mockApi.simulateAIResponse(conversationId, message);
    setMessages((prev: Message[]) => [
      ...prev,
      result.message,
      aiResult.message,
    ]);
  };

  return (
    <div className="relative h-full">
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
      <InputChat sendFn={sendMessage} />
    </div>
  );
};
