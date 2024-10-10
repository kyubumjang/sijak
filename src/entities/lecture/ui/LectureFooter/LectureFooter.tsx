"use client";

import { Button, IconButton, Skeleton, UnifiedDialog } from "@/shared/ui";

import Image from "next/image";
import { Lecture } from "../../model/lecture";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import useDeleteLikeLecture from "@/features/like/api/useDeleteLikeLecture";
import usePostLikeLecture from "@/features/like/api/usePostLikeLecture";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LectureFooterProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureFooter = ({ lectureInfo, isLoading }: LectureFooterProps) => {
  const [open, setOpen] = useState<boolean>(false);
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
    if (lectureInfo) {
      // TODO: 좋아요 API TEST
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

  const triggerItem = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center text-center desktop:w-[912px] tablet:w-[481px] mobile:w-[173px] max-w-[912px] h-[69px] bg-custom-purple hover:bg-purple-900 text-white text-xl font-bold">
          신청하러 가기
        </div>
      </div>
    );
  };

  const notFoundApplyPageDialogContent = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-[55px] pt-[30px] pb-5">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[28px]">신청 페이지를</div>
          <div className="font-bold text-[28px]">불러오지 못했어요</div>
        </div>
        <div>
          <Button
            className="w-[260px] h-[52px] bg-custom-purple hover:bg-purple-950 text-base font-semibold rounded"
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
      <div className="flex flex-col gap-[55px] pt-[30px] pb-5">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[28px] content-center">
            로그인이 필요한
          </div>
          <div className="font-bold text-[28px] content-center">서비스에요</div>
        </div>
        <div className="flex items-center justify-center ">
          <Button
            className="w-[300px] h-[52px] text-base font-semibold bg-custom-purple rounded"
            type="submit"
            onClick={linkToLogin}
          >
            회원가입 / 로그인 하기
          </Button>
        </div>
      </div>
    );
  };

  const renderApplyButton = () => {
    if (lectureInfo && lectureInfo.link && token) {
      return (
        <Button
          className="flex desktop:w-[912px] tablet:w-[481px] mobile:w-[173px] max-w-[912px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] bg-custom-purple text-xl font-bold rounded-none"
          onClick={() => linkToApplyPage(lectureInfo.link)}
        >
          신청하러 가기
        </Button>
      );
    }
    if (!token) {
      return (
        <UnifiedDialog
          open={open}
          setOpen={setOpen}
          triggerItem={triggerItem()}
          dialogTitle="로그인 필요"
          dialogDescription="로그인 필요"
          dialogContent={needLoginDialogContent()}
        />
      );
    }
    if (!token && lectureInfo && lectureInfo.status === false) {
      return (
        <UnifiedDialog
          open={open}
          setOpen={setOpen}
          triggerItem={triggerItem()}
          dialogTitle="신청 페이지 불가"
          dialogDescription="신청 페이지 불가 설명"
          dialogContent={notFoundApplyPageDialogContent()}
        />
      );
    }
  };

  return (
    <div className="flex flex-row items-center w-full desktop:h-[70px] tablet:h-[70px] mobile:h-[55px] desktop:px-[120px] bg-white fixed bottom-0 border-t border-custom-disabled overflow-x-hidden z-10">
      <div className="flex desktop:w-[98px] tablet:min-w-[98px] mobile:min-w-[76px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] border-r border-custom-disabled justify-center items-center">
        {lectureInfo && lectureInfo.heart === true ? (
          <IconButton
            src="/icons/like_filled.svg"
            alt="like_filled"
            iconWidth={32}
            iconHeight={32}
            handleClick={handleLikeLecture}
          />
        ) : (
          <IconButton
            src="/icons/heart.svg"
            alt="heart"
            iconWidth={32}
            iconHeight={32}
            handleClick={handleLikeLecture}
          />
        )}
      </div>
      {isLoading && <Skeleton className="w-[100px] h-[33px]" />}
      {lectureInfo && (
        <div className="flex desktop:w-[190px] tablet:min-w-[190px] mobile:min-w-[111px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] justify-center items-center text-xl font-bold">
          {lectureInfo.price}
        </div>
      )}
      {isLoading && (
        <Skeleton className="desktop:w-[917px] tablet:w-[560px] h-[56px]" />
      )}
      {renderApplyButton()}
    </div>
  );
};

export default LectureFooter;
