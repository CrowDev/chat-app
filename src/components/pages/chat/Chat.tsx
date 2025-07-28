import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { mockApi } from "@/api/mockApi";
import { useToken } from "@/hooks/useToken";
import type { Message } from "@/types";

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

  return (
    <div>
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
    </div>
  );
};
