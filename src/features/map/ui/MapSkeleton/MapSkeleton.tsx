import { Skeleton } from "@/shared/ui";

const MapSkeleton = () => {
  return (
    <div className="w-[1200px] h-[525px]">
      <Skeleton className="w-[1200px] h-[525px] rounded-xl" />
    </div>
  );
};

export default MapSkeleton;
