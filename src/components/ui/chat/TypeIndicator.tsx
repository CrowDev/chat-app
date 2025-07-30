import { Dot } from "lucide-react";

export const TypeIndicator = () => {
  return (
    <li className={`flex justify-start`}>
      <div className="flex gap-0.5 bg-light-border text-light-primary-text dark:bg-dark-border dark:text-dark-secondary-text rounded-lg p-2 w-fit">
        <Dot className="animate-bounce" size={16} />
        <Dot className="animate-bounce" size={16} />
        <Dot className="animate-bounce" size={16} />
      </div>
    </li>
  );
};
