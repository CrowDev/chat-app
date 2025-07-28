import type { Conversation } from "@/types";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { mockApi } from "@/api/mockApi";
import { useToken } from "@/hooks/useToken";

interface IProps {
  children: React.ReactNode;
}

export interface IValueContext {
  loading: boolean;
  error: boolean;
  conversations: Conversation[];
  createConversation: (conversation: Conversation) => void;
}

export const ConversationContext = createContext<IValueContext | undefined>(
  undefined,
);

export const ConversationContextProvider = ({ children }: IProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { token } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        const result = await mockApi.getConversations(token);
        setConversations(result.conversations);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const createConversation = (conversation: Conversation) => {
    setConversations((prev: Conversation[]) => [conversation, ...prev]);
  };

  const contextValues: IValueContext = {
    loading,
    error,
    conversations,
    createConversation,
  };

  return (
    <ConversationContext.Provider value={contextValues}>
      {children}
    </ConversationContext.Provider>
  );
};
