"use client";

import { Button, InputLabel } from "@/shared/ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import { InputLabelStatus } from "@/shared/ui/InputLabel/InputLabel";
import { UserServiceAgreeDialog } from "@/entities/user/ui";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "sonner";
import usePostNickname from "@/entities/user/api/usePostNickname";
import { useRouter } from "next/navigation";
import useValidateNickname from "@/entities/user/api/useValidateNickname";

type SignUpForm = {
  nickname: string;
};

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignUpForm>();

  const [agree, setAgree] = useState<boolean>(false);
  const [status, setStatus] = useState<InputLabelStatus>("default");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const validateNickname = useValidateNickname();
  const postNickname = usePostNickname();

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
      { nickname: data.nickname },
      {
        onSuccess: (data) => {
          toast("닉네임이 성공적으로 업데이트됐어요");
          router.push("/");
        },
      },
    );
  };

  if (!agree) {
    return <UserServiceAgreeDialog setAgree={setAgree} />;
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-70px)] justify-center items-center p-4 gap-12">
      <div className="flex w-full flex-col justify-center items-center gap-2">
        <div className="text-custom-textBlackColor font-bold desktop:text-[40px] tablet:text-[28px] mobile:text-[28px] desktop:leading-[64px] tablet:leading-[44px] mobile:leading-[44px]">
          닉네임을 적어주세요!
        </div>
        <div className="flex w-full flex-col justify-center items-center">
          <div className="text-custom-textGrayColor desktop:text-lg tablet:text-sm mobile:text-sm font-medium">
            시ː작에서 사용할 닉네임을 적어주세요.
          </div>
          <div className="text-custom-textGrayColor desktop:text-lg tablet:text-sm mobile:text-sm font-medium">
            닉네임은 나중에 수정할 수 있어요.
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(updateNickname)}
        className="flex flex-col desktop:w-[400px] tablet:w-[260px] mobile:w-[260px]  desktop:gap-[72px] tablet:gap-[60px] mobile:gap-10"
      >
        <Controller
          name="nickname"
          control={control}
          defaultValue=""
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
              onBlur={field.onBlur} // react-hook-form의 onBlur 호출
              value={field.value} // field.value를 통해 입력값 전달
              status={status}
              message={errors.nickname?.message || message} // 메시지 처리
            />
          )}
        />
        <Button
          className="flex justify-center items-center desktop:w-[400px] tablet:w-[260px] mobile:w-[260px] h-14 bg-custom-purple hover:bg-custom-hoverPurple rounded-sm"
          disabled={
            (!!errors.nickname && status !== "correct") || status === "default"
          } // 오류가 있을 경우 버튼 비활성화
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
