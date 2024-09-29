import { Skeleton } from "@/shared/ui";

interface SkeletonCardProps {
  type: "row" | "col";
}

const SkeletonCard = (props: SkeletonCardProps) => {
  const { type } = props;

  return type === "col" ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-[384px] h-[310px] rounded-xl" />
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
    <div className="flex flex-row space-x-3">
      <Skeleton className="w-[180px] h-[210px] rounded-xl" />
      <div className="flex flex-col space-y-[18px] ">
        <div>
          <Skeleton className="w-[56px] h-[35px]" />
        </div>
        <div className="space-y-1">
          <Skeleton className="w-[300px] h-[36px]" />
          <Skeleton className="w-[368px] h-[28px]" />
        </div>
        <div className="flex flex-row w-[336px] h-[27px] justify-between">
          <Skeleton className="w-[100px] h-[27px]" />
          <Skeleton className="w-[90px] h-[27px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
