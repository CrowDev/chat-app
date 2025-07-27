import App from "@/App";
import { AuthLayout } from "@/components/layout/login/AuthLayout";
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
      </Routes>
    </BrowserRouter>
  );
};
