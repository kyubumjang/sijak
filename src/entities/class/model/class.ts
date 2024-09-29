export interface Class {
  id: number;
  name: string; // 강의 이름
  description: string; // 강의 설명
  price: number; // 가격
  day_of_week: string; // 요일 ("월")
  time: string; // 시간 (수요일 18:40 ~ 20:00) 으로 표시해야 해서 date 타입으로 해야할지 요건 잘 모르겠네요
  capacity: number; // 인원
  link: string; // 신청 페이지로 넘길 링크
  location: string; // 서울시 송파구 -> 이걸 나눠야할지 (시, 구, 동 이런식으로) 고민해봐야할 것 같아요. 명칭도 맞지 않는 것 같긴 합니다. 좋은 이름 있으면 추천해주세요.
  latitude: number; // 경도 (거리 계산 시 필요)
  longitude: number; // 위도 (거리 계산 시 필요)
  target: string; // -> 어떤 용도로 만들었는지 기억이 잘 안나네요(교육 대상 이었던 것 같은데 현재는 존재하지 않습니다. -> condition 교육 조건으로 변경될 것 같긴 한데 확인해주세요)
  status: string; // -> 어떤 용도로 만들었는지 생각이 안나요. 찜 상태인지.. -> like로 하고 없애면 될까요?
  thumbnail: string; // 썸네일 링크 주소
  like: boolean; // 찜하기 여부: 이것도 이름 바꿔야 될 것 같아요
  location_detail: string; // 장소 (송파여성문화회관 문화2실(309호) 이런식으로 표시할 건데 이것도 이름을 바꿔야될 것 같아요.
  hosted_by: string; // 주최 (송파여성문화회관)
  address: string; // 주소 (네이버 지도에 표시할 떄 사용)
  // period: 타입을 용범님께서 편하신 대로 주시면 제가 처리할 수 있을 것 같아요 예를 들어 {startData: date, endDate: date, total: number} 이런식으로 주시면 될 것 같습니다. //기간 (2024년 10월 2일 ~ 2024년 12월 18일 [총 12회])
  // distance: string; // 거리 (5m, 10m, 20m, 30m, 50m 100m, 300m, 500m, 3km, 5km, 10km, 20km, 30km)
  // division // 구분(장기 클래스, 원데이 클래스)
  // category: string; // 카테고리(문화, 제작..등 추후에 들어갈 것이지만 타입은 필요함)
  // condition: string // 수강 자격
  // detail: string // 교육 내용
  // certification: string // 자격증 관련사항
  // textbookName: string // 교재명
  // textbookPrice: string // 교재비
  // need: string // 준비물
  // instructorName: string // 강사 이름
  // instructorHistory: string[] // 강사이력 map 돌려서 처리하고 싶어서(불릿포인트로 표시하기 위해) 쉼표나 마침표 기준으로 split 해서 주시면 좋을 것 같아요
  // educationPlan: string // 타입에 대해서 논의가 필요할 것 같습니다.
  // TODO: 주최자가 올린 이미지 링크 string[] -> 정보가 없는 것 이미지로 처리할 때 사용할 타입이 필요해요
}
