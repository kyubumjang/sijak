"use client";

import { useEffect, useState } from "react";

import { Button } from "../../Button";
import Image from "next/image";
import Link from "next/link";
import { LoginUserInfo } from "@/entities/user/model/user";
import { UnifiedDialog } from "../../UnifiedDialog";
import { getCookie } from "cookies-next";
import useLoginedUserStore from "@/shared/store/user";
import { useRouter } from "next/navigation";

const HeaderFeatures = () => {
  const [loginedUser, setLoginedUser] = useState<LoginUserInfo>();
  const [openLike, setOpenLike] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const router = useRouter();

  const { loginedUser: loginedUserInfo } = useLoginedUserStore();

  const accessToken = getCookie("accessToken");

  const handleOpenLikeDialog = () => {
    setOpenLike(true);
  };

  const handleOpenUserDialog = () => {
    setOpenUser(true);
  };

  const linkToLogin = () => {
    setOpenLike(false);
    setOpenUser(false);
    router.push("/login");
  };

  useEffect(() => {
    if (loginedUserInfo) {
      setLoginedUser(loginedUserInfo);
    }
  }, [loginedUserInfo]);

  const dialogContent = () => {
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
    if (loginedUser && loginedUserInfo && accessToken) {
      return (
        <div>
          <Link href="/like">
            <div className="flex flex-col items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[36px] desktop:h-[43px] tablet:h-[43px] mobile:h-[25px]">
              <div className="flex items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[24px] desktop:h-[25px] tablet:h-[25px] mobile:h-[24px]">
                <Image
                  src={"/icons/heart_default.svg"}
                  alt="heart-icons"
                  width={32}
                  height={25}
                />
              </div>
              <div className="desktop:flex tablet:flex mobile:hidden items-center justify-center text-sm text-custom-textDescriptionGrayColor">
                찜
              </div>
            </div>
          </Link>
        </div>
      );
    }
    return (
      <UnifiedDialog
        dialogTitle="로그인 오류"
        dialogDescription="로그인 오류 Dialog"
        triggerItem={
          <div
            className="flex flex-col items-center justify-center w-[36px] h-[43px] cursor-pointer"
            onClick={handleOpenLikeDialog}
          >
            <div className="flex items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[24px] desktop:h-[25px] tablet:h-[25px] mobile:h-[24px]">
              <Image
                src={"/icons/heart_default.svg"}
                alt="heart-icons"
                width={32}
                height={32}
              />
            </div>
            <div className="desktop:flex tablet:flex mobile:hidden items-center justify-center text-sm text-custom-textDescriptionGrayColor">
              찜
            </div>
          </div>
        }
        dialogContent={dialogContent()}
        open={openLike}
        setOpen={setOpenLike}
      />
    );
  };

  const renderUserIcon = () => {
    if (
      loginedUser &&
      loginedUserInfo &&
      loginedUserInfo.nickname &&
      accessToken
    ) {
      return (
        <div>
          <Link href={`/user/${loginedUser.nickname}`}>
            <div className="flex flex-col items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[36px] desktop:h-[43px] tablet:h-[43px] mobile:h-[25px]">
              <div className="flex items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[24px] desktop:h-[25px] tablet:h-[25px] mobile:h-[24px]">
                <Image
                  src={"/icons/user_default.svg"}
                  alt="user-icons"
                  width={32}
                  height={32}
                />
              </div>
              <div className="desktop:flex tablet:flex mobile:hidden items-center justify-center text-sm text-custom-textDescriptionGrayColor">
                마이
              </div>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <UnifiedDialog
        dialogTitle="로그인 오류"
        dialogDescription="로그인 오류 알림"
        triggerItem={
          <div
            className="flex flex-col items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-6 desktop:h-[43px] tablet:h-[43px] mobile:h-6"
            onClick={handleOpenUserDialog}
          >
            <div className="flex items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[24px] desktop:h-[25px] tablet:h-[25px] mobile:h-[24px]">
              <Image
                src={"/icons/user_default.svg"}
                alt="user-icons"
                width={32}
                height={32}
              />
            </div>
            <div className="desktop:flex tablet:flex mobile:hidden items-center justify-center text-sm text-custom-textDescriptionGrayColor">
              마이
            </div>
          </div>
        }
        dialogContent={dialogContent()}
        open={openUser}
        setOpen={setOpenUser}
      />
    );
  };

  return (
    <div className="flex flex-row desktop:items-center tablet:items-center mobile:items-center desktop:justify-center tablet:justify-center mobile:justify-end desktop:gap-5 tablet:gap-5 mobile:gap-0 mobile:min-w-[80px] desktop:h-[43px] tablet:h-[43px] mobile:h-[25px]">
      {renderLikeIcon()}
      {renderUserIcon()}
    </div>
  );
};

export default HeaderFeatures;
