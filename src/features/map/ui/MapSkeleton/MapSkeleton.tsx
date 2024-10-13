import { Skeleton } from "@/shared/ui";

const MapSkeleton = () => {
  return (
    <div className="w-full h-[525px]">
      <Skeleton className="w-full h-[525px] rounded-lg" />
    </div>
  );
};

export default MapSkeleton;
