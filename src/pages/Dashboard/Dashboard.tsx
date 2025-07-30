import { InputChat } from "@/components/common/InputChat/InputChat";
import { useToken } from "@/hooks/useToken";
import { mockApi } from "@/api/mockApi";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { ErrorMessage } from "@/components/common/Error/ErrorMessage";
import { useState } from "react";
import {
  inputSchema,
  type InputChat as TInputChat,
} from "@/components/pages/chat/Chat";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { FormProvider, useForm } from "react-hook-form";

const Dashboard = () => {
  const { token } = useToken();
  const { createConversation } = useConversationsContext();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const methods = useForm<TInputChat>({
    resolver: zodResolver(inputSchema),
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: TInputChat) => {
    setLoading(true);
    const { input } = data;
    try {
      if (!token || !input) return;
      const result = await mockApi.createConversation(token, input);
      createConversation(result.conversation);
      navigate(`/chat/${result.conversation.id}`);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-6 pt-44 relative h-fit">
      {loading && <Spinner size={36} />}
      {!loading && error && (
        <div className="mb-8">
          <ErrorMessage />
        </div>
      )}
      {!loading && (
        <>
          <p className="text-3xl text-center mb-6">Hey! How's everything?</p>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputChat placeholder={"How can I help you today?"} />
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default Dashboard;
