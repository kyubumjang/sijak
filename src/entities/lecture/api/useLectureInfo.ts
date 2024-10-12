import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GetLecture } from "../model/lecture";
import { LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getLectureInfo } from ".";

const useLectureInfo = (lectureId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lectureId,
      payload,
    }: {
      lectureId: number;
      payload: GetLecture["Request"]["body"];
    }) =>
      getLectureInfo({
        lectureId: lectureId,
        payload: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LECTURE_KEYS.detail({ lectureId }),
      });
    },
  });
};

export default useLectureInfo;
