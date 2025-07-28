import { useEffect, useState } from "react";
import { mockApi } from "@/api/mockApi";
import type { Conversation } from "@/types";
import { Link } from "react-router";

const TOKEN_KEY = "token";

export const Sidebar = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          const result = await mockApi.getConversations(token);
          setConversations(result.conversations);
        } catch (error) {
          console.log("Failed to load conversations");
        }
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="min-h-dvh border-r-slate-600 border-r p-4 flex flex-col space-y-4">
      <div>logo</div>
      <div className="flex flex-col space-y-4 mt-2">
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
