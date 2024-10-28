"use client";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import usePostUserAgree from "../../api/usePostUserAgree";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserServiceAgreeDialogProps {
  setAgree: Dispatch<SetStateAction<boolean>>;
}

export type UserServiceAgreeFormEnum =
  | "allAgree"
  | "serviceAgree"
  | "personalInformationAgree"
  | "locationBasedServiceAgree"
  | "marketingAgree";

export type UserServiceAgreeForm = {
  allAgree: boolean;
  serviceAgree: boolean;
  personalInformationAgree: boolean;
  locationBasedServiceAgree: boolean;
  marketingAgree?: boolean;
};

const agreeItems = [
  { id: "allAgree", label: "약관 전체 동의", externalLink: "" },
  {
    id: "serviceAgree",
    label: "[필수] 서비스 이용 약관",
    externalLink:
      "https://www.notion.so/b942a4f9070442b7891cb136037ffa74?pvs=4",
  },
  {
    id: "personalInformationAgree",
    label: "[필수] 개인정보 처리방침",
    externalLink:
      "https://www.notion.so/6d012c4a80f845eca3d98defc11d6d86?pvs=4",
  },
  {
    id: "locationBasedServiceAgree",
    label: "[필수] 위치정보 이용약관",
    externalLink:
      "https://www.notion.so/17e92e6c1188429cb17ad92d84f65103?pvs=4",
  },
  {
    id: "marketingAgree",
    label: "[선택] 시작의 광고와 마케팅 메시지를 카카오톡으로 받습니다",
    externalLink: "",
  },
] as const;

const FormSchema = z.object({
  agreeItems: z
    .array(z.string())
    .refine((value) => value.includes("serviceAgree"), {
      message: "서비스 이용 약관에 동의해야 합니다.",
    })
    .refine((value) => value.includes("personalInformationAgree"), {
      message: "개인정보 처리방침에 동의해야 합니다.",
    })
    .refine((value) => value.includes("locationBasedServiceAgree"), {
      message: "위치기반 서비스에 동의해야 합니다.",
    }),
});

const UserServiceAgreeDialog = ({ setAgree }: UserServiceAgreeDialogProps) => {
  const [openUserAgreeDialog, setOpenUserAgreeDialog] = useState<boolean>(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      agreeItems: [],
    },
  });

  const postUserAgree = usePostUserAgree();

  const agreeAndStartService: SubmitHandler<{ agreeItems: string[] }> = (
    data: z.infer<typeof FormSchema>,
  ) => {
    if (data.agreeItems) {
      postUserAgree.mutate(
        {
          agreeItems: data.agreeItems,
        },
        {
          onSuccess: () => {
            setAgree(true);
          },
        },
      );
    }
  };
  const isError = form.formState.errors.agreeItems?.message;
  const isDisabled =
    !form.getValues("agreeItems").includes("serviceAgree") ||
    !form.getValues("agreeItems").includes("personalInformationAgree") ||
    !form.getValues("agreeItems").includes("locationBasedServiceAgree");

  const handleAllAgreeChange = (checked: boolean) => {
    const allAgreeItems = checked ? agreeItems.map((item) => item.id) : [];
    form.setValue("agreeItems", allAgreeItems);
  };

  const handleIndividualChange = (
    itemId: string,
    checked: string | boolean,
  ) => {
    const currentValues = form.getValues("agreeItems");
    let newValues;

    // 체크박스 상태 업데이트
    if (checked) {
      newValues = [...currentValues, itemId];
    } else {
      newValues = currentValues.filter((value) => value !== itemId);
    }

    form.setValue("agreeItems", newValues);

    // 전체 동의 체크박스 상태 업데이트
    const allChecked = agreeItems
      .filter((item) => item.id !== "allAgree") // "allAgree" 제외
      .every((item) => newValues.includes(item.id));

    if (allChecked) {
      form.setValue("agreeItems", [...newValues, "allAgree"]);
    } else {
      form.setValue(
        "agreeItems",
        newValues.filter((value) => value !== "allAgree"),
      );
    }
  };

  const marketingAgreeClassName = (id: UserServiceAgreeFormEnum) => {
    if (id === "marketingAgree") {
      return "items-start";
    }
  };

  return (
    <Dialog open={openUserAgreeDialog} onOpenChange={setOpenUserAgreeDialog}>
      <DialogTrigger asChild>
        <div></div>
      </DialogTrigger>
      <DialogContent
        className=""
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        hideCloseButton
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            <div className="flex flex-col items-start justify-start gap-1">
              <div>서비스를 시작하기 위해</div>
              <div>동의가 필요해요</div>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="pt-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(agreeAndStartService)}
              className="flex flex-col gap-7"
            >
              <FormField
                control={form.control}
                name="agreeItems"
                render={() => (
                  <FormItem>
                    <div className="flex flex-row items-center justify-start gap-1">
                      <FormControl>
                        <div className="flex items-center justify-center w-6 h-6">
                          <Checkbox
                            id={"allAgree"}
                            checked={form
                              .watch("agreeItems")
                              .includes("allAgree")}
                            onCheckedChange={handleAllAgreeChange}
                            className="w-[18px] h-[18px] rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormLabel
                        htmlFor="allAgree"
                        className={twMerge(
                          "text-base font-semibold",
                          isError && "text-custom-textBlackColor",
                        )}
                      >
                        약관 전체 동의
                      </FormLabel>
                    </div>
                    <Divider className="my-[18px]" />
                    {agreeItems.map(
                      (item) =>
                        item.id !== "allAgree" && (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="agreeItems"
                            render={({ field }) => {
                              return (
                                <div>
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center justify-between"
                                  >
                                    <div
                                      className={twMerge(
                                        "flex items-center justify-center gap-1",
                                        marketingAgreeClassName(item.id),
                                      )}
                                    >
                                      <FormControl>
                                        <div className="flex items-center justify-center w-6 h-6">
                                          <div className="flex items-center justify-center h-full">
                                            <Checkbox
                                              id={item.id}
                                              checked={field.value?.includes(
                                                item.id,
                                              )}
                                              onCheckedChange={(checked) => {
                                                handleIndividualChange(
                                                  item.id,
                                                  checked,
                                                );
                                              }}
                                              className="w-[18px] h-[18px] rounded-full"
                                            />
                                          </div>
                                        </div>
                                      </FormControl>
                                      <FormLabel
                                        htmlFor={item.id}
                                        className={twMerge(
                                          "flex items-center desktop:max-w-[251px] tablet:max-w-[206px] mobile:max-w-[206px] text-sm font-medium",
                                          isError &&
                                            !field.value.includes(item.id) &&
                                            item.id !== "marketingAgree"
                                            ? "text-custom-error"
                                            : "text-custom-textBlackColor",
                                        )}
                                      >
                                        {item.label}
                                      </FormLabel>
                                    </div>
                                    {item.externalLink && (
                                      <div>
                                        <Link
                                          href={item.externalLink}
                                          target="_blank"
                                        >
                                          <Image
                                            src="/icons/agree_arrow_right.svg"
                                            alt="agree_arrow_right"
                                            width={20}
                                            height={20}
                                          />
                                        </Link>
                                      </div>
                                    )}
                                  </FormItem>
                                </div>
                              );
                            }}
                          />
                        ),
                    )}
                    <FormMessage
                      className={
                        isError
                          ? "text-custom-error"
                          : "text-custom-textBlackColor"
                      }
                    />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="flex w-full h-[52px] bg-custom-purple hover:bg-custom-hoverPurple rounded-sm"
                  disabled={isDisabled}
                >
                  동의하고 시작하기
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserServiceAgreeDialog;
