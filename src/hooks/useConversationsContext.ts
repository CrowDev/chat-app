import {
  ConversationContext,
  type IValueContext,
} from "@/contexts/ConversationsContext";
import { useContext } from "react";

export const useConversationsContext = (): IValueContext => {
  const context = useContext(ConversationContext);
  if (!context) throw new Error("Must be inside within Provider");
  return context;
};
