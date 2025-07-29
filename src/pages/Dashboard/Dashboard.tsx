import { InputChat } from "@/components/common/InputChat/InputChat";
import { useToken } from "@/hooks/useToken";
import { mockApi } from "@/api/mockApi";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { ErrorMessage } from "@/components/common/Error/ErrorMessage";
import { useState } from "react";

const Dashboard = () => {
  const { token } = useToken();
  const { createConversation } = useConversationsContext();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const send = async () => {
    setLoading(true);
    try {
      if (!token || !message) return;
      const result = await mockApi.createConversation(token, message);
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
          <InputChat
            sendFn={send}
            setMessage={setMessage}
            placeholder={"How can I help you today?"}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
