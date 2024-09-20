"use client";

import {
  ArrowLeftIcon,
  HeartIcon,
  PersonIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { CiCalendar, CiFaceSmile } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";

import { Class } from "@/entities/class/model/class";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { MdOutlinePlace } from "react-icons/md";
import useClassInfo from "@/entities/class/api/useClassInfo";
import { useParams } from "next/navigation";

const ClassInfoPage = () => {
  const [classInfo, setClassInfo] = useState<Class>();
  const tempApplyStatus = true;

  const { id } = useParams();
  const { data, isLoading, isSuccess } = useClassInfo(Number(id));

  const handleClassDataList = useCallback(() => {
    if (data) {
      const classInfo = data;
      setClassInfo(classInfo);
    }
  }, [data]);
  const handleApply = (link: string) => {
    window.open(link);
  };

  useEffect(() => {
    if (isSuccess) {
      handleClassDataList();
    }
  }, [handleClassDataList, isSuccess]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    classInfo && (
      <div className="flex flex-col w-full h-full justify-start items-star">
        <div className="flex flex-row justify-between h-14 px-[120px]">
          <div className="flex absolute left-32">
            <Link href="/">
              <div className="flex flex-col items-center justify-center">
                <ArrowLeftIcon width={32} height={32} />
                <div className="text-xs">뒤로가기</div>
              </div>
            </Link>
          </div>
          <div />
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <Share1Icon width={24} height={24} />
              <div className="text-xs">공유</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row py-4 gap-4 px-[120px]">
          <div className="flex flex-1 object-cover rounded overflow-hidden">
            <Image
              src={classInfo.thumbnail}
              alt={classInfo.name}
              width={588}
              height={563}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm">안내사항</div>
              <div className="flex flex-row justify-between">
                <div className="flex justify-center items-center text-2xl font-bold">
                  {classInfo.name}
                </div>
                <div className="flex justify-center items-center">
                  <HeartIcon width={24} height={24} />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex gap-[3px]">
                <div>
                  <PersonIcon width={24} height={24} />
                </div>
                <div>인원</div>
              </div>
              <div>{classInfo.capacity}</div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex gap-[3px]">
                <div className="flex justify-center items-center">
                  <CiFaceSmile size={24} />
                </div>
                <div>주최</div>
              </div>
              <div>{classInfo.hosted_by}</div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex gap-[3px]">
                <div className="flex justify-center items-center">
                  <MdOutlinePlace size={24} />
                </div>
                <div>장소</div>
              </div>
              <div>{classInfo.location}</div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex gap-[3px]">
                <div className="flex justify-center items-center">
                  <CiCalendar size={24} />
                </div>
                <div>시간</div>
              </div>
              {/* FIXME */}
              <div>{classInfo.time}</div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex gap-[3px]">
                <div className="flex justify-center items-center">
                  <CiCalendar size={24} />
                </div>
                <div>일정</div>
              </div>
              {/* FIXME */}
              <div>매주 {classInfo.day_of_week}요일</div>
            </div>
            <div className="flex flex-row gap-6">
              <div>지도</div>
              <div className="flex flex-col gap-2">
                <div>{classInfo.location_detail}</div>
                <div>{classInfo.location}</div>
                <Button variant={"outline"} className="rounded-2xl">
                  지도 보기
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-[120px] pb-2 border-t pt-2">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-xl">클래스 정보</div>
            <div>{classInfo.description}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold text-xl">준비물</div>
            <div>준비물 소개</div>
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-100 px-[120px] fixed w-full bottom-0 ">
          <div className="flex flex-col items-center justify-center w-[32px] h-[58px]">
            <HeartIcon className="text-gray-600" width={24} height={24} />
            <div className="flex justify-center text-sm">찜</div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-lg">가격</div>
            <div className="font-bold text-lg">{classInfo.price}원</div>
          </div>
          <div>
            {classInfo.link && tempApplyStatus ? (
              <Button
                className="w-[300px]"
                onClick={() => handleApply(classInfo.link)}
              >
                신청하기
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger>
                  <div className="flex items-center justify-center ">
                    <Button className="w-[300px]">신청하기</Button>
                  </div>
                </DialogTrigger>
                <DialogPortal>
                  <DialogHeader>
                    <DialogTitle>마이페이지</DialogTitle>
                    <DialogDescription>마이페이지 설명</DialogDescription>
                  </DialogHeader>
                  <DialogContent>
                    <div className="flex flex-col gap-[60px]">
                      <div className="flex flex-col items-center justify-center gap-5">
                        <div className="text-gray-900 font-bold text-xl">
                          신청 페이지를 불러오지 못했습니다.
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ClassInfoPage;
