import React from 'react';
import Photo from './Photo';
import exifr from 'exifr';

import imageCompression from 'browser-image-compression';
import { useRecoilState } from 'recoil';
import { boardState, imageUrlState } from '../../../store/stateAtoms';
import { DATE_TITLES, LOCATION_TITLES } from '../../../constants/home';
import { getDetailAddress } from '../../../util/position';
import { displayDateTimeParts } from '../../../util/\btime';

// 사진에서 메타데이터 가져오는 부분에서 차이점 존재
const Index = () => {
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);

  const handleImageChange = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (!file) {
      return;
    }

    const compressedFile = await imageCompression(file, options);
    reader.onload = () => {
      setImageUrl({ ...imageUrl, ORIGINAL: { url: reader.result } });
    };
    reader.readAsDataURL(compressedFile);

    try {
      const exifInfo = await exifr.parse(file);
      console.log('exifInfo', exifInfo);
      let { latitude, longitude } = await exifr.gps(file);
      let { DateTimeOriginal } = await exifr.parse(file);

      let imageAddr = await getDetailAddress(latitude, longitude);
      let imageData = displayDateTimeParts(DateTimeOriginal);

      setBoardData(
        boardData.map(data => {
          if (LOCATION_TITLES.includes(data.title)) {
            return { ...data, content: imageAddr };
          }
          if (DATE_TITLES.includes(data.title)) {
            return { ...data, content: imageData };
          }
          return data;
        }),
      );
    } catch (error) {
      console.log(error);
      alert(
        '[오류] 사진의 위치정보가 존재하지 않습니다.\n\nㅇ 위치기반 재촬영 방법 \nAndroid : 1. 설정>위치>사용 활성화 \n2. 카메라>좌측 톱니바퀴 아이콘>위치 태그 활성화 \niOS : 설정>카메라>포맷>높은 호환성>재촬영 후 사진 보관함에서 사진 선택',
      );
      setBoardData(
        boardData.map(data => {
          if (LOCATION_TITLES.includes(data.title)) {
            return { ...data, content: '' };
          }
          if (DATE_TITLES.includes(data.title)) {
            return { ...data, content: '' };
          }
          return data;
        }),
      );
    }
  };

  return <Photo {...{ handleImageChange }} />;
};

export default Index;
