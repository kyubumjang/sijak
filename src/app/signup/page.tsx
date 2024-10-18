"use client";

import {
  AgeRadioGroup,
  AgeRadioGroupItem,
  BackToPrevious,
  Button,
  InputLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import { InputLabelStatus } from "@/shared/ui/InputLabel/InputLabel";
import { UserServiceAgreeDialog } from "@/entities/user/ui";
import axios from "axios";
import { debounce } from "lodash";
import useGetRandomNickname from "@/entities/user/api/useGetRandomNickname";
import usePostNickname from "@/entities/user/api/usePostNickname";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/hooks/useToast";
import useValidateNickname from "@/entities/user/api/useValidateNickname";
import { userAgeList } from "@/entities/user/model/user";

type SignUpForm = {
  nickname: string;
  ageRange: string;
  gender: "남성" | "여성" | "";
};

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm<SignUpForm>();

  const [agree, setAgree] = useState<boolean>(false);
  const [status, setStatus] = useState<InputLabelStatus>("default");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const getRandomNickname = useGetRandomNickname();
  const validateNickname = useValidateNickname();
  const postNickname = usePostNickname();
  const { toast } = useToast();

  const makeRandomNickname = () => {
    getRandomNickname.mutate(undefined, {
      onSuccess: (data) => {
        setValue("nickname", data.data.data.nickname);
        validationCheckNickname(data.data.data.nickname);
      },
    });
  };

  const validationCheckNickname = useCallback(
    debounce((nickname: string) => {
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
    }, 500),
    [],
  );

  const handleChangeNickname = (nickname: string) => {
    validationCheckNickname(nickname);
  };

  const updateNickname: SubmitHandler<SignUpForm> = (data) => {
    postNickname.mutate(
      {
        nickname: data.nickname,
        age_range: data.ageRange,
        gender: data.gender,
      },
      {
        onSuccess: () => {
          toast({ title: "시ː작에 오신 걸 환영합니다." });
          router.push("/");
        },
      },
    );
  };

  useEffect(() => {
    makeRandomNickname();
  }, []);

  if (!agree) {
    return <UserServiceAgreeDialog setAgree={setAgree} />;
  }

  return (
    <div className="flex flex-col w-full desktop:h-[calc(100vh-70px)] tablet:h-[calc(100vh-70px)] justify-center items-center p-4 gap-12">
      <div className="desktop:hidden tablet:hidden mobile:flex absolute top-3 left-4">
        <BackToPrevious />
      </div>
      <div className="flex w-full flex-col desktop:justify-center tablet:justify-center mobile:justify-start desktop:items-center tablet:items-center mobile:items-start gap-2">
        <div className="text-custom-purple font-bold desktop:text-[40px] tablet:text-[28px] mobile:text-[28px] desktop:leading-[64px] tablet:leading-[44px] mobile:leading-[44px]">
          시ː작 할 수 있어요!
        </div>
        <div className="flex w-full flex-col desktop:justify-center tablet:justify-center mobile:justify-start desktop:items-center tablet:items-center mobile:items-start">
          <div className="flex text-custom-textGrayColor desktop:text-lg tablet:text-sm mobile:text-sm font-medium">
            닉네임과 기본 정보를 설정하면
          </div>
          <div className="flex text-custom-textGrayColor desktop:text-lg tablet:text-sm mobile:text-sm font-medium">
            맞춤형 클래스를 제공해 드려요🙂
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(updateNickname)}
        className="flex flex-col desktop:w-[400px] tablet:w-[312px] mobile:w-[312px]  desktop:gap-[60px] tablet:gap-[64px] mobile:gap-[147px]"
      >
        <div className="flex flex-col desktop:gap-[40px] tablet:gap-7 mobile:gap-7">
          <div className="flex flex-row desktop:h-[77px] tablet:h-[77px] mobile:h-[62px] gap-[14px]">
            <Controller
              name="nickname"
              control={control}
              defaultValue=""
              rules={{
                required: "닉네임은 필수로 작성해주셔야 해요.",
                minLength: {
                  value: 2,
                  message: "2자 ~ 12자까지 가능해요.",
                },
                maxLength: {
                  value: 12,
                  message: "닉네임은 최대 12자까지 설정 가능합니다.",
                },
              }}
              render={({ field }) => (
                <InputLabel
                  labelContent="닉네임 입력"
                  placeholder="2자 ~ 12자까지 가능해요."
                  error={!!errors.nickname}
                  onChange={(e) => {
                    field.onChange(e.target.value); // react-hook-form의 onChange 호출
                    handleChangeNickname(e.target.value); // 디바운스된 유효성 검사 호출
                  }}
                  onBlur={field.onBlur} // react-hook-form의 onBlur 호출
                  value={field.value} // field.value를 통해 입력값 전달
                  status={status}
                  required
                  message={errors.nickname?.message || message} // 메시지 처리
                />
              )}
            />
            <div className="flex items-end desktop:h-[77px] tablet:h-[67px] mobile:h-[62px]">
              <Button
                variant="ghost"
                type="button"
                className="desktop:w-[120px] tablet:w-[99px] mobile:w-[99px] desktop:h-14 tablet:h-[52px] mobile:h-[52px] bg-custom-buttonGrayBackground desktop:hover:bg-custom-divGrayBackground tablet:active:bg-custom-divGrayBackground mobile:active:bg-custom-divGrayBackground text-base font-semibold px-3 py-4 rounded-md"
                onClick={makeRandomNickname}
              >
                <div className="flex flex-row gap-1 mobile:text-sm">
                  <div className="desktop:w-6 tablet:w-6 mobile:w-5 desktop:h-6 tablet:h-6 mobile:h-5">
                    <Image
                      src="/icons/current_location.svg"
                      alt="random nickname"
                      width={24}
                      height={24}
                    />
                  </div>
                  딴거할래요
                </div>
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex desktop:text-base tablet:text-sm desktop:h-[21px] tablet:h-[18px] text-custom-purple">
              <div className="flex items-center w-fit relative">
                연령
                <div className="absolute top-1 right-[-8px]">
                  <Image
                    src="/icons/required.svg"
                    alt="required"
                    width={5}
                    height={5}
                  />
                </div>
              </div>
            </div>
            <Controller
              name="ageRange"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="desktop:w-[400px] tablet:w-[312px] mobile:w-[312px] desktop:h-14 tablet:h-[52px] mobile:h-[52px] desktop:text-xl tablet:text-base mobile:text-base data-[placeholder]:text-custom-textDescriptionGrayColor">
                    <SelectValue placeholder="연령을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userAgeList.map((userAge) => (
                        <SelectItem key={userAge} value={userAge} className="">
                          {userAge}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="desktop:text-base tablet:text-sm desktop:h-[21px] tablet:h-[18px] text-custom-purple">
              <div className="flex items-center w-fit relative">
                성별
                <div className="absolute top-1 right-[-8px]">
                  <Image
                    src="/icons/required.svg"
                    alt="required"
                    width={5}
                    height={5}
                  />
                </div>
              </div>
            </div>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <AgeRadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex flex-row gap-2">
                    <AgeRadioGroupItem
                      value="남성"
                      id="option-male"
                      className="desktop:w-[194px] tablet:w-[152px] mobile:w-[152px] desktop:h-14 tablet:h-[52px] mobile:h-[52px] rounded-sm border-none shadow-none font-semibold text-base"
                      content="남성"
                      checked={field.value === "남성"}
                    />
                    <AgeRadioGroupItem
                      value="여성"
                      id="option-female"
                      className="desktop:w-[194px] tablet:w-[152px] mobile:w-[152px] desktop:h-14 tablet:h-[52px] mobile:h-[52px] rounded-sm border-none shadow-none font-semibold text-base"
                      content="여성"
                      checked={field.value === "여성"}
                    />
                  </div>
                </AgeRadioGroup>
              )}
            />
          </div>
        </div>
        <Button
          className="flex justify-center items-center desktop:w-[400px] tablet:w-[312px] mobile:w-[312px] h-14 bg-custom-purple hover:bg-custom-hoverPurple rounded-sm"
          disabled={
            (!!errors.nickname && status !== "correct") ||
            status === "default" ||
            !watch("ageRange") ||
            !watch("gender")
          }
        >
          <div className="desktop:text-2xl tablet:text-base mobile:text-base text-center">
            시ː작 하기
          </div>
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
