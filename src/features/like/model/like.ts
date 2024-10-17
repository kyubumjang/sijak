// Hearts

import { BearerAccessTokenHeader } from "@/features/authentication/model/token";
import { LectureSize } from "@/entities/lecture/model/lecture";
import { Payload } from "@/shared/model/api";

export interface HeartsLectureListResDataInfo {
  id: number;
  thumbnail: string;
  name: string;
  time: string;
  target: string;
  status: boolean;
  latitude: number;
  longitude: number;
  address: string;
  long_address: string;
  short_address: string;
  link: string;
  heart: boolean;
  start_date: string;
  end_date: string;
  day_of_week: string;
  hosted_by: string | null;
  division: string;
}

// TODO: 타입 중복되는 것 리팩토링 => 제네릭으로 처리
export interface HeartsLectureListResData {
  data: HeartsLectureListResDataInfo[];
  hasNext: boolean;
}

export interface LikeLectureParams extends LectureSize {
  mode: boolean;
}

export interface GetHeartsLectureListDto {
  params: LikeLectureParams;
}

export interface GetHeartsLectureListRes {
  data: HeartsLectureListResData;
  message: string;
  status: string;
}

export type GetHeartsLectureList = Payload<
  undefined,
  GetHeartsLectureListDto,
  undefined,
  GetHeartsLectureListRes
>;

// Like Lecture

export interface LikeLectureQueryParams {
  lectureId: number;
}

export interface LikeLectureQuery {
  params: LikeLectureQueryParams;
}

export interface LikeLectureRes {
  status: number;
  message: string;
  data: string;
}

export type LikeLecture = Payload<
  undefined,
  LikeLectureQuery,
  undefined,
  LikeLectureRes
>;

export interface DeactivatesLikeLectureRes {
  status: number;
  message: string;
  data: string;
}

export type DeactivatesLikeLecture = Payload<
  BearerAccessTokenHeader,
  undefined,
  undefined,
  DeactivatesLikeLectureRes
>;
