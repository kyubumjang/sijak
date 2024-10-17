import { Skeleton } from "@/shared/ui";

const MapSkeleton = () => {
  return (
    <div className="w-full desktop:h-[460px] tablet:h-[420px] mobile:h-[420px]">
      <Skeleton className="w-full desktop:h-[460px] tablet:h-[420px] mobile:h-[420px] rounded-lg" />
    </div>
  );
};

export default MapSkeleton;
