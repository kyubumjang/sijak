"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Class } from "@/entities/class/model/class";

export type NaverMap = naver.maps.Map;

interface MapProps {
  latitude: number;
  longitude: number;
  classListData: Class[];
}

const Map = (props: MapProps) => {
  const { latitude, longitude, classListData } = props;

  const [selectedClassId, setSelectedClassId] = useState<number | null>();

  const markers: Array<naver.maps.Marker> = useMemo(() => {
    return [];
  }, []);

  const infoWindows: Array<naver.maps.InfoWindow> = useMemo(() => {
    return [];
  }, []);

  const initMap = useCallback(() => {
    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      logoControl: true, // 네이버 로고 표시 X
      mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
      scaleControl: true, // 지도 축척 컨트롤의 표시 여부
      tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
      zoom: 14, // 지도의 초기 줌 레벨
      zoomControl: false, // 줌 컨트롤 표시
      zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
    };

    const map = new naver.maps.Map("map_id", mapOptions);

    // 현재 위치 마커
    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: map,
      icon: {
        content:
          '<img src="/images/current_position.png" width="58" height="58" alt="현재 위치" />',
        size: new naver.maps.Size(38, 38),
        anchor: new naver.maps.Point(11, 35),
      },
    });

    // 클래스 Marker
    classListData.forEach((classData) => {
      const classMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          classData.latitude,
          classData.longitude,
        ),
        title: classData.hosted_by,
        clickable: true,
        map: map,
        icon: {
          content: `<img src="/images/marker_icon.png" width="24" height="24" alt="클래스 위치" />`,
          size: new naver.maps.Size(35, 35),
          anchor: new naver.maps.Point(11, 35),
        },
      });

      const hostedBy = classData.hosted_by;

      // InfoWindow 생성
      const infoWindow = new naver.maps.InfoWindow({
        content: `
    <div style="display: flex; flex-direction: column; width: 347px; height: 83px; gap: 2px; background: linear-gradient(#A249A8, #430347); border-radius: 20px; padding: 10px 23px 14px 31px;">
      <div style="display: flex; flex-direction: row; align-items: center; justify-items: center; gap: 5px;">
        <div style="display: flex;">
          <img src="/icons/home_alt.svg" width="24" height="24" alt="" />
        </div>
        <div style="width: 257px; height: 33px; font-size: 22px; font-weight: 600; color: #fff;">
          ${hostedBy}
        </div>
      </div>
      <div style="width: 293px; height: 24px; font-size: 15px; color: #fff;">
        서울 송파구 백제고분로42길 5 송파여성문화회관
      </div>
    </div>`,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: "transparent",
        pixelOffset: new naver.maps.Point(0, -8),
      });

      markers.push(classMarker);
      infoWindows.push(infoWindow);

      // 마커 클릭 시 InfoWindow 열기
      naver.maps.Event.addListener(classMarker, "click", function () {
        // 이미 열려있는 InfoWindow가 있다면 닫기
        infoWindows.forEach((iw) => iw.close());

        // 클릭한 마커에 해당하는 InfoWindow 열기
        infoWindow.open(map, classMarker);
      });
    });

    // 지도 상태가 변경될 때 마커 업데이트
    naver.maps.Event.addListener(map, "idle", function () {
      updateMarkers(map, markers);
    });

    const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
      marker.setMap(map);
    };

    const hideMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
      marker.setMap(null);
    };

    const updateMarkers = (
      map: naver.maps.Map,
      markers: Array<naver.maps.Marker>,
    ) => {
      const mapBounds = map.getBounds();
      let marker, position;

      for (let i = 0; i < markers.length; i++) {
        marker = markers[i];
        position = marker.getPosition();

        if (mapBounds) {
          showMarker(map, marker);
        } else {
          hideMarker(map, marker);
        }
      }
    };
  }, [
    classListData,
    infoWindows,
    latitude,
    longitude,
    markers,
    selectedClassId,
  ]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <div>
      <div id="map_id" style={{ height: "525px" }}></div>
    </div>
  );
};

export default Map;
