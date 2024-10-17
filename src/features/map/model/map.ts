export interface Location {
  latitude: number;
  longitude: number;
}

export const markerLocationMap = (latitude: number, longitude: number) => {
  return {
    전체: {
      latitude: latitude,
      longitude: longitude,
    },
    "서울 송파구": {
      latitude: 37.5059,
      longitude: 127.109778,
    },
    "서울 마포구": {
      latitude: 37.556445,
      longitude: 126.946607,
    },
    "서울 노원구": {
      latitude: 37.6561352,
      longitude: 127.0707057,
    },
    "서울 강서구": {
      latitude: 37.5663709,
      longitude: 126.8424769,
    },
  };
};
