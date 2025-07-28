import { Loader } from "lucide-react";

interface IProps {
  size?: number;
}

export const Spinner = ({ size = 16 }: IProps) => {
  return <Loader size={size} className="animate-spin w-full" />;
};
