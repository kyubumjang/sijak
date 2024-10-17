import {
  GetLoginUserInfo,
  GetRandomNickname,
  PatchUserAddress,
  PatchUserInfo,
  PostNickname,
  PostUserAgree,
  ValidateNickname,
} from "../model/user";

import apiRequest from "@/shared/api";
import { getCookie } from "cookies-next";

const BASE_PATH = "/api/mypage";
const NICKNAME_BASE_PATH = "/api/nickname";
const AGREE_BASE_PATH = "/api/agree";

// FIXME: 테스트 필요
export const getLoginUserInfo = () =>
  apiRequest.get<GetLoginUserInfo["Response"]>(`${BASE_PATH}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

export const patchUserAddress = (
  payload: PatchUserAddress["Request"]["body"],
) =>
  apiRequest.patch<PatchUserAddress["Response"]>(
    `${BASE_PATH}/address`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );

export const patchUserInfo = (payload: PatchUserInfo["Request"]["body"]) =>
  apiRequest.patch<PatchUserInfo["Response"]>(`${BASE_PATH}`, payload, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

export const validateNickname = (
  params: ValidateNickname["Request"]["query"],
) =>
  apiRequest.post<ValidateNickname["Response"]>(
    `${NICKNAME_BASE_PATH}/validate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      params,
    },
  );

export const postNickname = (payload: PostNickname["Request"]["body"]) =>
  apiRequest.post<PostNickname["Response"]>(`${NICKNAME_BASE_PATH}`, payload, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

export const getRandomNickname = () =>
  apiRequest.get<GetRandomNickname["Response"]>(
    `${NICKNAME_BASE_PATH}/random`,
    {},
  );

export const postUserAgree = (payload: PostUserAgree["Request"]["body"]) =>
  apiRequest.post<PostUserAgree["Response"]>(`${AGREE_BASE_PATH}`, payload, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
