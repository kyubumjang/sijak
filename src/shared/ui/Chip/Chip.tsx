import { Button } from "../Button";
import { twMerge } from "tailwind-merge";

interface ChipProps {
  content: string;
  handleClick?: () => void;
  status: ChipStatus;
  className?: string;
}

export type ChipStatus = "default" | "active";

const chipStatusStyle: Record<ChipStatus, string> = {
  default:
    "bg-white text-custom-textBlackColor hover:bg-white hover:text-custom-purple hover:font-bold ",
  active: "bg-custom-purple text-white hover:bg-custom-hoverPurple",
};

const Chip = ({ content, handleClick, status, className }: ChipProps) => {
  const containerClassName = twMerge(
    "flex justify-center items-center rounded-[100px]",
    className,
  );
  const activeChip = chipStatusStyle[status];

  return (
    <Button
      className={twMerge(containerClassName, activeChip)}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};

export default Chip;
