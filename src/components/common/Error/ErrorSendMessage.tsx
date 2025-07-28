import { RotateCcw } from "lucide-react";

interface IProps {
  refetch: () => void;
}

export const ErrorSendMessage = ({ refetch }: IProps) => {
  return (
    <div className="border border-red-500 bg-red-500/20 rounded-lg p-3 flex justify-between">
      <span className="text-red-500">
        An error has occurred. Please, retry.
      </span>
      <button
        type="button"
        className="focus:outline-none hover:cursor-pointer hover:-rotate-360 hover:scale-110 transition-transform duration-500"
        onClick={refetch}
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
};
