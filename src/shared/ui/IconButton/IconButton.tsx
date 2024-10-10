import { Button } from "../Button";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface IconButtonProps {
  buttonWidth?: number;
  buttonHeight?: number;
  handleClick?: () => void;
  src: string;
  alt: string;
  iconWidth: number;
  iconHeight: number;
}

const IconButton = ({
  buttonWidth = 32,
  buttonHeight = 32,
  handleClick,
  src,
  alt,
  iconWidth,
  iconHeight,
}: IconButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={twMerge(
        "flex flex-col items-center justify-center content-center w-[32px] h-[32px] hover:bg-gray-200",
        `w-[${buttonWidth}px], h-[${buttonHeight}px]`,
      )}
      onClick={handleClick}
    >
      <Image src={src} alt={alt} width={iconWidth} height={iconHeight} />
    </Button>
  );
};

export default IconButton;
