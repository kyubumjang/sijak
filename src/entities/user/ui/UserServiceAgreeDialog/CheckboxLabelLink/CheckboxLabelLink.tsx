import { Checkbox, Label } from "@/shared/ui";
import {
  UserServiceAgreeForm,
  UserServiceAgreeFormEnum,
} from "../UserServiceAgreeDialog";

import { FormEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface CheckboxLabelLinkProps {
  checkboxId: UserServiceAgreeFormEnum;
  labelContent: string;
  externalLink: string;
  labelClassName?: string;
  register: UseFormRegister<UserServiceAgreeForm>;
  handleChange?: FormEventHandler<HTMLButtonElement>;
  required?: boolean;
}

const CheckboxLabelLink = ({
  checkboxId,
  labelContent,
  externalLink,
  labelClassName,
  register,
  required,
  handleChange,
}: CheckboxLabelLinkProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-start justify-center gap-1">
        <div className="flex items-center justify-center w-6 h-6">
          <div className="flex items-center justify-center">
            <Checkbox
              id={checkboxId}
              className="w-[18px] h-[18px] rounded-full"
              {...register(checkboxId, { required })}
              onChange={handleChange}
            />
          </div>
        </div>
        <Label
          htmlFor={checkboxId}
          className={twMerge(
            "flex items-center desktop:max-w-[251px] tablet:max-w-[206px] mobile:max-w-[206px] text-sm font-medium",
            labelClassName,
          )}
        >
          <div className="flex items-center justify-center content-center">
            {labelContent}
          </div>
        </Label>
      </div>
      {externalLink && (
        <div>
          <Link href={externalLink} target="_blank">
            <Image
              src="/icons/agree_arrow_right.svg"
              alt="agree_arrow_right"
              width={20}
              height={20}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckboxLabelLink;
