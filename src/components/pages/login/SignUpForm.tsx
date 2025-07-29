import { useForm, type SubmitHandler } from "react-hook-form";
import { mockApi } from "@/api/mockApi";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/common/Spinner/Spinner";

interface ISignUpForm {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  form: string;
}

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<ISignUpForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    try {
      const result = await mockApi.register(data.email, data.password);
      localStorage.setItem("token", result.token);
      navigate("/chat");
    } catch (error) {
      setError("form", {
        type: "custom",
        message: "An error has occurred, Pleasy, retry later.",
      });
    }
  };
  const isDisabled = isSubmitting && !isValid;

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            placeholder="Enter your full name"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
            {...register("email", { required: true })}
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
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: {
                checkPasswords: (password, { confirmPassword }) => {
                  return (
                    confirmPassword === password || "Passwords do not match"
                  );
                },
              },
            })}
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
            {...register("confirmPassword", {
              required: true,
              validate: {
                checkPasswords: (confirmPassword, { password }) => {
                  return (
                    confirmPassword === password || "Passwords do not match"
                  );
                },
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        {errors.form && <p className="text-red-500">{errors.form.message}</p>}
        <div>
          <button
            type="submit"
            className="transition-all duration-500 hover:scale-105 rounded-lg hover:cursor-pointer text-dark-primary-text bg-dark-accent hover:bg-dark-accent/90 disabled:bg-dark-accent/50 disabled:hover:cursor-default w-full py-2 px-4"
            disabled={isDisabled}
          >
            {isSubmitting ? <Spinner /> : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};
