import { GetLectureList } from "../model/lecture";
import { HOME_LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getHomeLectureList } from ".";
import { useQuery } from "@tanstack/react-query";

const useHomeLectureList = (params: GetLectureList["Request"]["query"]) => {
  return useQuery({
    queryKey: HOME_LECTURE_KEYS.list({ page: params.page, size: params.size }),
    queryFn: () => getHomeLectureList({ params }),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Home Lecture List",
    },
  });
};

export default useHomeLectureList;
