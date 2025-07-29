import { Menu } from "lucide-react";

interface IProps {
  onClick: () => void;
}

export const HamburgerButton = ({ onClick }: IProps) => {
  return (
    <button
      type="button"
      className={`fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-dark-primary border border-light-border dark:border-dark-border shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
      onClick={onClick}
      aria-label="Open sidebar"
    >
      <Menu size={20} />
    </button>
  );
};
