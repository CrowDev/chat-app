import { useForm, type SubmitHandler } from "react-hook-form";
import { mockApi } from "@/api/mockApi";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/common/Spinner/Spinner";

interface ISignInForm {
  email: string;
  password: string;
  form: string;
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    clearErrors,
    setValue,
  } = useForm<ISignInForm>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    try {
      const result = await mockApi.login(data.email, data.password);
      localStorage.setItem("token", result.token);
      navigate("/chat");
    } catch (error) {
      setValue("password", "");
      setError("form", {
        type: "custom",
        message: "Invalid credentials",
      });
    }
  };

  const clearError = () => clearErrors("form");
  const isDisabled = isSubmitting && !isValid;

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
            {...register("email", { required: true })}
            onChange={clearError}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
            {...register("password", { required: true })}
            onChange={clearError}
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {errors.form && <p className="text-red-500">Invalid credentials</p>}
        <div>
          <button
            type="submit"
            className="transition-all duration-500 hover:scale-105 rounded-lg hover:cursor-pointer text-dark-primary-text bg-dark-accent hover:bg-dark-accent/90 disabled:bg-dark-accent/50 disabled:hover:cursor-default w-full py-2 px-4"
            disabled={isDisabled}
          >
            {isSubmitting ? <Spinner /> : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};
