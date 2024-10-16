import { Input } from "..";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputLabelProps {
  labelContent: string;
  placeholder: string;
  disabled?: boolean;
  status?: InputLabelStatus;
  type?: string;
  message?: string;
  value?: string;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange 핸들러 추가
  onBlur?: () => void; // onBlur 핸들러 추가
}

export type InputLabelStatus = "default" | "correct" | "error";

const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
  (
    {
      labelContent,
      placeholder,
      value,
      disabled,
      status = "default",
      type = "text",
      message,
      error,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const containerClassName = () => {
      return "flex flex-col w-full gap-2";
    };

    const labelColor = () => {
      if (disabled) {
        return "text-custom-textSemiBoldBlackColor";
      }
      return "text-custom-purple";
    };

    const borderColor = () => {
      if (disabled) {
        return "border-custom-disabled";
      }
      if (status === "error") {
        return "border-custom-error";
      }
      if (status === "correct") {
        return "border-custom-correct";
      }
      return "border-custom-purple";
    };

    const textColor = () => {
      if (status === "error") {
        return "text-custom-error";
      }

      if (status === "correct") {
        return "text-custom-correct";
      }
    };

    return (
      <div className={containerClassName()}>
        <div className="flex flex-col w-full">
          <div
            className={twMerge(
              "desktop:text-base tablet:text-sm desktop:h-[21px] tablet:h-[18px]",
              labelColor(),
            )}
          >
            {labelContent}
          </div>
          <div className={twMerge(`flex w-full border-b-2`, borderColor())}>
            <Input
              type={type}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              className="desktop:text-xl tablet:text-base desktop:h-14 tablet:h-11 border-none shadow-none focus-visible:ring-0 tablet:px-0 mobile:px-0"
              onChange={onChange}
              onBlur={onBlur} // onBlur 호출
              ref={ref}
            />
          </div>
        </div>
        <div className={twMerge("flex w-full text-base", textColor())}>
          {message} {/* 오류 메시지 표시 */}
        </div>
      </div>
    );
  },
);

InputLabel.displayName = "InputLabel";

export default InputLabel;
