import { useRef } from "react";
import { Send } from "lucide-react";

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
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const focusInputElement = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    sendFn();
  };

  // TODO: add a debounce for input
  return (
    <div className={`flex w-full gap-5`}>
      <div
        className="rounded-lg bg-slate-600 p-3 hover:cursor-text grow"
        onClick={focusInputElement}
      >
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          className="focus:outline-none w-full h-15"
          rows={2}
          onChange={() => setMessage(inputRef.current?.value as string)}
        ></textarea>
      </div>
      <button type="button" onClick={handleClick}>
        <Send />
      </button>
    </div>
  );
};
