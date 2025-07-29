import { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

interface IProps {
  sendFn: () => void;
  placeholder?: string;
  setMessage: (message: string) => void;
}

export const InputChat = ({
  sendFn,
  placeholder = "Answer to ChatApp...",
  setMessage,
}: IProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [textareaValue, setTextareaValue] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebouncedValue(textareaValue);
    }, 200);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [textareaValue]);

  useEffect(() => {
    if (!debouncedValue) return;
    setMessage(inputRef.current?.value as string);
  }, [debouncedValue]);

  const focusInputElement = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const handleClick = () => {
    sendFn();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setTextareaValue("");
  };

  return (
    <div className="flex gap-5 items-center">
      <div
        className="flex justify-start items-center hover:cursor-text grow rounded-full bg p-3 border-light-border dark:border-dark-border border-2"
        onClick={focusInputElement}
      >
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          className="focus:outline-offset-[16px] focus:outline-2 outline-dark-accent rounded-full w-full h-10 p-0.5"
          rows={2}
          onChange={() => setTextareaValue(inputRef.current?.value as string)}
        ></textarea>
      </div>
      <button
        className="grid place-content-center rounded-full p-2 bg-dark-accent text-dark-primary-text w-[48px] h-[48px] hover:cursor-pointer hover:scale-110 transition-all disabled:bg-dark-accent/15 disabled:hover:cursor-not-allowed"
        type="button"
        onClick={handleClick}
        disabled={!debouncedValue}
      >
        <SendHorizonal size={24} />
      </button>
    </div>
  );
};
