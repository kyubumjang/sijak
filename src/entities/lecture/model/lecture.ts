import { Payload } from "@/shared/model/api";

export interface LectureImage {
  id: number;
  url: string;
}

export interface LectureInstructorHistory {
  id: number;
  content: string;
}
export interface LectureInstructor {
  id: number;
  name: string;
  instructor_history: LectureInstructorHistory[];
}

export interface LecturePeriod {
  startDate: string;
  endDate: string;
  total: number;
}
export interface Lecture {
  id: number;
  name: string;
  description: string;
  price: number;
  time: string;
  capacity: number;
  link: string;
  location: string;
  status: boolean;
  thumbnail: string;
  heart: boolean;
  address: string;
  long_address: string;
  short_address: string;
  period: LecturePeriod[];
  division: string;
  category: string;
  condition: string;
  detail: string;
  certification: string;
  need: string;
  distance: string;
  estimatedTime: string;
  images: LectureImage[];
  day_of_week: string;
  hosted_by: string;
  d_day: number;
  text_book_name: string;
  text_book_price: number;
  instructor_name: LectureInstructor[];
  latitude: number;
  longitude: number;
  // educationPlan: string;
}

type LectureTitleType =
  | "capacity"
  | "hosted_by"
  | "division"
  | "period"
  | "time"
  | "price"
  | "location";

export const LectureTitleEnum = {
  capacity: "인원",
  hosted_by: "주최",
  division: "구분",
  period: "기간",
  time: "시간",
  price: "가격",
  location: "장소",
} as const;

export interface LectureSummaryListProps<
  T extends LectureTitleType = LectureTitleType,
> {
  src: string;
  type: T;
  render: (content: Lecture[T]) => string;
}

export const lectureSummaryList: Array<LectureSummaryListProps> = [
  {
    src: "/icons/division.svg",
    type: "division",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/capacity.svg",
    type: "capacity",
    render: (content) => `정원 ${content}명`,
  },
  {
    src: "/icons/hosted_by.svg",
    type: "hosted_by",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/period.svg",
    type: "period",
    render: (content) => {
      const lectureContent = content as LecturePeriod[];

      if (lectureContent[0].startDate === lectureContent[0].endDate) {
        return `${lectureContent[0].startDate}`;
      }

      return `${lectureContent[0].startDate}~${lectureContent[0].endDate} ${lectureContent[0].total !== -1 ? `총 ${lectureContent[0].total}회` : ""}`;
    },
  },
  {
    src: "/icons/time.svg",
    type: "time",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/price.svg",
    type: "price",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/location.svg",
    type: "location",
    // FIXME: 임시 처리
    render: (content) => `${content === "" ? " " : content}`,
  },
];

type LectureDetailTitleType =
  | "condition"
  | "description"
  | "certification"
  | "text_book_name"
  | "text_book_price"
  | "need";

export const LectureDetailTitleEnum = {
  condition: "수강자격",
  description: "교육내용",
  certification: "자격증 관련사항",
  text_book_name: "교재명",
  text_book_price: "교재비",
  need: "준비물",
} as const;

export interface LectureDetailListProps {
  type: LectureDetailTitleType;
  render: (content: Lecture[keyof Lecture]) => string;
}

//FIXME: 임시 처리
export const lectureDetailList: Array<LectureDetailListProps> = [
  {
    type: "condition",
    render: (content) => `${content === "" ? " " : content}`,
  },
  {
    type: "description",
    render: (content) => `${content === "" ? " " : content}`,
  },
  {
    type: "certification",
    render: (content) => `${content === "" ? " " : content}`,
  },
  {
    type: "text_book_name",
    render: (content) => `${content === "" ? " " : content}`,
  },
  {
    type: "text_book_price",
    render: (content) => `${content === "" ? " " : content}`,
  },
  {
    type: "need",
    render: (content) => `${content === "" ? " " : content}`,
  },
];

export interface GetLectureListParams {
  page: number;
  size: number;
}
export interface GetLectureListDto {
  params: LectureSize;
  payload: LecturePayload;
}

export interface LectureInfo {
  id: number;
  thumbnail: string;
  name: string;
  time: string;
  target: string;
  status: boolean;
  latitude: number;
  longitude: number;
  long_address: string;
  short_address: string;
  link: string;
  division: string;
  heart: boolean;
  start_date: string;
  end_date: string;
  day_of_week: string;
  hosted_by: string;
}

export interface LectureListResData {
  data: LectureInfo[];
  hasNext: boolean;
}
export interface GetLectureListRes {
  data: LectureListResData;
  message: string;
  status: string;
}

export type GetLectureList = Payload<
  undefined,
  GetLectureListParams,
  undefined,
  GetLectureListRes
>;

export interface LectureSize {
  page: number;
  size: number;
  // statue: boolean;
}

export interface LecturePayload {
  latitude: number;
  longitude: number;
}

export interface PickLectureInfo {
  id: number;
  view: number;
  thumbnail: string;
  name: string;
  time: string;
  target: string;
  status: boolean;
  heart: boolean;
  long_address: string;
  short_address: string;
  link: string;
  start_date: string;
  end_date: string;
  day_of_week: string;
  division: string;
}

export interface MarkerLectureInfo {
  longitude: number;
  latitude: number;
  short_address: string;
  long_address: string;
  hosted_by: string;
}

export interface LectureListResData {
  data: LectureInfo[];
  pickClasses: PickLectureInfo[];
  markerClasses: MarkerLectureInfo[];
  hasNext: boolean;
}
export interface GetHomeLectureListRes {
  data: LectureListResData;
  message: string;
  status: string;
}

export type GetHomeLectureList = Payload<
  undefined,
  GetLectureListParams,
  undefined,
  GetHomeLectureListRes
>;

export interface GetLectureDto {
  latitude: number;
  longitude: number;
}
export interface GetLectureRes {
  data: Lecture;
  message: string;
  status: string;
}

export type GetLecture = Payload<
  undefined,
  undefined,
  GetLectureDto,
  GetLectureRes
>;

export interface GetLocationLectureListParams {
  page: number;
  size: number;
  location: string;
}

export interface GetLocationLectureResData {
  data: LectureInfo[];
  hasNext: boolean;
}

export interface GetLocationLectureListRes {
  data: GetLocationLectureResData;
  message: string;
  status: string;
}

export type GetLocationLectureList = Payload<
  undefined,
  GetLocationLectureListParams,
  undefined,
  GetLocationLectureListRes
>;

export type shortAddressList =
  | "서울 송파구"
  | "서울 마포구"
  | "서울 노원구"
  | "서울 강서구";

export const lectureChipContentList: Array<shortAddressList> = [
  "서울 송파구",
  "서울 마포구",
  "서울 노원구",
  "서울 강서구",
];

export const lectureChipContentMap = {
  "서울 송파구": "서울특별시 송파구",
  "서울 마포구": "서울특별시 마포구",
  "서울 노원구": "서울특별시 노원구",
  "서울 강서구": "서울특별시 강서구",
};
