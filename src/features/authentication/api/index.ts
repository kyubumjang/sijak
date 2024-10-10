import { GetAccessToken, PostLogout, PostLogoutRes } from "../model/token";

import apiRequest from "@/shared/api";
import { getCookie } from "cookies-next";

const BASE_PATH = "/login/callback";
const LOGOUT_BASE_PATH = "/api/logout";

export const getAccessToken = (code: string) =>
  apiRequest.get<GetAccessToken["Response"]>(`${BASE_PATH}`, {
    params: { code },
  });

export const postLogout = () =>
  apiRequest.post<PostLogout["Response"]>(
    `${LOGOUT_BASE_PATH}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );
