import { SignInForm } from "@/components/pages/login/SignInForm";
import { SignUpForm } from "@/components/pages/login/SignUpForm";
import { useState } from "react";

const Login = () => {
  const [optionSelected, setOptionSelected] = useState<"signIn" | "signUp">(
    "signIn",
  );
  return (
    <div className="border rounded-lg border-slate-600 max-w-md w-full">
      <div className="p-6 flex flex-col space-y-1">
        <div className="text-center text-2xl font-bold">Welcome</div>
        <p className="text-sm text-light-font/70 text-center">
          Sign in to your account or create a new one
        </p>
      </div>
      <div className="p-6 pt-0 flex flex-col">
        <div className="rounded-lg w-full bg-slate-600 p-1 flex mb-6">
          <button
            className={`${optionSelected === "signIn" ? "bg-background" : ""} w-1/2 rounded-md px-3 py-1.5 hover:cursor-pointer`}
            onClick={() => setOptionSelected("signIn")}
          >
            Sign In
          </button>
          <button
            className={`${optionSelected === "signUp" ? "bg-background" : ""} w-1/2 rounded-md px-3 py-1.5 hover:cursor-pointer`}
            onClick={() => setOptionSelected("signUp")}
          >
            Sign Up
          </button>
        </div>
        {optionSelected === "signIn" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default Login;
