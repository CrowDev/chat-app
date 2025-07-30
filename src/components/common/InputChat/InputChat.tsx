import { SendHorizonal } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { InputChat as TInputChat } from "@/components/pages/chat/Chat";

interface IProps {
  placeholder?: string;
}

export const InputChat = ({ placeholder = "Answer to ChatApp..." }: IProps) => {
  const {
    register,
    setFocus,
    watch,
    formState: { isSubmitting },
  } = useFormContext<TInputChat>();

  const input = watch("input");

  const focusInputElement = () => {
    setFocus("input");
  };

  return (
    <div className="flex gap-5 items-center">
      <div
        className="flex justify-start items-center hover:cursor-text grow rounded-full bg p-3 border-light-border dark:border-dark-border border-2"
        onClick={focusInputElement}
      >
        <textarea
          placeholder={placeholder}
          className="focus:outline-offset-[16px] focus:outline-2 outline-dark-accent rounded-full w-full h-10 p-0.5"
          rows={2}
          {...register("input")}
        ></textarea>
      </div>
      <button
        className="grid place-content-center rounded-full p-2 bg-dark-accent text-dark-primary-text w-[48px] h-[48px] hover:cursor-pointer hover:scale-110 transition-all disabled:bg-dark-accent/15 disabled:hover:cursor-not-allowed"
        type="submit"
        disabled={!input || isSubmitting}
      >
        <SendHorizonal size={24} />
      </button>
    </div>
  );
};
