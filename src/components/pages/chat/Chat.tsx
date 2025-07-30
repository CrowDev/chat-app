import { useNavigate, useParams } from "react-router";
import { InputChat } from "@/components/common/InputChat/InputChat";
import { useMessages } from "@/hooks/useMessages";
import { Dot } from "lucide-react";
import { ErrorSendMessage } from "@/components/common/Error/ErrorSendMessage";
import { useEffect, useRef } from "react";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { Spinner } from "@/components/common/Spinner/Spinner";
import type { Message } from "@/api/mockApi";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const inputSchema = z.object({
  input: z.string(),
});

export type InputChat = z.infer<typeof inputSchema>;

export const Chat = () => {
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const { conversationId } = useParams();
  if (!conversationId) {
    return;
  }
  const methods = useForm<InputChat>({
    resolver: zodResolver(inputSchema),
  });
  const { handleSubmit, setValue, setFocus } = methods;
  setFocus("input");

  const { messages, sendMessage, isTyping, error, loading } =
    useMessages(conversationId);

  const { conversations } = useConversationsContext();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
      <div className="h-[5vh] font-semibold w-fit max-w-[50%] mx-auto">
        {conversationTitle()}
      </div>
      <div className="relative h-[70vh] max-h-[70vh] overflow-hidden mb-[5vh] bg-light-chat-bubble dark:bg-dark-chat-bubble rounded-xl border border-light-border dark:border-dark-border">
        <ul
          className="flex flex-col space-y-4 h-full overflow-auto p-6"
          ref={chatContainerRef}
        >
          {messages.map((message: Message) => {
            return (
              <li
                key={message.id}
                className={`flex ${message.is_from_ai ? "justify-start" : "justify-end"} `}
              >
                <div
                  className={`p-2 rounded-lg max-w-[70%] ${message.is_from_ai ? "bg-light-border text-light-primary-text dark:bg-dark-border dark:text-dark-secondary-text" : "bg-light-primary text-dark-primary-text"}`}
                >
                  {message.content}
                </div>
              </li>
            );
          })}
          {isTyping && (
            <li className={`flex justify-start`}>
              <div className="flex gap-0.5 bg-light-border text-light-primary-text dark:bg-dark-border dark:text-dark-secondary-text rounded-lg p-2 w-fit">
                <Dot className="animate-bounce" size={16} />
                <Dot className="animate-bounce" size={16} />
                <Dot className="animate-bounce" size={16} />
              </div>
            </li>
          )}
          {error && <ErrorSendMessage />}
          {loading && (
            <div className="w-fit mx-auto">
              <Spinner size={24} />
            </div>
          )}
        </ul>
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
