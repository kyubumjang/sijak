import { Skeleton } from "@/shared/ui";

interface SkeletonCardProps {
  type: "homeLecture" | "pickLecture";
}

const SkeletonCard = ({ type }: SkeletonCardProps) => {
  return type === "homeLecture" ? (
    <div className="flex flex-col desktop:h-[468px] tablet:h-[343px] mobile:h-[328px] desktop:space-y-[60px] tablet:space-y-[14px] mobile:space-y-[14px]">
      <div className="flex flex-col space-y-[20px]">
        <Skeleton className="desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px] rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="w-[208px] h-[16px]" />
          <Skeleton className="w-[284px] h-[42px]" />
        </div>
      </div>
      <div className="flex flex-row desktop:w-[336px] tablet:w-[248px] mobile:w-[248px] h-[27px] justify-between">
        <Skeleton className="w-[100px] h-[27px]" />
        <Skeleton className="w-[90px] h-[27px]" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col desktop:h-[468px] tablet:h-[343px] mobile:h-[328px] desktop:space-y-[60px] tablet:space-y-[14px] mobile:space-y-[14px]">
      <div className="flex flex-col space-y-[20px]">
        <Skeleton className="desktop:w-[384px] tablet:w-[344px] mobile:w-[312px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px] rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="w-[208px] h-[16px]" />
          <Skeleton className="w-[284px] h-[42px]" />
        </div>
      </div>
      <div className="flex flex-row desktop:w-[336px] tablet:w-[344px] mobile:w-[312px] h-[27px] justify-between">
        <Skeleton className="w-[100px] h-[27px]" />
        <Skeleton className="w-[90px] h-[27px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;
