import apiRequest from "@/shared/api";

const BASE_PATH = "/userId";

export const postLogin = (payload: { payload: { code: string } }) =>
  apiRequest.post(`${BASE_PATH}`, payload);

// FIXME: 테스트 필요
export const getLoginUserInfo = () => apiRequest.get(`${BASE_PATH}`);
