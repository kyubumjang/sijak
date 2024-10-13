import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GetLectureListDto } from "../model/lecture";
import { HOME_LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getHomeLectureList } from ".";

const useHomeLectureList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lectureListReq: GetLectureListDto) =>
      getHomeLectureList({
        payload: lectureListReq.payload,
        params: lectureListReq.params,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_LECTURE_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: HOME_LECTURE_KEYS.list({ page: 1, size: 10 }),
      });
    },
  });
};

export default useHomeLectureList;
