import { Skeleton } from "@/shared/ui";

interface SkeletonCardProps {
  type: "homeLecture" | "pickLecture";
}

const SkeletonCard = ({ type }: SkeletonCardProps) => {
  return type === "homeLecture" ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px] rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="w-[300px] h-6" />
        <Skeleton className="w-[200px] h-[42px]" />
      </div>
      <div className="flex flex-row w-[336px] h-[27px] justify-between">
        <Skeleton className="w-[100px] h-[27px]" />
        <Skeleton className="w-[90px] h-[27px]" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col space-y-3">
      <Skeleton className="desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px] rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="w-[300px] h-6" />
        <Skeleton className="w-[200px] h-[42px]" />
      </div>
      <div className="flex flex-row w-[336px] h-[27px] justify-between">
        <Skeleton className="w-[100px] h-[27px]" />
        <Skeleton className="w-[90px] h-[27px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;
