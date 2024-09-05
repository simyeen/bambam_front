const isValidatedDistance = (lat1, lon1, lat2, lon2, threadholds) => {
  // Haversine formula
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180; // Latitude 1 in radians
  const φ2 = (lat2 * Math.PI) / 180; // Latitude 2 in radians
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitudes
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitudes

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters

  console.log('현재거리', distance);
  if (distance <= threadholds) {
    return true;
  } else {
    return false;
  }
};

const getCurrentPosition = async () => {
  if (navigator) {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        error => {
          reject(error);
        },
      );
    });

    return position;
  } else {
    console.log('no navigator');
  }
};

const { kakao } = window;
const geocoder = new kakao.maps.services.Geocoder();

const getDetailAddress = async (latitude, longitude) => {
  const _detailArr = await new Promise((resolve, reject) => {
    geocoder.coord2Address(longitude, latitude, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let detailAddr = !!result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;
        resolve(detailAddr);
      } else {
        console.log('getDetailAddress 불러오기 실패');
        reject(new Error('Geocoding failed'));
      }
    });
  });

  return _detailArr;
};

export { isValidatedDistance, getCurrentPosition, getDetailAddress };
