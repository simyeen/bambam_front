import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Map from './Map';
import { positionState } from '../../../store/stateAtoms';
import { isValidatedDistance } from '../../../util/position';

const Index = () => {
  const navigate = useNavigate();

  const { kakao } = window;
  const [positionData, setPositonData] = useRecoilState(positionState);

  const mapRef = useRef(null);

  useEffect(() => {
    const { latitude, longitude } = positionData['GPS'];

    let mapContainer = document.getElementById('map'); // 지도를 표시할 div
    let mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    };
    let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();
    let initialMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
    });
    let marker = new kakao.maps.Marker();
    let infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    mapRef.current = map;
    initialMarker.setMap(map);
    setCenter({ latitude, longitude });

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let roadAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
          let nomalAddr = result[0].address.address_name;
          let content = `<div class="w-full text-sky-600 text-sm m-2" style="background-color"><span> ${
            roadAddr ? roadAddr : nomalAddr
          }</span></div>`;

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);

          let _lat = mouseEvent.latLng.getLat();
          let _lng = mouseEvent.latLng.getLng();

          console.log('지도에서 선택', positionData, _lat, _lng);

          setPositonData({ ...positionData, SELECT: { latitude: _lat, longitude: _lng } });
        }
      });
    });

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    function setCenter({ latitude, longitude }) {
      console.log('MAP에서 새로고침', latitude, longitude);
      var moveLatLon = new kakao.maps.LatLng(latitude, longitude);

      if (!navigator.geolocation) {
        alert('위치정보를 허용해주세요.');
        return;
      }
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      if (!latitude) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let _lat = position.coords.latitude; // 위도
          let _lng = position.coords.longitude; // 경도

          const moveLatLon = new kakao.maps.LatLng(_lat, _lng);
          console.log('_lat', _lat, _lng);
          console.log({ ...positionData });
          setPositonData({ ...positionData, GPS: { latitude: _lat, longitude: _lng } });

          console.log('gps호출map에서', positionData);
          map.setCenter(moveLatLon);

          let _marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(_lat, _lng),
          });
          _marker.setMap(map);
          return;
        });
      } else {
      }

      map.setCenter(moveLatLon);
    }

    return () => {};
  }, []);

  const handleConfirm = () => {
    console.log('버튼눌러서 포지션 값 확인하기', positionData);
    if (!positionData['SELECT'].latitude) {
      alert('위치를 선택해주세요.');
      return;
    }

    if (
      !isValidatedDistance(
        positionData['SELECT'].latitude,
        positionData['SELECT'].longitude,
        positionData['GPS'].latitude,
        positionData['GPS'].longitude,
        300,
      )
    ) {
      alert('300m 이내에서 선택해주세요.');
      return;
    }

    if (window.confirm('지금 선택한 위치로 조정 하시겠습니까?')) {
      navigate('/home');
    } else {
      console.log('취소');
    }
  };

  return <Map {...{ mapRef }} {...{ handleConfirm }} />;
};

export default Index;
