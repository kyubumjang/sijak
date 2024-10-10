import Image from "next/image";
import { Lecture } from "@/entities/lecture/model/lecture";
import MiniMap from "@/features/map/ui/MiniMap/MiniMap";
import { Skeleton } from "@/shared/ui";

interface LectureMinimapProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureMinimap = (props: LectureMinimapProps) => {
  const { lectureInfo, isLoading } = props;

  if (isLoading) {
    return (
      <Skeleton className="desktop:w-[572px] tablet:w-[704px] mobile:w-[312px] desktop:h-[186px] tablet:h-[228px] rounded overflow-hidden" />
    );
  }
  return (
    lectureInfo && (
      <div className="desktop:w-[572px] tablet:w-[704px] mobile:w-[312px] desktop:h-[186px] tablet:h-[228px] mobile:h-[144px] rounded overflow-hidden">
        <MiniMap
          latitude={lectureInfo.latitude}
          longitude={lectureInfo.longitude}
        />
        <div className="flex flex-row desktop:w-[572px] tablet:w-[400px] mobile:w-[312px] desktop:h-[43px] tablet:h-[43px] mobile:h-[22px] items-center gap-[2.5px] bg-custom-purple desktop:pl-5 tablet:pl-5 mobile:pl-[15px]">
          <div>
            <Image
              src="/icons/map_pin.svg"
              alt="map_pin"
              width={24}
              height={24}
              className="desktop:w-[22px] tablet:w-[22px] mobile:w-[22px] desktop:h-[22px]"
            />
          </div>
          {isLoading && <Skeleton className="w-[356px] h-[28px] z-10" />}
          <div className="w-full text-white desktop:text-lg tablet:text-lg mobile:text-sm font-semibold">
            내 위치에서 {lectureInfo.distance} ∙{lectureInfo.estimatedTime}분
            이내
          </div>
        </div>
      </div>
    )
  );
};

export default LectureMinimap;
