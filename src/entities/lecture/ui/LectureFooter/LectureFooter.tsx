"use client";

import { Button, IconButton, Skeleton, UnifiedDialog } from "@/shared/ui";
import { Dispatch, SetStateAction, useState } from "react";

import { Lecture } from "../../model/lecture";
import { getCookie } from "cookies-next";
import { sendGAEvent } from "@next/third-parties/google";
import { toast } from "sonner";
import useDeleteLikeLecture from "@/features/like/api/useDeleteLikeLecture";
import usePostLikeLecture from "@/features/like/api/usePostLikeLecture";
import { useRouter } from "next/navigation";

interface LectureFooterProps {
  lectureInfo: Lecture;
  isLoading: boolean;
  heart: boolean;
  setHeart: Dispatch<SetStateAction<boolean>>;
}

const LectureFooter = ({
  lectureInfo,
  isLoading,
  heart,
  setHeart,
}: LectureFooterProps) => {
  const [openApplyDialog, setOpenApplyDialog] = useState<boolean>(false);
  const [openApplyLoginDialog, setOpenApplyLoginDialog] =
    useState<boolean>(false);
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);

  const token = getCookie("accessToken");
  const router = useRouter();

  const postLikeLecture = usePostLikeLecture(lectureInfo ? lectureInfo.id : -1);
  const deleteLikeLecture = useDeleteLikeLecture(
    lectureInfo ? lectureInfo.id : -1,
  );

  const linkToApplyPage = (link: string) => {
    window.open(link);
  };

  const linkToHomePage = () => {
    router.push("/");
  };

  const linkToLogin = () => {
    router.push("/login");
  };

  const handleLikeLecture = () => {
    if (heart === true) {
      setHeart(false);
      deleteLikeLecture.mutate(
        {
          lectureId: lectureInfo.id,
        },
        {
          onSuccess: () => {},
          onError: () => {
            setHeart(true);
          },
        },
      );
    }
    if (heart === false) {
      setHeart(true);
      postLikeLecture.mutate(
        {
          lectureId: lectureInfo.id,
        },
        {
          onSuccess: () => {},
          onError: () => {
            setHeart(false);
          },
        },
      );
    }
  };

  const triggerLoginItem = () => {
    return heart ? (
      <IconButton
        src="/icons/like_filled.svg"
        alt="like_filled"
        iconWidth={32}
        iconHeight={32}
        handleClick={handleLikeLecture}
      />
    ) : (
      <IconButton
        src="/icons/like.svg"
        alt="heart"
        iconWidth={32}
        iconHeight={32}
        handleClick={handleLikeLecture}
      />
    );
  };

  const triggerItem = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center text-center desktop:w-[912px] tablet:w-[481px] mobile:w-[173px] max-w-[912px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] bg-custom-purple hover:bg-custom-hoverPurple text-white text-xl font-bold">
          신청하러 가기
        </div>
      </div>
    );
  };

  const notFoundApplyPageDialogContent = () => {
    return (
      <div className="flex flex-col items-center justify-center desktop:gap-[55px] tablet:gap-5 mobile:gap-5 desktop:pt-[35px] tablet:pt-5 mobile:pt-5">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[28px]">신청 페이지를</div>
          <div className="font-bold text-[28px]">불러오지 못했어요</div>
        </div>
        <div>
          <Button
            className="w-[260px] h-[52px] bg-custom-purple hover:bg-custom-hoverPurple text-base font-semibold rounded"
            onClick={linkToHomePage}
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  };

  const needLoginDialogContent = () => {
    return (
      <div className="flex flex-col desktop:gap-[55px] tablet:gap-5 mobile:gap-5 desktop:pt-[35px] tablet:pt-5 mobile:pt-5">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-xl content-center">
            로그인이 필요한
          </div>
          <div className="font-bold text-xl content-center">서비스에요</div>
        </div>
        <div className="flex items-center justify-center ">
          <Button
            className="desktop:w-[300px] tablet:w-[260px] mobile:w-[260px] h-[52px] text-base font-semibold bg-custom-purple hover:bg-custom-hoverPurple rounded"
            type="submit"
            onClick={linkToLogin}
          >
            회원가입 / 로그인 하기
          </Button>
        </div>
      </div>
    );
  };

  const renderLikeIcon = () => {
    if (!token) {
      return (
        <UnifiedDialog
          dialogTitle="로그인 오류"
          dialogDescription="로그인 오류 Dialog"
          triggerItem={triggerLoginItem()}
          dialogContent={needLoginDialogContent()}
          open={openLoginDialog}
          setOpen={setOpenLoginDialog}
        />
      );
    }

    if (token) {
      return triggerLoginItem();
    }
  };

  const renderApplyButton = () => {
    if (!token) {
      return (
        <UnifiedDialog
          open={openApplyLoginDialog}
          setOpen={setOpenApplyLoginDialog}
          triggerItem={triggerItem()}
          dialogTitle="로그인 필요"
          dialogDescription="로그인 필요"
          dialogContent={needLoginDialogContent()}
        />
      );
    }
    if (token && lectureInfo && lectureInfo.status === false) {
      return (
        <UnifiedDialog
          open={openApplyDialog}
          setOpen={setOpenApplyDialog}
          triggerItem={triggerItem()}
          dialogTitle="신청 페이지 불가"
          dialogDescription="신청 페이지 불가 설명"
          dialogContent={notFoundApplyPageDialogContent()}
        />
      );
    }
    if (lectureInfo && lectureInfo.link && token && lectureInfo.status) {
      return (
        <Button
          className="flex desktop:w-[912px] tablet:w-[481px] mobile:w-[173px] max-w-[912px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] bg-custom-purple hover:bg-custom-hoverPurple text-xl font-bold rounded-none"
          onClick={() => linkToApplyPage(lectureInfo.link)}
        >
          신청하러 가기
        </Button>
      );
    }
  };

  return (
    <div className="flex flex-row items-center w-full desktop:max-w-[1440px] tablet:max-w-[768px] mobile:max-w-[360px] desktop:h-[70px] tablet:h-[70px] mobile:h-[55px] desktop:px-[120px] bg-white fixed bottom-0 border-t desktop:border-l-0 tablet:border-l mobile:border-l border-custom-disabled z-[101]">
      <div className="flex desktop:w-[98px] tablet:min-w-[98px] mobile:min-w-[76px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] border-r border-custom-disabled justify-center items-center">
        {renderLikeIcon()}
      </div>
      {lectureInfo && (
        <div className="flex desktop:w-[190px] tablet:min-w-[190px] mobile:min-w-[111px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] justify-center items-center text-xl font-bold">
          {lectureInfo.price}
        </div>
      )}
      {renderApplyButton()}
    </div>
  );
};

export default LectureFooter;
