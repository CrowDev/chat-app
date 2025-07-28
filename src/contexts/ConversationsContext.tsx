import type { Conversation } from "@/types";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { mockApi } from "@/api/mockApi";
import { useToken } from "@/hooks/useToken";
import { getConversations, storeConversation } from "@/storage/localStorage";

interface IProps {
  children: React.ReactNode;
}

export interface IValueContext {
  loading: boolean;
  error: boolean;
  conversations: Conversation[];
  createConversation: (conversation: Conversation) => void;
  refetch: () => void;
}

export const ConversationContext = createContext<IValueContext | undefined>(
  undefined,
);

export const ConversationContextProvider = ({ children }: IProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { token } = useToken();
  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      if (!token) return;
      const result = await mockApi.getConversations(token);
      setConversations(result.conversations);
      storeConversation(result.conversations);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };
  const checkConversations = () => {
    return getConversations();
  };
  useEffect(() => {
    const conversationsStored = checkConversations();
    if (conversationsStored) {
      setConversations(conversationsStored);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [token]);

  const createConversation = (conversation: Conversation) => {
    storeConversation([...conversations, conversation]);
    setConversations((prev: Conversation[]) => [conversation, ...prev]);
  };

  const contextValues: IValueContext = {
    loading,
    error,
    conversations,
    createConversation,
    refetch: fetchData,
  };

  return (
    <ConversationContext.Provider value={contextValues}>
      {children}
    </ConversationContext.Provider>
  );
};
