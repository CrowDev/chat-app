export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export interface Conversation {
  id: number;
  title: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  last_message: string | null;
  message_count?: number;
}

export interface Message {
  id: number;
  conversation_id: number;
  content: string;
  is_from_ai: boolean;
  created_at: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expires_in: number;
}

export interface RegisterResponse {
  user: User;
  token: string;
  expires_in: number;
}

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface MessagesResponse {
  messages: Message[];
}

export interface MessageResponse {
  message: Message;
}

export interface ConversationResponse {
  conversation: Conversation;
}

export interface UserResponse {
  user: User;
}

export interface MockApi {
  login(email: string, password: string): Promise<LoginResponse>;
  register(
    email: string,
    password: string,
    name: string,
  ): Promise<RegisterResponse>;
  getCurrentUser(token: string): Promise<UserResponse>;
  getConversations(token: string): Promise<ConversationsResponse>;
  createConversation(
    token: string,
    title?: string,
  ): Promise<ConversationResponse>;
  getMessages(token: string, conversationId: string): Promise<MessagesResponse>;
  sendMessage(
    token: string,
    conversationId: string,
    content: string,
  ): Promise<MessageResponse>;
  simulateAIResponse(
    conversationId: string,
    userMessage: string,
  ): Promise<MessageResponse>;
  getContextualResponse(userMessage: string): string;
  updateProfile(token: string, updates: Partial<User>): Promise<UserResponse>;
}

export interface MockHelpers {
  getTypingDelay(messageLength: number): number;
  isValidToken(token: string): boolean;
  formatDate(dateString: string): string;
  generateTitle(firstMessage: string): string;
}

export declare const mockApi: MockApi;
export declare const mockHelpers: MockHelpers;
