import { InputChat } from "@/components/common/InputChat/InputChat";
import { useToken } from "@/hooks/useToken";
import { mockApi } from "@/api/mockApi";
import { useConversationsContext } from "@/hooks/useConversationsContext";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/common/Spinner/Spinner";

const Dashboard = () => {
  const { token } = useToken();
  const { createConversation, loading } = useConversationsContext();
  const navigate = useNavigate();
  const send = async (message: string) => {
    try {
      const result = await mockApi.createConversation(token, message);
      createConversation(result.conversation);
      navigate(`/chat/${result.conversation.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-6 pt-44 relative h-fit">
      {loading ? (
        <Spinner size={36} />
      ) : (
        <>
          <p className="text-3xl text-center mb-6">Hey! How's everything?</p>
          <InputChat sendFn={send} placeholder={"How can I help you today?"} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
