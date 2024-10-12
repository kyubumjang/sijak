import { BearerAccessTokenHeader } from "@/features/authentication/model/token";
import { Payload } from "@/shared/model/api";

export interface LoginUserInfo {
  id: number;
  birth: string;
  email: string;
  gender: "male" | "female";
  age_range: string;
  location: string;
  nickname: string;
  phone_number: string;
  latitude: number;
  longitude: number;
}

export interface GetLoginUserInfoRes {
  data: LoginUserInfo;
  message: string;
  status: string;
}

export type GetLoginUserInfo = Payload<
  BearerAccessTokenHeader,
  undefined,
  undefined,
  GetLoginUserInfoRes
>;

export interface ValidateNicknameParams {
  nickname: string;
}
export interface ValidateNicknameRes {
  status: number;
  message: string;
  data: string;
}

export type ValidateNickname = Payload<
  BearerAccessTokenHeader,
  ValidateNicknameParams,
  undefined,
  ValidateNicknameRes
>;

export interface PostNicknameRes {
  status: number;
  message: string;
  data: string;
}

export type PostNickname = Payload<
  BearerAccessTokenHeader,
  ValidateNicknameParams,
  undefined,
  PostNicknameRes
>;

export interface PatchUserAddressDto {
  latitude: number;
  longitude: number;
}

export interface PatchUserAddressData {
  address: string;
}

export interface PatchUserAddressRes {
  status: number;
  message: string;
  data: PatchUserAddressData;
}

export type PatchUserAddress = Payload<
  BearerAccessTokenHeader,
  undefined,
  PatchUserAddressDto,
  PatchUserAddressRes
>;

export interface PatchUserInfoDto {
  nickname: string;
  address: string;
}

export interface PatchUserInfoRes {
  status: number;
  message: string;
  data: string;
}

export type PatchUserInfo = Payload<
  BearerAccessTokenHeader,
  undefined,
  PatchUserInfoDto,
  PatchUserInfoRes
>;

export const userAgeMap: Record<string, number> = {
  "10~19": 10,
  "20~29": 20,
  "30~39": 30,
  "40~49": 40,
  "50~59": 50,
  "60~69": 60,
  "70~79": 70,
  "80~89": 80,
  "90~99": 90,
};
