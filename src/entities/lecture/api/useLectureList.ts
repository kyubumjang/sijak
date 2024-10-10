import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GetLectureList } from "../model/lecture";
import { LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getLectureList } from ".";

const useLectureList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lectureListReq: GetLectureList["Request"]["body"]) =>
      getLectureList({
        payload: lectureListReq.payload,
        params: lectureListReq.params,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LECTURE_KEYS.lists() });
      // TODO: 무한 스크롤 처리하면서 queryKey 바꿔줘야됨
      queryClient.invalidateQueries({
        queryKey: LECTURE_KEYS.list({ page: 1, size: 10 }),
      });
    },
  });
};

export default useLectureList;
