import App from "@/App";
import Login from "@/pages/Login/Login";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
