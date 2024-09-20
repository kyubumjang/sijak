const KEY_DOMAINS = {
  authUser: "authUser",
  logout: "logout",
  class: "class",
  likeClass: "likeClass",
  user: "user",
  you: "you",
} as const;

export const AUTH_KEYS = {
  user: [KEY_DOMAINS.authUser],
  logout: [KEY_DOMAINS.logout],
} as const;

export const CLASS_KEYS = {
  all: [KEY_DOMAINS.class],
  lists: () => [...CLASS_KEYS.all, "list"],
  list: (filters?: {
    name: string;
    description: string;
    price: number;
    day_of_week: string;
    time: string;
    capacity: number;
    link: string;
    location: string;
    latitude: number;
    longitude: number;
    target: string;
    status: string;
  }) => [...CLASS_KEYS.all, "list", filters],
  details: () => [...CLASS_KEYS.all, "detail"],
  detail: (filters: { classId: number }) => [...CLASS_KEYS.details(), filters],
};

export const LIKE_CLASS_KEYS = {
  all: [KEY_DOMAINS.likeClass],
  lists: () => [...LIKE_CLASS_KEYS.all, "list"],
  list: (filters?: {
    name: string;
    description: string;
    price: number;
    day_of_week: string;
    time: string;
    capacity: number;
    link: string;
    location: string;
    latitude: number;
    longitude: number;
    target: string;
    status: string;
  }) => [...LIKE_CLASS_KEYS.all, "list", filters],
  details: () => [...LIKE_CLASS_KEYS.all, "detail"],
  detail: (filters: { classId: number }) => [
    ...LIKE_CLASS_KEYS.details(),
    filters,
  ],
};

export const USER_KEYS = {
  all: [KEY_DOMAINS.user],
  lists: () => [...USER_KEYS.all, "list"],
  details: () => [...USER_KEYS.all, "detail"],
  detail: (filters: { userId: number }) => [...USER_KEYS.details(), filters],
  loginUser: () => [...USER_KEYS.all, "login"],
};
