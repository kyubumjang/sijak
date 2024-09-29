import { HttpResponse, http } from "msw";

import moment from "moment-timezone";

export const handlers = [
  http.get("/login", () => {
    return HttpResponse.json({
      data: {
        id: 1,
        account_email: "jkb2221@gmail.com",
        profile_image:
          "https://avatars.githubusercontent.com/u/33307948?s=400&u=a642bbeb47b47e203f37b47db12d2d92d8f98580&v=4",
        name: "kyubumjang",
        gender: "male",
        age_range: "20~29",
        applied_class: [
          {
            id: 1,
            name: "디지털카메라초급(눈으로 사진찍기)",
            description:
              "컴팩트 카메라부터 DSLR 카메라까지 디지털 카메라에 대해서 이해하고 카메라의 모든 기능을 200% 활용하는데 목적을 둔다 ** 사진입문자를 위한 수업입니다. ** 3개월 동안 사진 완전초보를 벗어날 수 있도록 도와드립니다. **야외수업시 보험가입 필수 (1일 보험료 별도) 보험가입증서 제출 또는 동의서 작성",
            price: 90000,
            day_of_week: "수",
            time: "2024-09-16 18:00:00",
            capacity: 15,
            link: "https://www.songpawoman.org/2024/epit_contents.asp?epit_num=10501042&om=202410&ucode=&period=3",
            location: "서울 송파",
            latitude: 108,
            longitude: 108,
            target: "사진 입문자",
            status: "모집 중",
            thumbnail:
              "https://images.unsplash.com/photo-1601134991665-a020399422e3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            like: true,
            location_detail: "송파여성문화회관 미디어1실(101호)",
            hosted_by: "송파여성문화회관",
          },
        ],
        latitude: 37.5059054977082,
        longitude: 127.109788230628,
        city: "서울특별시",
      },
    });
  }),
  http.get("/classlist", () => {
    return HttpResponse.json({
      data: [
        {
          name: "디지털카메라초급(눈으로 사진찍기)",
          description:
            "컴팩트 카메라부터 DSLR 카메라까지 디지털 카메라에 대해서 이해하고 카메라의 모든 기능을 200% 활용하는데 목적을 둔다 ** 사진입문자를 위한 수업입니다. ** 3개월 동안 사진 완전초보를 벗어날 수 있도록 도와드립니다. **야외수업시 보험가입 필수 (1일 보험료 별도) 보험가입증서 제출 또는 동의서 작성",
          price: 90000,
          day_of_week: "수",
          time: moment().tz("Asia/Seoul").format("2024-09-16 18:00:00"),
          capacity: 15,
          link: "https://www.songpawoman.org/2024/epit_contents.asp?epit_num=10501042&om=202410&ucode=&period=3",
          location: "송파여성문화회관 미디어1실(101호)",
          latitude: 37.5059054977082,
          longitude: 127.109788230628,
          target: "사진 입문자",
          status: "모집 중",
        },
      ],
    });
  }),
];
