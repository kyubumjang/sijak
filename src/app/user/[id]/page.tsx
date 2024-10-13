"use client";

import { BackToPrevious, Button, InputLabel, UnifiedDialog } from "@/shared/ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  LoginUserInfo,
  PatchUserAddress,
  userAgeMap,
} from "@/entities/user/model/user";
import { debounce, isEmpty } from "lodash";
import { useEffect, useState } from "react";

import Image from "next/image";
import { InputLabelStatus } from "@/shared/ui/InputLabel/InputLabel";
import { SquareLoader } from "react-spinners";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { toast } from "sonner";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import usePatchUserAddress from "@/entities/user/api/usePatchUserAddress";
import usePatchUserInfo from "@/entities/user/api/usePatchUserInfo";
import usePostLogout from "@/features/authentication/api/usePostLogout";
import { useRouter } from "next/navigation";
import useValidateNickname from "@/entities/user/api/useValidateNickname";

export const runtime = "edge";

type UserInfoForm = {
  nickname: string;
  address: string;
};

const UserInfoPage = () => {
  const [loginedUser, setLoginedUser] = useState<LoginUserInfo>({
    id: 0,
    email: "",
    nickname: "",
    gender: "male",
    age_range: "",
    birth: "",
    phone_number: "",
    latitude: 0,
    longitude: 0,
    location: "",
  });
  const [user, setUser] = useState<PatchUserAddress["Request"]["body"]>();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const router = useRouter();
  const geolocation = useGeoLocation();

  const { data, isLoading, isSuccess } = useGetLoginUserInfo();
  const postLogout = usePostLogout();

  const validateNickname = useValidateNickname();
  const patchUserAddress = usePatchUserAddress();
  const patchUserInfo = usePatchUserInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm<UserInfoForm>({
    defaultValues: {
      nickname: data?.data.data.nickname,
      address: data?.data.data.location,
    },
  });

  const [status, setStatus] = useState<InputLabelStatus>("default");
  const [message, setMessage] = useState<string>("");

  const validationCheckNickname = debounce((nickname: string) => {
    validateNickname.mutate(
      { nickname },
      {
        onSuccess: (data) => {
          const validateCheck = data.data;
          if (validateCheck && validateCheck.status === 200) {
            clearErrors("nickname"); // 유효성 검사 성공 시 에러 지우기
            setStatus("correct");
            setMessage("사용 가능한 닉네임입니다.");
          }
        },
        onError: (error) => {
          console.error(error);
          if (axios.isAxiosError(error)) {
            const errorMessage =
              error.response?.data?.message || "서버 오류가 발생했습니다.";
            setError("nickname", {
              type: "manual",
              message: errorMessage,
            });
            setStatus("error");
          } else {
            setError("nickname", {
              type: "manual",
              message: "알 수 없는 오류가 발생했습니다.",
            });
          }
        },
      },
    );
  }, 500);

  const handleChangeNickname = (nickname: string) => {
    validationCheckNickname(nickname);
  };

  const updateCurrentPosition = () => {
    if (user) {
      patchUserAddress.mutate(
        {
          latitude: user.latitude,
          longitude: user.longitude,
        },
        {
          onSuccess: (data) => {
            setValue("address", data.data.data.address);
          },
        },
      );
    }
  };

  const updateUserInfo: SubmitHandler<UserInfoForm> = (data) => {
    patchUserInfo.mutate(
      {
        address: data.address,
        nickname: data.nickname,
      },
      {
        onSuccess: () => {
          toast("유저 정보 업데이트가 성공적으로 됐어요.");
          window.location.reload();
        },
      },
    );
  };

  const logout = () => {
    postLogout.mutate(undefined, {
      onSuccess: () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        toast("로그아웃 성공");
        router.push("/");
      },
    });
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (data && isSuccess) {
      setLoginedUser(data.data.data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude
    ) {
      setUser((prev) => {
        return {
          ...prev,
          latitude: geolocation.curLocation
            ? geolocation.curLocation.latitude
            : 0,
          longitude: geolocation.curLocation
            ? geolocation.curLocation.longitude
            : 0,
        };
      });
    }
  }, [geolocation.curLocation]);

  const triggerItem = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center text-center  desktop:w-[400px] tablet:w-[400px] mobile:w-[260px] max-w-[400px] h-14 bg-white hover:bg-custom-buttonGrayBackground text-xl font-semibold border border-custom-disabled rounded-md">
          로그아웃
        </div>
      </div>
    );
  };

  const dialogContent = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-[69px]">
        <div className="text-xl font-semibold">로그아웃 하시겠어요?</div>
        <div className="flex flex-row gap-2.5">
          <div>
            <Button
              variant="outline"
              className="w-[125px] h-[52px] text-base font-semibold"
              onClick={() => setOpenLogoutDialog(false)}
            >
              취소
            </Button>
          </div>
          <div>
            <Button
              className="w-[125px] h-[52px] bg-custom-purple hover:bg-custom-hoverPurple text-base font-semibold"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <SquareLoader color="#4F118C" />
      </div>
    );
  }

  return (
    loginedUser && (
      <div className="flex flex-col w-full h-full justify-start items-star desktop:pt-[79px] tablet:pt-8 mobile:pt-6 desktop:gap-[50px] tablet:gap-5 desktop:pb-[323px] tablet:pb-[208px] mobile:pb-[73px] relative">
        <div className="desktop:hidden tablet:flex mobile:hidden absolute top-8 left-4">
          <BackToPrevious />
        </div>
        <div className="desktop:flex tablet:flex mobile:hidden flex-row justify-center items-center h-14 desktop:px-[120px] tablet:px-[184px] mobile:px-[50px]">
          <div className="desktop:text-[32px] tablet:text-[28px]">
            마이페이지
          </div>
        </div>
        <div className="flex flex-col justify-center items-center desktop:gap-6 tablet:gap-2 mobile:gap-2">
          <div className="flex flex-col desktop:gap-14 tablet:gap-5 mobile:gap-6">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col justify-center items-center gap-1">
                <div className="font-bold desktop:h-12 tablet:h-[42px] mobile:h-6 desktop:text-[32px] tablet:text-[28px] mobile:text-base leading-[42px]">
                  {loginedUser.nickname}님
                </div>
                {/* TODO: 연령대, 주소 조건문 처리 */}
                <div className="desktop:h-[33px] tablet:h-[30px] mobile:h-[21px] desktop:text-[22px] tablet:text-[20px] mobile:text-sm text-custom-textGrayColor">
                  {userAgeMap[loginedUser.age_range]}대, {loginedUser.location}
                </div>
              </div>
            </div>
            <form
              className="flex flex-col h-full desktop:gap-16 tablet:gap-16 mobile:gap-[42px]"
              onSubmit={handleSubmit(updateUserInfo)}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col desktop:w-[400px] tablet:w-[400px] mobile:w-[260px] gap-6">
                  <Controller
                    name="nickname"
                    control={control}
                    defaultValue={data?.data.data.nickname}
                    rules={{
                      required: "닉네임은 필수로 작성해주셔야 해요.",
                      minLength: {
                        value: 2,
                        message: "띄어쓰기 없이 2자 ~ 12자까지 가능해요.",
                      },
                      maxLength: {
                        value: 12,
                        message: "닉네임은 최대 12자까지 설정 가능합니다.",
                      },
                    }}
                    render={({ field }) => (
                      <InputLabel
                        labelContent="닉네임 입력"
                        placeholder="띄어쓰기 없이 2자 ~ 12자까지 가능해요."
                        error={!!errors.nickname}
                        onChange={(e) => {
                          field.onChange(e.target.value); // react-hook-form의 onChange 호출
                          handleChangeNickname(e.target.value); // 디바운스된 유효성 검사 호출
                        }}
                        onBlur={field.onBlur}
                        value={field.value}
                        status={status}
                        message={errors.nickname?.message || message} // 메시지 처리
                      />
                    )}
                  />
                  <div className="flex flex-row gap-4">
                    <Controller
                      name="address"
                      control={control}
                      defaultValue={data?.data.data.location}
                      render={({ field }) => (
                        <InputLabel
                          labelContent="지역"
                          placeholder={
                            loginedUser.location ? loginedUser.location : ""
                          }
                          onChange={(e) => {
                            field.onChange(e.target.value); // react-hook-form의 onChange 호출
                          }}
                          onBlur={field.onBlur}
                          value={field.value}
                        />
                      )}
                    />
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        type="button"
                        className="desktop:w-[112px] tablet:w-[112px] mobile:w-[92px] desktop:h-14 tablet:h-14 mobile:h-[41px] bg-custom-buttonGrayBackground hover:bg-custom-divGrayBackground text-base font-semibold px-3 py-4 rounded-md"
                        onClick={updateCurrentPosition}
                      >
                        <div className="flex flex-row gap-1 mobile:text-sm">
                          <div className="desktop:w-6 tablet:w-6 mobile:w-5 desktop:h-6 tablet:h-6 mobile:h-5">
                            <Image
                              src="/icons/current_location.svg"
                              alt="current_location"
                              width={24}
                              height={24}
                            />
                          </div>
                          현재 위치
                        </div>
                      </Button>
                    </div>
                  </div>
                  <InputLabel
                    labelContent="이메일"
                    placeholder={loginedUser.email}
                    disabled
                  />
                  <InputLabel
                    labelContent="휴대폰 번호"
                    placeholder={loginedUser.phone_number}
                    disabled
                  />
                  <InputLabel
                    labelContent="생년월일"
                    placeholder={loginedUser.birth}
                    disabled
                  />
                  <InputLabel
                    labelContent="성별"
                    placeholder={
                      loginedUser.gender === "male" ? "남성" : "여성"
                    }
                    disabled
                  />
                </div>
              </div>
              <div>
                <Button
                  disabled={
                    !isEmpty(errors.nickname) || !isEmpty(errors.address)
                  }
                  className="desktop:w-[400px] tablet:w-[400px] mobile:w-[260px] h-14 font-semibold text-2xl bg-custom-purple hover:bg-custom-hoverPurple rounded-md"
                >
                  저장하기
                </Button>
              </div>
            </form>
          </div>
          <div>
            <UnifiedDialog
              open={openLogoutDialog}
              setOpen={setOpenLogoutDialog}
              triggerItem={triggerItem()}
              dialogTitle="로그아웃 다이얼로그"
              dialogDescription="로그아웃 확인 다이얼로그"
              dialogContent={dialogContent()}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfoPage;
