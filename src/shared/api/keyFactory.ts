const KEY_DOMAINS = {
  authUser: "authUser",
  logout: "logout",
  lecture: "lecture",
  homeLecture: "homeLecture",
  locationLecture: "locationLecture",
  likeClass: "likeClass",
  user: "user",
  you: "you",
} as const;

export const AUTH_KEYS = {
  user: [KEY_DOMAINS.authUser],
  logout: [KEY_DOMAINS.logout],
} as const;

export const LECTURE_KEYS = {
  all: [KEY_DOMAINS.lecture],
  lists: () => [...LECTURE_KEYS.all, "list"],
  list: (filters?: {
    id?: number;
    thumbnail?: string;
    name?: string;
    time?: string;
    target?: string;
    status?: boolean;
    latitude?: string;
    longitude?: string;
    long_address?: string;
    short_address?: string;
    link?: string;
    division?: string;
    heart?: boolean;
    start_date?: string;
    end_date?: string;
    day_of_week?: string;
    hosted_by?: string;
    location?: string;
    page?: number;
    size?: number;
  }) => [...LECTURE_KEYS.all, "list", filters],
  details: () => [...LECTURE_KEYS.all, "detail"],
  detail: (filters: { lectureId: number }) => [
    ...LECTURE_KEYS.details(),
    filters,
  ],
};

export const HOME_LECTURE_KEYS = {
  all: [KEY_DOMAINS.homeLecture],
  lists: () => [...HOME_LECTURE_KEYS.all, "list"],
  list: (filters?: {
    id?: number;
    thumbnail?: string;
    name?: string;
    time?: string;
    target?: string;
    status?: boolean;
    latitude?: string;
    longitude?: string;
    long_address?: string;
    short_address?: string;
    link?: string;
    division?: string;
    heart?: boolean;
    start_date?: string;
    end_date?: string;
    day_of_week?: string;
    hosted_by?: string;
    location?: string;
    page?: number;
    size?: number;
  }) => [...HOME_LECTURE_KEYS.all, "list", filters],
  details: () => [...HOME_LECTURE_KEYS.all, "detail"],
  detail: (filters: { lectureId: number }) => [
    ...HOME_LECTURE_KEYS.details(),
    filters,
  ],
};

export const LOCATION_LECTURE_KEYS = {
  all: [KEY_DOMAINS.locationLecture],
  lists: () => [...LOCATION_LECTURE_KEYS.all, "list"],
  list: (filters?: {
    id?: number;
    thumbnail?: string;
    name?: string;
    time?: string;
    target?: string;
    status?: boolean;
    latitude?: string;
    longitude?: string;
    long_address?: string;
    short_address?: string;
    link?: string;
    division?: string;
    heart?: boolean;
    start_date?: string;
    end_date?: string;
    day_of_week?: string;
    hosted_by?: string;
    page?: number;
    size?: number;
    location?: string;
  }) => [...LOCATION_LECTURE_KEYS.all, "list", filters],
  details: () => [...LOCATION_LECTURE_KEYS.all, "detail"],
  detail: (filters: { lectureId: number }) => [
    ...LOCATION_LECTURE_KEYS.details(),
    filters,
  ],
};

export const LIKE_LECTURE_KEYS = {
  all: [KEY_DOMAINS.likeClass],
  lists: () => [...LIKE_LECTURE_KEYS.all, "list"],
  list: (filters?: {
    name?: string;
    description?: string;
    price?: number;
    day_of_week?: string;
    time?: string;
    capacity?: number;
    link?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    target?: string;
    status?: string;
    page?: number;
    size?: number;
  }) => [...LIKE_LECTURE_KEYS.all, "list", filters],
  details: () => [...LIKE_LECTURE_KEYS.all, "detail"],
  detail: (filters: { classId: number }) => [
    ...LIKE_LECTURE_KEYS.details(),
    filters,
  ],
};

export const USER_KEYS = {
  all: [KEY_DOMAINS.user],
  token: () => [...USER_KEYS.all, "token"],
  lists: () => [...USER_KEYS.all, "list"],
  details: () => [...USER_KEYS.all, "detail"],
  detail: (filters: { userId: number }) => [...USER_KEYS.details(), filters],
  loginUser: () => [...USER_KEYS.all, "login"],
};
