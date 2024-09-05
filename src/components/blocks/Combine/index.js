import React, { useEffect } from 'react';
import Combine from './Combine';
import { imageUrlState } from '../../../store/stateAtoms';
import { useRecoilState } from 'recoil';
import { toPng } from 'html-to-image';

const Index = ({ imageRef }) => {
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);

  useEffect(() => {
    console.log('useEffect에서 Combine 자동실행');
    handleCombine();
  }, [imageUrl['ORIGINAL'].url]);

  const handleCombine = async () => {
    console.log('handleCombine 실행');
    let _combinedUrl;

    try {
      for (let i = 0; i < 3; i++) {
        _combinedUrl = await toPng(imageRef.current);
      }
      setImageUrl({ ...imageUrl, COMBINE: { url: _combinedUrl } });
    } catch (error) {
      console.log('Result에서 toPng 에러');
    }
  };

  return <Combine {...{ handleCombine }} />;
};

export default Index;
