import {
  DeactivatesLikeLecture,
  GetHeartsLectureList,
  LikeLecture,
} from "../model/like";

import apiRequest from "@/shared/api";
import { getCookie } from "cookies-next";

// TODO: Lecture
const BASE_PATH = "/api/hearts";

export const getHeartsLectureList = (
  params: GetHeartsLectureList["Request"]["query"]["params"],
) =>
  apiRequest.get<GetHeartsLectureList["Response"]>(`${BASE_PATH}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    params,
  });

export const postLikeLecture = ({
  params,
}: {
  params: LikeLecture["Request"]["query"]["params"];
}) =>
  apiRequest.post<LikeLecture["Response"]>(
    `${BASE_PATH}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      params,
    },
  );

export const deleteLikeLecture = ({
  params,
}: {
  params: LikeLecture["Request"]["query"]["params"];
}) =>
  apiRequest.delete<LikeLecture["Response"]>(`${BASE_PATH}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    params,
  });

export const deleteDeactivatesLikeLecture = () =>
  apiRequest.delete<DeactivatesLikeLecture["Response"]>(
    `${BASE_PATH}/deactivates`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );
