import { Button, Skeleton } from "@/shared/ui";

import Image from "next/image";
import { Lecture } from "../../model/lecture";
import { toast } from "sonner";
import useDeleteLikeLecture from "@/features/like/api/useDeleteLikeLecture";
import usePostLikeLecture from "@/features/like/api/usePostLikeLecture";

interface LectureImageInfoProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureImageInfo = ({
  lectureInfo,
  isLoading,
}: LectureImageInfoProps) => {
  const postLikeLecture = usePostLikeLecture(lectureInfo ? lectureInfo.id : -1);
  const deleteLikeLecture = useDeleteLikeLecture(
    lectureInfo ? lectureInfo.id : -1,
  );

  const handleLikeLecture = () => {
    if (lectureInfo) {
      // TODO: 좋아요 API TEST 필요
      if (lectureInfo.heart === true) {
        deleteLikeLecture.mutate(
          {
            lectureId: lectureInfo.id,
          },
          {
            onSuccess: () => {
              toast("좋아요 삭제 성공");
            },
          },
        );
      }
      if (lectureInfo.heart === false) {
        postLikeLecture.mutate(
          {
            lectureId: lectureInfo.id,
          },
          {
            onSuccess: () => {
              toast("좋아요 성공");
            },
          },
        );
      }
    }
  };

  return (
    <div className="relative flex flex-col desktop:w-[588px] tablet:w-[330px] mobile:w-[312px] desktop:h-[588px] tablet:h-[330px] mobile:h-[316px] rounded-lg  overflow-hidden">
      {lectureInfo && (
        <div className="absolute top-5 left-5 w-16 h-[34px] content-center text-center text-white text-base font-semibold rounded bg-custom-purple">
          문화
        </div>
      )}
      {/* TODO: 몇 일 남았는지 계산하는 로직 필요 */}
      {lectureInfo && (
        <div className="absolute top-5 left-[88px] w-[79px] h-8 content-center text-center text-white text-base font-semibold rounded bg-custom-textSemiBoldBlackColor">
          7일 남음
        </div>
      )}
      {lectureInfo && (
        <div className="absolute top-5 right-5">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center desktop:w-[32px] tablet:w-[24px] mobile:w-[24px] desktop:h-[32px] tablet:h-[24px] mobile:h-[24px]"
            onClick={() => handleLikeLecture()}
          >
            {lectureInfo.heart ? (
              <Image
                src="/icons/like_filled.svg"
                alt="heart"
                width={32}
                height={32}
              />
            ) : (
              <Image
                src="/icons/like.svg"
                alt="heart filled"
                width={32}
                height={32}
              />
            )}
          </Button>
        </div>
      )}
      {isLoading && (
        <Skeleton className="desktop:w-[588px] tablet:w-[330px] desktop:h-[588px] tablet:h-[330px]" />
      )}
      {lectureInfo && (
        <Image
          src={lectureInfo.thumbnail}
          alt={lectureInfo.name}
          width={588}
          height={588}
          className="w-[588px] h-[588px] object-cover"
        />
      )}
    </div>
  );
};

export default LectureImageInfo;
