"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Divider,
  Skeleton,
} from "@/shared/ui";
import { useCallback, useEffect, useState } from "react";

import { Class } from "@/entities/class/model/class";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import MiniMap from "@/features/map/ui/MiniMap/MiniMap";
import { toast } from "sonner";
import useClassInfo from "@/entities/class/api/useClassInfo";
import { useParams } from "next/navigation";

export const runtime = "edge";

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

  // TODO: 로직 유틸 함수로 옮기기
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("링크를 복사했어요.");
    } catch (err) {
      console.log(err);
    }
  };

  const shareLinkToKakao = () => {
    // TODO: 카카오 링크 공유하기
  };
  const shareLinkToURL = () => {
    if (data) {
      handleCopyClipBoard(data.link);
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-start gap-[60px]">
      <div className="flex flex-row w-full py-4 gap-11 px-[120px]">
        <div className="relative flex flex-col desktop:w-[588px] tablet:w-[400px] h-[635px] rounded-xl overflow-hidden">
          {classInfo && (
            <div className="absolute top-3 left-3 w-16 h-16 content-center text-center text-white font-bold rounded-full bg-[#4F118C]">
              문화
            </div>
          )}
          {classInfo && (
            <div className="absolute top-3 right-3 w-[79px] h-8 content-center text-center text-white font-semibold rounded-lg bg-[#171717]">
              7일 남음
            </div>
          )}
          {/* TODO: 몇 일 남았는지 계산하는 로직 필요 */}
          {isLoading && <Skeleton className="w-[588px] h-[588px]" />}
          {classInfo && (
            <Image
              src={classInfo.thumbnail}
              alt={classInfo.name}
              width={588}
              height={588}
              className="w-[588px] h-[588px] object-cover"
            />
          )}
          <div className="flex flex-row desktop:w-[588px] tablet:w-[400px] h-[47px] items-center gap-[2.5px] bg-[#4F118C] pl-5">
            <div>
              <Image
                src="/icons/map_pin.svg"
                alt="map_pin"
                width={22}
                height={22}
              />
            </div>
            {/* TODO: 거리 계산 */}
            {isLoading && <Skeleton className="w-[356px] h-[28px] z-10" />}
            {classInfo && (
              <div className="w-full text-white text-lg font-semibold">
                내 위치에서 1.1km ∙ 대중교통 약 10분 이내
              </div>
            )}
          </div>
        </div>
        {/* 정보 div */}
        {/* TODO: 컴포넌트화 */}
        <div className="flex flex-col w-full h-full desktop:w-[588px] tablet:w-[400px] max-w-[608px] max-h-[635px] gap-[13px]">
          <div className="flex flex-col w-full h-[42px] gap-2">
            <div className="flex flex-row gap-7">
              {isLoading && <Skeleton className="w-[430px] h-[42px]" />}
              {classInfo && (
                <div className="flex justify-start items-center text-2xl desktop:w-[430px] tablet:w-[300px] tablet:text-ellipsis tablet:whitespace-nowrap tablet:overflow-hidden h-[42px] font-bold">
                  {classInfo.name}
                </div>
              )}
              <div className="flex justify-center items-center gap-7">
                {/* TODO: 좋아요 API */}
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Image
                    src="/icons/heart.svg"
                    alt="heart"
                    width={27}
                    height={24}
                  />
                </Button>
                {/* TODO:  공유하기 */}
                <Dialog>
                  <DialogTrigger>
                    <div className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded p-1">
                      <Image
                        src="/icons/share.svg"
                        alt="share"
                        width={27}
                        height={24}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogHeader>
                      <DialogTitle>링크 공유</DialogTitle>
                      <DialogDescription>링크 공유용 모달</DialogDescription>
                    </DialogHeader>
                    <DialogContent>
                      <div className="flex flex-row items-center justify-center py-[102px] gap-5">
                        {/* TODO: 컴포넌트 화 */}
                        <div
                          className="flex flex-col items-center justify-center w-[180px] h-[96px] gap-3 cursor-pointer"
                          onClick={shareLinkToKakao}
                        >
                          <Image
                            src="/icons/kakao.svg"
                            alt="kakao logo"
                            width={60}
                            height={60}
                          />
                          <div className="text-gray-500 text-center text-base font-semibold">
                            카카오톡 공유하기
                          </div>
                        </div>
                        <div
                          className="flex flex-col items-center justify-center w-[180px] h-[96px] gap-3 cursor-pointer"
                          onClick={shareLinkToURL}
                        >
                          <Image
                            src="/icons/Copy_link.svg"
                            alt="copy_link"
                            width={60}
                            height={60}
                          />
                          <div className="text-gray-500 text-center text-base font-semibold">
                            링크 복사하기
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="flex flex-col desktop:w-[588px] desktop:h-[580px]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                  <Image
                    src="/icons/person.svg"
                    alt="person"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-[38px] text-[#737373] text-[22px]">
                    인원
                  </div>
                </div>
                {isLoading && <Skeleton className="w-[280px] h-[42px]" />}
                {classInfo && (
                  <div className="desktop:max-w-[476px] tablet:max-w-[300px] text-[22px]">
                    정원 {classInfo.capacity}명
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                  <Image
                    src="/icons/hosted_by.svg"
                    alt="hosted_by"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-[38px] text-[#737373] text-[22px]">
                    주최
                  </div>
                </div>
                {isLoading && <Skeleton className="w-[150px] h-[33px]" />}
                {classInfo && (
                  <div className="text-[22px]">{classInfo.hosted_by}</div>
                )}
              </div>
              <div className="flex flex-row gap-5">
                {/* TODO: type 수정 */}
                <div className="flex flex-row justify-center items-center gap-2">
                  <Image
                    src="/icons/user_circle.svg"
                    alt="user_circle"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-[38px] text-[#737373] text-[22px]">
                    구분
                  </div>
                </div>
                {isLoading && <Skeleton className="w-[100px] h-[33px]" />}
                {classInfo && (
                  <div className="desktop:max-w-[476px] tablet:max-w-[300px] text-[22px] whitespace-nowrap">
                    {classInfo.target}
                  </div>
                )}
              </div>
              {/* TODO: type 수정 */}
              <div className="flex flex-row gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                  <Image
                    src="/icons/calendar_filled.svg"
                    alt="calendar"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-[38px] text-[#737373] text-[22px]">
                    기간
                  </div>
                </div>
                {isLoading && <Skeleton className="w-[212px] h-[33px]" />}
                {classInfo && (
                  <div className="text-[22px]">{classInfo.time}</div>
                )}
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                  <Image
                    src="/icons/time.svg"
                    alt="time"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-[38px] text-[#737373] text-[22px]">
                    시간
                  </div>
                </div>
                {isLoading && <Skeleton className="w-[270px] h-[33px]" />}
                {classInfo && (
                  <div className="text-[22px]">
                    {classInfo.day_of_week}요일 {classInfo.time}
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                  <Image
                    src="/icons/price.svg"
                    alt="price"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-[38px] text-[#737373] text-[22px]">
                    가격
                  </div>
                </div>
                {isLoading && <Skeleton className="w-[90px] h-[33px]" />}
                {classInfo && (
                  <div className="text-[22px]">
                    {classInfo.price.toLocaleString("ko-KR")}원
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                  <Image
                    src="/icons/location.svg"
                    alt="location"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-[38px] text-[#737373] text-[22px]">
                    장소
                  </div>
                </div>
                {isLoading && <Skeleton className="w-[300px] h-[33px]" />}
                {classInfo && (
                  <div className="text-[22px]">{classInfo.location_detail}</div>
                )}
              </div>
            </div>
          </div>
          {isLoading && <Skeleton className="w-[568px] h-[256px]" />}
          {classInfo && (
            <div>
              <MiniMap
                latitude={classInfo.latitude}
                longitude={classInfo.longitude}
              />
            </div>
          )}
        </div>
      </div>
      {/* TODO */}
      <div className="flex flex-col w-full px-[120px] pb-[349px] gap-[140px]">
        <div className="flex flex-col w-full gap-[30px]">
          <div className="font-bold desktop:w-full h-[70px] text-[28px] border-b">
            클래스 내용
          </div>
          <div className="flex flex-col gap-7">
            {/* TODO: 컴포넌트화 */}
            <div className="flex flex-row gap-9">
              <div className="flex min-w-[72px] text-xl text-[#797979]">
                수강자격
              </div>
              {isLoading && <Skeleton className="w-[90px] h-[28px]" />}
              {classInfo && (
                <div className="flex text-xl">{classInfo.target}</div>
              )}
            </div>
            <Divider />
            <div className="flex flex-row gap-9">
              <div className="flex min-w-[72px] text-xl text-[#797979]">
                교육내용
              </div>
              {isLoading && <Skeleton className="w-[698px] h-[28px]" />}
              {classInfo && (
                <div className="flex text-xl">{classInfo.description}</div>
              )}
            </div>
            <Divider />
            <div className="flex flex-row gap-9">
              <div className="flex min-w-[72px] max-w-[72px] text-xl text-[#797979]">
                자격증 관련사항
              </div>
              {isLoading && <Skeleton className="w-[698px] h-[28px]" />}
              {classInfo && (
                <div className="flex text-xl">{classInfo.description}</div>
              )}
            </div>
            <Divider />
            <div className="flex flex-row gap-9">
              <div className="flex min-w-[72px] text-xl text-[#797979]">
                교재명
              </div>
              {isLoading && <Skeleton className="w-[698px] h-[28px]" />}
              {classInfo && (
                <div className="flex text-xl">{classInfo.description}</div>
              )}
            </div>
            <Divider />
            <div className="flex flex-row gap-9">
              <div className="flex min-w-[72px] text-xl text-[#797979]">
                교재비
              </div>
              {isLoading && <Skeleton className="w-[82px] h-[28px]" />}
              {classInfo && (
                <div className="flex text-xl">
                  {`${classInfo.price.toLocaleString("ko-KR")}원`}
                </div>
              )}
            </div>
            <Divider />
            <div className="flex flex-row gap-9">
              <div className="flex min-w-[72px] text-xl text-[#797979]">
                재료비
              </div>
              {isLoading && <Skeleton className="w-[82px] h-[28px]" />}
              {classInfo && (
                <div className="flex text-xl">
                  {`${classInfo.price.toLocaleString("ko-KR")}원`}
                </div>
              )}
            </div>
            <Divider />
            <div className="flex flex-row gap-9">
              <div className="flex min-w-[72px] text-xl text-[#797979]">
                준비물
              </div>
              {isLoading && <Skeleton className="w-[698px] h-[28px]" />}
              {classInfo && (
                <div className="flex text-xl">{classInfo.description}</div>
              )}
            </div>
            <Divider />
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="font-bold desktop:w-full tablet:w-[600px] h-[70px] text-[28px] border-b">
            강사 이력
          </div>
          {/* TODO: 강사 이력 정보 */}
          {isLoading && <Skeleton className="w-[698px] h-[148px]" />}
          {classInfo && (
            <div className="flex flex-col gap-1">
              <div className="flex w-[52px] h-8 font-bold text-xl">양옥연</div>
              <div className="flex flex-col h-full text-xl">
                <span>
                  &#8226; POP디자인기사, 아동예쁜글씨지도자, 초크POP지도자,
                  북아트지도자 자격취득
                </span>
                <span>
                  &#8226; 사)한국문화예술가협회 회장 글작(글씨작가그룹) 대표
                </span>
                <span>&#8226; 도서출판 아름답게사는 우리가 꽃이다 대표</span>
                <span>&#8226; 인스타: @johaegrim / 유튜브: 조해그림글씨</span>
              </div>
            </div>
          )}
        </div>
        <div className="font-bold desktop:w-full h-[70px] text-[28px] border-b">
          <div className="font-bold text-[28px] gap-4">교육 계획</div>
          {/* {isLoading && <Skeleton className="w-[698px] h-[148px]" />} */}
          {classInfo && <div></div>}
        </div>
      </div>
      {/* TODO: 컴포넌트 화, 하단 바 */}
      <div className="flex flex-row w-full h-[92px] items-center px-[120px] bg-white drop-shadow fixed bottom-0 gap-[42px] overflow-x-hidden z-10">
        <div className="flex w-16 h-[50px] border-r border-gray-400 justify-center items-center">
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center content-center w-[32px] h-[32px] hover:bg-gray-200"
          >
            <Image
              src="/icons/heart.svg"
              alt="heart"
              width={27}
              height={24}
              className="text-gray-400"
            />
          </Button>
        </div>
        {isLoading && <Skeleton className="w-[100px] h-[33px]" />}
        {classInfo && (
          <div className="flex w-[106px] h-[33px] justify-center items-center font-bold text-[22px] font-extrabold">
            {classInfo.price.toLocaleString("ko-KR")}원
          </div>
        )}
        {isLoading && (
          <Skeleton className="desktop:w-[917px] tablet:w-[560px] h-[56px]" />
        )}
        {classInfo && (
          <div>
            {classInfo.link && tempApplyStatus ? (
              <Button
                className="flex desktop:w-[917px] tablet:w-[560px] mobile:w-[200px]  max-w-[917px] h-14 bg-[#4F118C] text-[22px] font-semibold"
                onClick={() => handleApply(classInfo.link)}
              >
                신청하러 가기
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger>
                  <div className="flex items-center justify-center">
                    <Button className="flex desktop:w-[917px] tablet:w-[560px] mobile:w-[200px]  max-w-[917px] h-14 bg-[#4F118C] text-[22px] font-semibold">
                      신청하러 가기
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogPortal>
                  <DialogHeader>
                    <DialogTitle>마이페이지</DialogTitle>
                    <DialogDescription>마이페이지 설명</DialogDescription>
                  </DialogHeader>
                  <DialogContent>
                    <div className="flex flex-col items-center justify-center gap-[9px]">
                      <div className="flex flex-col items-center justify-center">
                        <div className="font-bold text-[28px]">
                          신청 페이지를
                        </div>
                        <div className="font-bold text-[28px]">
                          불러오지 못했습니다.
                        </div>
                      </div>
                      <div className="text-base text-[#737373]">
                        {/* TODO: 문구 확인 */}
                        데이터가 만료되거나 이용 완료되어 불러오지 못했습니다.
                      </div>
                      <div>
                        {/* TODO: router.push(home) */}
                        <Button className="w-[410px] h-14 bg-[#4F118C] hover:bg-purple-950 text-2xl font-semibold">
                          목록으로 돌아가기
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassInfoPage;
