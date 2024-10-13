import { GetLocationLectureList } from "../model/lecture";
import { LOCATION_LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getLocationLectureList } from ".";
import { useQuery } from "@tanstack/react-query";

const useLocationLectureList = ({
  params,
}: {
  params: GetLocationLectureList["Request"]["query"];
}) => {
  return useQuery({
    queryKey: LOCATION_LECTURE_KEYS.list({
      page: params.page,
      size: params.size,
      location: params.location,
    }),
    queryFn: () => getLocationLectureList({ params }),
    select: (response) => response,
    meta: {
      errorMessage: "Failed to fetch Location Lecture List",
    },
  });
};

export default useLocationLectureList;
