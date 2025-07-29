import type { Conversation, Message } from "@/types";

const TOKEN_KEY = "token";
// Conversation Storage //

export const storeMessages = (conversationId: string, value: Message[]) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return;
  const userId = getUserIdFromToken(token);
  localStorage.setItem(
    `conversation-${conversationId}-${userId}`,
    JSON.stringify(value),
  );
};

export const getMessages = (conversationId: string): Message[] | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  const userId = getUserIdFromToken(token);
  const conversation = localStorage.getItem(
    `conversation-${conversationId}-${userId}`,
  );
  if (!conversation) return null;
  return JSON.parse(conversation);
};

export const storeConversation = (conversations: Conversation[]) => {
  localStorage.setItem("conversations", JSON.stringify(conversations));
};

export const getConversations = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  const userId = getUserIdFromToken(token);
  const conversations = localStorage.getItem("conversations");
  if (!conversations) return null;
  const filteredConversations = JSON.parse(conversations).filter(
    (conversation: Conversation) => conversation.user_id === userId,
  );
  return filteredConversations;
};

// helper
export const getUserIdFromToken = (token: string) => {
  return Number(token.split("-")[3]);
};
