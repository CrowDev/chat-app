import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="p-4 min-h-dvh bg-background text-light-font flex items-center justify-center">
      <Outlet />
    </div>
  );
};
