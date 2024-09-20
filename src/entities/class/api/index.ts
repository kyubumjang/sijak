import { Class } from "@/entities/class/model/class";
import apiRequest from "@/shared/api";

const BASE_PATH = "/class";

export const getClassList = () => apiRequest.get<Class[]>(`${BASE_PATH}`, {});

export const getClassInfo = (id: number) =>
  apiRequest.get<Class>(`${BASE_PATH}/${id}`, {});
