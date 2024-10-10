import { Payload } from "@/shared/model/api";

export interface AccessToken {
  is_new: boolean;
  tokenDTO: KakaoTokenType;
}

export interface KakaoTokenType {
  grant_type: "Bearer";
  access_token: string;
  refresh_token: string;
}

export interface GetAccessTokenDto {
  code: string;
}

export interface GetAccessTokenRes {
  data: AccessToken;
  message: string;
  status: string;
}

export type GetAccessToken = Payload<
  undefined,
  GetAccessTokenDto,
  undefined,
  GetAccessTokenRes
>;

export interface ITokens {
  accessToken: string;
}

export type BearerAccessTokenHeader = {
  Authorization: ITokens["accessToken"];
};

export interface PostLogoutRes {
  status: number;
  message: string;
  data: string;
}

export type PostLogout = Payload<
  undefined,
  undefined,
  undefined,
  PostLogoutRes
>;
