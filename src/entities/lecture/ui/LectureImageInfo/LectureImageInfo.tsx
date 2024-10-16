"use client";

import { Button, UnifiedDialog } from "@/shared/ui";
import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";
import { Lecture } from "../../model/lecture";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import useDeleteLikeLecture from "@/features/like/api/useDeleteLikeLecture";
import usePostLikeLecture from "@/features/like/api/usePostLikeLecture";
import { useRouter } from "next/navigation";

interface LectureImageInfoProps {
  lectureInfo: Lecture;
  isLoading: boolean;
  heart: boolean;
  setHeart: Dispatch<SetStateAction<boolean>>;
}

const LectureImageInfo = ({
  lectureInfo,
  isLoading,
  heart,
  setHeart,
}: LectureImageInfoProps) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredFilled, setIsHoveredFilled] = useState(true);

  const postLikeLecture = usePostLikeLecture(lectureInfo ? lectureInfo.id : -1);
  const deleteLikeLecture = useDeleteLikeLecture(
    lectureInfo ? lectureInfo.id : -1,
  );

  const router = useRouter();
  const token = getCookie("accessToken");

  const handleLikeLecture = () => {
    if (!token) {
      setOpenLoginDialog(true);
      return;
    }
    if (lectureInfo) {
      if (heart === true) {
        setHeart(false);
        deleteLikeLecture.mutate(
          {
            lectureId: lectureInfo.id,
          },
          {
            onSuccess: () => {
              toast("찜한 클래스를 삭제했어요");
            },
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
            onSuccess: () => {
              toast("클래스를 찜 했어요");
            },
            onError: () => {
              setHeart(false);
            },
          },
        );
      }
    }
  };

  const linkToLogin = () => {
    setOpenLoginDialog(false);
    router.push("/login");
  };

  const calculateDDay = () => {
    if (lectureInfo.d_day === 0) {
      return `오늘 마감`;
    }
    if (lectureInfo.d_day > 0) {
      return `${lectureInfo.d_day}일 지남`;
    }
    if (lectureInfo.d_day < 0) {
      return `${Math.abs(lectureInfo.d_day)}일 남음`;
    }
  };

  const triggerItem = () => {
    return (
      <div
        className="absolute desktop:top-5 tablet:top-3 mobile:top-3 desktop:right-5 tablet:right-3 mobile:right-3"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[36px] desktop:h-[32px] tablet:h-[24px] mobile:h-[24px] bg-transparent hover:bg-transparent"
          onClick={() => handleLikeLecture()}
        >
          {heart ? (
            <Image
              src={
                isHoveredFilled ? "/icons/like_filled.svg" : "/icons/like.svg"
              }
              alt="heart"
              width={36}
              height={36}
            />
          ) : (
            <Image
              src={isHovered ? "/icons/like_filled.svg" : "/icons/like.svg"}
              alt="heart filled"
              width={36}
              height={36}
            />
          )}
        </Button>
      </div>
    );
  };

  const dialogContent = () => {
    return (
      <div className="flex flex-col gap-[55px] desktop:pt-[35px] tablet:pt-5 mobile:pt-5">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[28px] content-center">
            로그인이 필요한
          </div>
          <div className="font-bold text-[28px] content-center">서비스에요</div>
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

  return (
    <div className="relative flex flex-col desktop:w-[588px] tablet:w-[330px] mobile:w-[312px] desktop:h-[588px] tablet:h-[330px] mobile:h-[316px] rounded-lg  overflow-hidden">
      {lectureInfo && (
        <div className="absolute desktop:top-5 tablet:top-3 mobile:top-3 desktop:left-5 tablet:left-3 mobile:left-3 w-16 h-[34px] content-center text-center text-white text-base font-semibold rounded bg-custom-purple">
          {lectureInfo.category && lectureInfo.category !== "미정"
            ? lectureInfo.category
            : "문화"}
        </div>
      )}
      {lectureInfo && (
        <div className="absolute desktop:top-5 tablet:top-3 mobile:top-3 left-[80px] w-[79px] h-[34px] content-center text-center text-white text-base font-semibold rounded bg-custom-textSemiBoldBlackColor">
          {calculateDDay()}
        </div>
      )}
      <UnifiedDialog
        dialogTitle="로그인 오류"
        dialogDescription="로그인 오류 Dialog"
        triggerItem={triggerItem()}
        dialogContent={dialogContent()}
        open={openLoginDialog}
        setOpen={setOpenLoginDialog}
      />
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
