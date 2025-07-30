import { useForm, type SubmitHandler } from "react-hook-form";
import { mockApi } from "@/api/mockApi";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/common/Spinner/Spinner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const previousValues = useRef<string | null>(null);

  const formValues = watch();

  useEffect(() => {
    const strFormValues = JSON.stringify(formValues);
    if (formError && previousValues.current !== strFormValues) {
      setFormError(null);
    }
    previousValues.current = strFormValues;
  }, [formValues, formError]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await mockApi.login(data.email, data.password);
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
        {formError && <p className="text-red-500">{formError}</p>}
        <div>
          <button
            type="submit"
            className="transition-all duration-500 hover:scale-105 rounded-lg hover:cursor-pointer text-dark-primary-text bg-dark-accent hover:bg-dark-accent/90 disabled:bg-dark-accent/50 disabled:hover:cursor-default w-full py-2 px-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};
