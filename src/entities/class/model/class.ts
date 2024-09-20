export interface Class {
  id: number;
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
  // TODO: erd 추가
  thumbnail: string;
  like: boolean;
  location_detail: string;
  hosted_by: string;
  // TODO: 소요시간 추가
  // TODO: 주소 추가
  // TODO: 주최자가 올린 이미지 링크 string[]
  // TODO: 준비물? 여부 판단 필요
}
