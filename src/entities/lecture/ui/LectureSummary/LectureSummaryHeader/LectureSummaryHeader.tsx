import { IconDialog, ImageDescription, Skeleton } from "@/shared/ui";

import Image from "next/image";
import { Lecture } from "@/entities/lecture/model/lecture";
import { handleCopyClipBoard } from "@/shared/lib/utils";

interface LectureInfoDetailHeaderProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureSummaryHeader = ({
  lectureInfo,
  isLoading,
}: LectureInfoDetailHeaderProps) => {
  const shareLinkToKakao = () => {
    // TODO: 카카오 링크 공유하기 API
  };

  const shareLinkToURL = () => {
    if (lectureInfo) {
      handleCopyClipBoard(lectureInfo.link);
    }
  };

  const renderDialogTriggerItem = () => {
    return (
      <div className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded p-1">
        <Image src="/icons/share.svg" alt="share" width={24} height={24} />
      </div>
    );
  };

  const renderDialogContent = () => {
    return (
      <div className="flex flex-row items-center justify-center py-[46px] gap-7">
        <ImageDescription
          containerWidth={115}
          containerHeight={96}
          src="/icons/kakao.svg"
          alt="kakao logo"
          width={60}
          height={60}
          imageDescription="카카오톡 공유하기"
          handleClick={shareLinkToKakao}
        />
        <ImageDescription
          containerWidth={115}
          containerHeight={96}
          src="/icons/Copy_link.svg"
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
    <div className="flex flex-col w-full desktop:h-[42px] tablet:h-57px gap-4">
      <div className="flex flex-row justify-between">
        {isLoading && <Skeleton className="w-[430px] h-[42px]" />}
        {lectureInfo && (
          <div className="flex justify-start items-center desktop:text-[26px] tablet:text-xl desktop:w-[430px] tablet:w-[300px] tablet:text-ellipsis tablet:whitespace-nowrap tablet:overflow-hidden h-[42px] font-bold">
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
