import { Class } from "@/entities/class/model/class";
import apiRequest from "@/shared/api";

const BASE_PATH = "/likeClass";

export const getClassList = () => apiRequest.get<Class[]>(`${BASE_PATH}`, {});
