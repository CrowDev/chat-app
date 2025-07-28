import { useRef } from "react";
import { Send } from "lucide-react";

export const InputChat = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const focusInputElement = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };

  return (
    <div className="flex absolute bottom-0 w-full gap-5">
      <div
        className="rounded-lg bg-slate-600 p-3 hover:cursor-text grow"
        onClick={focusInputElement}
      >
        <textarea
          ref={inputRef}
          placeholder="Answer to ChatApp..."
          className="focus:outline-none w-full h-15"
          rows={2}
        ></textarea>
      </div>
      <button>
        <Send />
      </button>
    </div>
  );
};
