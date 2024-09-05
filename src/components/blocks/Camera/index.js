import React from 'react';
import Camera from './Camera';

import imageCompression from 'browser-image-compression';
import { useRecoilState } from 'recoil';
import { boardState, imageUrlState, positionState } from '../../../store/stateAtoms';
import { DATE_TITLES, LOCATION_TITLES } from '../../../constants/home';
import { getDetailAddress } from '../../../util/position';
import { displayDateTimeParts } from '../../../util/\btime';

const Index = () => {
  const [positonData, setPositonData] = useRecoilState(positionState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);

  const handleImageCameraChange = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      alert('사진이 존재하지 않습니다.');
      return;
    }

    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    reader.onload = () => {
      setImageUrl({ ...imageUrl, ORIGINAL: { url: reader.result } });
    };
    reader.readAsDataURL(compressedFile);

    try {
      let imageAddr = await getDetailAddress(positonData['GPS'].latitude, positonData['GPS'].longitude);
      let imageData = displayDateTimeParts(new Date());

      setBoardData(
        boardData.map(data => {
          if (LOCATION_TITLES.includes(data.title)) {
            return { ...data, content: imageAddr };
          } else if (DATE_TITLES.includes(data.title)) {
            return { ...data, content: imageData };
          }
          return data;
        }),
      );
    } catch {
      alert('GPS를 허용해주세요.');
    }
  };

  return <Camera {...{ handleImageCameraChange }} />;
};

export default Index;
