import { useForm, type SubmitHandler } from "react-hook-form";
import { mockApi } from "@/api/mockApi";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/common/Spinner/Spinner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useEffect, useRef, useState } from "react";

interface ISignUpForm {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  form: string;
}

const signUpSchema = z
  .object({
    fullname: z
      .string()
      .min(1, "Full Name is required")
      .min(3, "Full Name must be at least 3 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const [formError, setFormError] = useState<string | null>(null);
  const emailValue = watch("email");
  const previousEmailValue = useRef<string | null>(null);
  useEffect(() => {
    if (formError && previousEmailValue.current !== emailValue) {
      setFormError(null);
    }
    previousEmailValue.current = emailValue;
  }, [emailValue, formError]);

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpForm) => {
    try {
      const result = await mockApi.register(
        data.email,
        data.password,
        data.fullname,
      );
      localStorage.setItem("token", result.token);
      navigate("/chat");
    } catch (error) {
      if (!(error instanceof Error)) return;
      setFormError(error.message);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            placeholder="Enter your full name"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
            {...register("fullname")}
          />
          {errors.fullname && (
            <span className="text-red-500">{errors.fullname.message}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        {formError && <p className="text-red-500">{formError}</p>}
        <div>
          <button
            type="submit"
            className="transition-all duration-500 hover:scale-105 rounded-lg hover:cursor-pointer text-dark-primary-text bg-dark-accent hover:bg-dark-accent/90 disabled:bg-dark-accent/50 disabled:hover:cursor-default w-full py-2 px-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};
