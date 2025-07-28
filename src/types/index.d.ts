export type User = {
  id: number;
  email: string;
  name: string;
  avatar: string;
};

export type Conversation = {
  id: number;
  title: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  last_message: string;
};

export type Message = {
  id: number;
  conversation_id: number;
  content: string;
  is_from_ai: boolean;
  created_at: string;
};
