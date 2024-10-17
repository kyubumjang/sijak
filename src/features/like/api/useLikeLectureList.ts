import { GetHeartsLectureList } from "../model/like";
import { LIKE_LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getHeartsLectureList } from ".";
import { useQuery } from "@tanstack/react-query";

const useLikeLectureList = (
  params: GetHeartsLectureList["Request"]["query"]["params"],
) => {
  return useQuery({
    queryKey: LIKE_LECTURE_KEYS.list({
      page: params.page,
      size: params.size,
      mode: params.mode,
    }),
    queryFn: () => getHeartsLectureList(params),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Like Lecture List",
    },
  });
};

export default useLikeLectureList;
