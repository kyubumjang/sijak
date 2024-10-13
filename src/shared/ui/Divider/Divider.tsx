import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
}
const Divider = ({ className }: DividerProps) => {
  return <hr className={twMerge("divide-solid", className)}></hr>;
};

export default Divider;
