import {
  GetHomeLectureList,
  GetLecture,
  GetLectureList,
  Lecture,
} from "@/entities/lecture/model/lecture";

import apiRequest from "@/shared/api";
import { getCookie } from "cookies-next";

const BASE_PATH = "/api/lectures";
const HOME_BASE_PATH = "/api/home";

const accessToken = getCookie("accessToken");

export const getLectureList = ({
  params,
  payload,
}: {
  params: GetLectureList["Request"]["body"]["params"];
  payload: GetLectureList["Request"]["body"]["payload"];
}) =>
  apiRequest.post<GetLectureList["Response"]>(`${BASE_PATH}`, payload, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    params,
  });

export const getHomeLectureList = ({
  params,
  payload,
}: {
  params: GetHomeLectureList["Request"]["body"]["params"];
  payload: GetHomeLectureList["Request"]["body"]["payload"];
}) =>
  apiRequest.post<GetHomeLectureList["Response"]>(
    `${HOME_BASE_PATH}`,
    payload,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      params,
    },
  );

export const getLectureInfo = ({
  lectureId,
  payload,
}: {
  lectureId: number;
  payload: GetLecture["Request"]["body"];
}) =>
  apiRequest.post<GetLecture["Response"]>(
    `${BASE_PATH}/${lectureId}`,
    payload,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );
