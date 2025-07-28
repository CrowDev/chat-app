import App from "@/App";
import { ProtectedRoute } from "@/components/common/ProtectedRoute/ProtectedRoute";
import { ChatPageLayout } from "@/components/layout/chat/ChatPageLayout";
import { AuthLayout } from "@/components/layout/login/AuthLayout";
import ChatPage from "@/pages/Chat/Chat";
import Login from "@/pages/Login/Login";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<ChatPageLayout />}>
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
