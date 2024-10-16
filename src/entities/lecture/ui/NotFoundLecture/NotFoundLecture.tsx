import Image from "next/image";

interface NotFoundLectureProps {
  isHideIcon?: boolean;
  description?: string;
}

const NotFoundLecture = ({
  isHideIcon = false,
  description = "이용에 불편을 드려 죄송합니다.",
}: NotFoundLectureProps) => {
  return (
    <div className="flex flex-col items-center justify-center desktop:w-full tablet:w-full mobile:w-[180px] h-full gap-[6px] pt-[173px]">
      <div className="">
        {!isHideIcon && (
          <Image
            src="/icons/x_circle.svg"
            alt="x_circle"
            width={40}
            height={40}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-[18px]">
        <div className="flex items-center justify-center desktop:flex-row tablet:flex-row mobile:flex-col desktop:gap-2 tablet:gap-1.5 mobile:gap-0">
          <div className="desktop:text-[32px] tablet:text-2xl mobile:text-2xl leading-[51px] font-bold">
            클래스가
          </div>
          <div className="desktop:text-[32px] tablet:text-2xl mobile:text-2xl leading-[51px] font-bold">
            존재하지 않습니다.
          </div>
        </div>
        <div className="desktop:text-lg tablet:text-sm mobile:text-sm text-custom-textGrayColor font-medium">
          {description}
        </div>
      </div>
    </div>
  );
};

export default NotFoundLecture;
