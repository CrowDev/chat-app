import { useNavigate, useParams } from "react-router";
import { InputChat } from "@/components/common/InputChat/InputChat";
import { useMessages } from "@/hooks/useMessages";
import { useEffect } from "react";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatContainer } from "@/components/ui/chat/ChatContainer";

export const inputSchema = z.object({
  input: z.string(),
});

export type InputChat = z.infer<typeof inputSchema>;

export const Chat = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  if (!conversationId) {
    return;
  }
  const methods = useForm<InputChat>({
    resolver: zodResolver(inputSchema),
  });
  const { handleSubmit, setValue, setFocus } = methods;
  setFocus("input");

  const { sendMessage, messages, isTyping, error, loading } =
    useMessages(conversationId);

  const { conversations } = useConversationsContext();

  useEffect(() => {
    const conversation = conversations.find(
      (conversation) => conversation.id === Number(conversationId),
    );
    if (!conversation) {
      navigate("/chat");
    }
  }, [conversations]);

  const conversationTitle = () => {
    const conversation = conversations.find(
      (conversation) => conversation.id === Number(conversationId),
    );
    if (!conversation) return "Title not found";
    return conversation.title;
  };

  const onSubmit = async (data: InputChat) => {
    const { input } = data;
    if (input) {
      setValue("input", "");
      await sendMessage(input);
      setFocus("input");
    }
  };

  return (
    <div className="relative h-full">
      <div className="h-[5vh] font-semibold w-fit max-w-[50%] mx-auto truncate">
        {conversationTitle()}
      </div>
      <div className="relative h-[70vh] max-h-[70vh] overflow-hidden mb-[5vh] bg-light-chat-bubble dark:bg-dark-chat-bubble rounded-xl border border-light-border dark:border-dark-border">
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          error={error}
          loading={loading}
        />
      </div>
      <div className="h-[15vh]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputChat />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
