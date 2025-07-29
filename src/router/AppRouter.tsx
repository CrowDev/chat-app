import App from "@/App";
import { ProtectedRoute } from "@/components/common/ProtectedRoute/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/dashboard/DashboardLayout";
import { AuthLayout } from "@/components/layout/login/AuthLayout";
import { Chat } from "@/components/pages/chat/Chat";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login/Login";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";

export const AppRouter = () => {
  return (
    <div className="font-lato">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/chat" element={<Dashboard />} />
              <Route path="/chat/:conversationId" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
