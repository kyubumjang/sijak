import Image from "next/image";
import { LectureImage } from "@/entities/lecture/model/lecture";
import { Skeleton } from "@/shared/ui";

export interface LectureDetailItemProps {
  title: string;
  content?: string;
  images?: LectureImage[];
}

const LectureDetailItem = ({
  title,
  content,
  images,
}: LectureDetailItemProps) => {
  return (
    <div className="flex flex-row gap-9">
      <div className="flex desktop:min-w-[72px] tablet:min-w-[62px] mobile:min-w-[60px] desktop:max-w-[72px] tablet:max-w-[62px] mobile:max-w-[60px] desktop:text-xl tablet:text-base text-custom-textTitleGrayColor break-keep">
        {title}
      </div>
      {content ? (
        <div className="flex desktop:text-xl tablet:text-base whitespace-pre-line">
          <div className="flex flex-col gap-[47px]">
            {content}
            {images &&
              title === "교육내용" &&
              images.map((image) => (
                <div key={image.id} className="w-auto h-auto">
                  <Image
                    src={image.url}
                    alt={`${image.id}`}
                    width={1200}
                    height={1000}
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Skeleton className="w-[280px] h-[42px]" />
      )}
    </div>
  );
};

export default LectureDetailItem;
