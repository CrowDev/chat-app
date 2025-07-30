import { useCallback, useEffect, useState } from "react";
import { useToken } from "./useToken";
import { mockApi, type Conversation, type Message } from "@/api/mockApi";
import { useConversationsContext } from "./useConversationsContext";
import { getMessages, storeMessages } from "@/storage/localStorage";

export const useMessages = (conversationId: string) => {
  const { token } = useToken(Number(conversationId));
  const { conversations } = useConversationsContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const checkMessages = () => {
    return getMessages(conversationId);
  };

  const conversationHandler = () => {
    const fetchConversation = async () => {
      setLoading(true);
      setError(false);
      if (!token || !conversationId) return;
      try {
        const result = await mockApi.getMessages(token, conversationId);

        if (result.messages.length > 0) {
          storeMessages(conversationId, result.messages);
          setMessages(result.messages);
        } else {
          getNewConversationMessage();
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    const messagesStore = checkMessages();
    if (messagesStore) {
      setMessages(messagesStore);
      setLoading(false);
    } else {
      fetchConversation();
    }
  };

  useEffect(() => {
    setMessages([]);
    conversationHandler();
  }, [token, conversationId]);

  const getNewConversationMessage = () => {
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
  };

  const sendMessage = useCallback(
    async (message: string) => {
      setError(false);
      try {
        if (!token) return;
        const userMsg = await mockApi.sendMessage(
          token,
          conversationId,
          message,
        );
        setMessages((prev) => [...prev, userMsg.message]);

        setIsTyping(true);

        const aiResponse = await mockApi.simulateAIResponse(
          conversationId,
          message,
        );
        setIsTyping(false);
        setMessages((prev) => [...prev, aiResponse.message]);
        storeMessages(conversationId, [
          ...messages,
          userMsg.message,
          aiResponse.message,
        ]);
      } catch (error) {
        console.error("Failed to send message:", error);
        setIsTyping(false);
        setError(true);
      }
    },
    [token, conversationId, messages],
  );
  return {
    messages,
    sendMessage,
    isTyping,
    error,
    loading,
  };
};
