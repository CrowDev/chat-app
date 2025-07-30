import type { Message } from "@/api/mockApi";

interface IProps {
  message: Message;
}

export const ChatBubble = ({ message }: IProps) => {
  return (
    <li
      className={`flex ${message.is_from_ai ? "justify-start" : "justify-end"} `}
    >
      <div
        className={`p-2 rounded-lg max-w-[70%] ${message.is_from_ai ? "bg-light-border text-light-primary-text dark:bg-dark-border dark:text-dark-secondary-text" : "bg-light-primary text-dark-primary-text"}`}
      >
        {message.content}
      </div>
    </li>
  );
};
