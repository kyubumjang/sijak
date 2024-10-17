import { useCallback, useEffect } from "react";

interface MiniMapProps {
  latitude: number;
  longitude: number;
}

const MiniMap = ({ latitude, longitude }: MiniMapProps) => {
  const initMap = useCallback(() => {
    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      logoControl: false, // 네이버 로고 표시 X
      mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
      scaleControl: false, // 지도 축척 컨트롤의 표시 여부
      tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
      zoom: 16, // 지도의 초기 줌 레벨
      zoomControl: false, // 줌 컨트롤 표시
      zoomControlOptions: { position: 7 }, // 줌 컨트롤 우하단에 배치
    };

    const map = new naver.maps.Map("mini_map_id", mapOptions);

    // 클래스 위치 마커
    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: map,
      icon: {
        content:
          '<img src="/icons/marker.svg" width="44" height="51" alt="클래스 위치" />',
        size: new naver.maps.Size(44, 51),
        anchor: new naver.maps.Point(11, 35),
      },
    });
  }, [latitude, longitude]);

  useEffect(() => {
    if (typeof naver !== "undefined") {
      initMap();
    } else {
      // naver 객체가 정의되지 않은 경우, 스크립트 로드 후 재시도
      const checkNaver = setInterval(() => {
        if (typeof naver !== "undefined") {
          clearInterval(checkNaver);
          initMap();
        }
      }, 100); // 100ms마다 체크

      return () => clearInterval(checkNaver);
    }
  }, [initMap]);

  return (
    <div>
      <div
        id="mini_map_id"
        className="desktop:w-[572px] tablet:w-[704px] mobile:w-[312px] desktop:h-[152px] tablet:h-[228px] mobile:h-[144px]"
        // desktop:h-[143px] tablet:h-[228px] mobile:h-[122px]
      ></div>
    </div>
  );
};

export default MiniMap;
