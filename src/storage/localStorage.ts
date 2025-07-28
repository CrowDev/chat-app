import type { Conversation, Message } from "@/types";

// Conversation Storage //

export const storeMessages = (conversationId: string, value: Message[]) => {
  localStorage.setItem(`conversation-${conversationId}`, JSON.stringify(value));
};

export const getMessages = (conversationId: string): Message[] | null => {
  const conversation = localStorage.getItem(`conversation-${conversationId}`);
  if (!conversation) return null;
  return JSON.parse(conversation);
};

export const storeConversation = (conversations: Conversation[]) => {
  localStorage.setItem("conversations", JSON.stringify(conversations));
};

export const getConversations = () => {
  const conversations = localStorage.getItem("conversations");
  if (!conversations) return null;
  return JSON.parse(conversations);
};
