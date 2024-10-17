import { IconDialog, ImageDescription, Skeleton } from "@/shared/ui";

import Image from "next/image";
import { Lecture } from "@/entities/lecture/model/lecture";
import { handleCopyClipBoard } from "@/shared/lib/utils";
import { useToast } from "@/shared/hooks/useToast";

interface LectureInfoDetailHeaderProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureSummaryHeader = ({
  lectureInfo,
  isLoading,
}: LectureInfoDetailHeaderProps) => {
  const { toast } = useToast();

  const shareLinkToKakao = () => {
    // TODO: 카카오 링크 공유하기 API
  };

  const shareLinkToURL = () => {
    const currentUrl = window.location.href;
    handleCopyClipBoard(currentUrl);
    toast({
      title: "링크를 복사했어요",
    });
  };

  const renderDialogTriggerItem = () => {
    return (
      <div className="flex items-center justify-center cursor-pointer rounded p-1">
        <Image src="/icons/share.svg" alt="share" width={24} height={24} />
      </div>
    );
  };

  const renderDialogContent = () => {
    return (
      <div className="flex flex-row items-center justify-center py-[46px] gap-7">
        {/* <ImageDescription
          containerWidth={115}
          containerHeight={96}
          src="/icons/kakao.svg"
          alt="kakao logo"
          width={60}
          height={60}
          imageDescription="카카오톡 공유하기"
          handleClick={shareLinkToKakao}
        /> */}
        <ImageDescription
          containerWidth={115}
          containerHeight={96}
          src="/icons/copy_link.svg"
          alt="copy_link"
          width={60}
          height={60}
          imageDescription="링크 복사하기"
          handleClick={shareLinkToURL}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full desktop:h-[76px] tablet:h-[57px] mobile:h-[54px] gap-4">
      <div className="flex flex-row justify-between">
        {isLoading && <Skeleton className="w-[430px] h-[42px]" />}
        {lectureInfo && (
          <div className=" flex justify-start items-center desktop:text-[26px] tablet:text-xl mobile: text-xl desktop:w-[520px] tablet:w-[300px] mobile:w-[268px] desktop:text-ellipsis desktop:leading-[34px] tablet:text-ellipsis tablet:whitespace-normal tablet:break-words mobile:whitespace-normal mobile:break-words desktop:line-clamp-2 tablet:line-clamp-2 mobile:line-clamp-2 desktop:h-[76px] tablet:h-[56px] mobile:h-[54px] font-bold">
            {lectureInfo.name}
          </div>
        )}
        <div className="flex justify-center items-center">
          <IconDialog
            dialogTriggerItem={renderDialogTriggerItem()}
            dialogTitle="링크 공유"
            dialogDescription="링크 공유용 모달"
            renderItem={renderDialogContent()}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureSummaryHeader;
