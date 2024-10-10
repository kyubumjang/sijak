import Image from "next/image";
import { Skeleton } from "@/shared/ui";

export interface LectureSummaryItemProps {
  src: string;
  title: string;
  content?: string;
}

const LectureSummaryItem = ({
  src,
  title,
  content,
}: LectureSummaryItemProps) => {
  return (
    <div className="flex flex-row desktop:h-[30px] tablet:h-[24px] gap-3">
      <div className="flex flex-row justify-center items-center gap-2">
        <Image src={src} alt={title} width={24} height={24} />
        <div className="min-w-[38px] text-custom-textTitleGrayColor desktop:text-xl tablet:text-base">
          {title}
        </div>
      </div>
      {content ? (
        <div className="desktop:max-w-[487px] content-center tablet:max-w-[300px] desktop:text-xl tablet:text-base whitespace-nowrap">
          {content}
        </div>
      ) : (
        <Skeleton className="w-[280px] h-[42px]" />
      )}
    </div>
  );
};

export default LectureSummaryItem;
