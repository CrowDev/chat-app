import { useEffect, useState } from "react";
import { useToken } from "./useToken";
import { mockApi } from "@/api/mockApi";
import type { Conversation, Message } from "@/types";
import { useConversationsContext } from "./useConversationsContext";

export const useMessages = (conversationId: string | undefined) => {
  const { token } = useToken(Number(conversationId));
  const { conversations } = useConversationsContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!token || !conversationId) return;
      try {
        const result = await mockApi.getMessages(token, conversationId);

        if (result.messages.length > 0) {
          setMessages(result.messages);
        } else {
          // if there's no messages then is a new conversation.
          // We look for the new created conversation and we use
          // the title as input for the message
          const currentConversation = conversations.find(
            (conversation: Conversation) =>
              conversation.id === Number(conversationId),
          );
          if (currentConversation) {
            const { title } = currentConversation;
            sendMessage(title);
          }
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
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

  return {
    messages,
    sendMessage,
    error,
    loading,
  };
};
