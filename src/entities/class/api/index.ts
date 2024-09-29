import { Class } from "@/entities/class/model/class";
import apiRequest from "@/shared/api";

const BASE_PATH = "/class";
const API_BASE_PATH = "/lectures";

export const getClassList = () => apiRequest.get<Class[]>(`${BASE_PATH}`, {});

export const getClassInfo = (id: number) =>
  apiRequest.get<Class>(`${BASE_PATH}/${id}`, {});

export const getEntireClass = () =>
  apiRequest.get<{
    status: string;
    message: string;
    data: { data: Class[]; hasNext: boolean };
  }>(`${API_BASE_PATH}`, {});
