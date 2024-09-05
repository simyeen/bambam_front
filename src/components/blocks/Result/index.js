import React from 'react';
import Result from './Result';
import { useRecoilState } from 'recoil';
import { boardState, imageUrlState, positionState, userState } from '../../../store/stateAtoms';
import { addDoc, collection } from 'firebase/firestore';
import { dbService } from '../../../firebase';
import { DAO } from '../../../util/data';

// 결과물을 보여주는 컴포넌트
const Index = ({ imageRef }) => {
  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [positionData, setPositionData] = useRecoilState(positionState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);

  const { branchType, centerType, latestBoardType, email, dockey, name, team, uid } = userData;
  const postForm = {
    GPSLatitude: positionData['SELECT'].latitude ? positionData['SELECT'].latitude : positionData['GPS'].latitude,
    GPSLongitude: positionData['SELECT'].longitude ? positionData['SELECT'].longitude : positionData['GPS'].longitude,
    branchType: branchType,
    centerType: centerType,
    boardType: DAO(latestBoardType),
    email: email,
    dockey: dockey,
    madeBy: name,
    team: team,
    uid: uid,
    createAt: new Date(),
    postItems: [],
  };

  const handleDownload = async () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // 아이폰은 꾹 눌러서 다운로드 받게하기
    if (isIOS) {
      alert('아이폰은 사진을 꾹 눌러서 이미지를 저장해주세요.');
      return;
    }

    if (!imageUrl['ORIGINAL'].url) {
      return;
    }

    if (window.confirm('이미지를 저장하시겠습니까?')) {
      const _postData = { ...postForm, postItems: [...boardData] };
      console.log('다운로드 실행');
      const docRef = await addDoc(collection(dbService, process.env.REACT_APP_FIREBASE_DOWNLOAD_COLLECTION), _postData);
    } else {
      return;
    }

    const a = document.createElement('a');
    a.download = 'download_image.jpg'; // 다운로드할 파일 이름
    a.href = imageUrl['COMBINE'].url;
    a.click(); // 링크 클릭 유도
  };

  return <Result {...{ imageRef }} {...{ boardData }} {...{ imageUrl }} {...{ handleDownload }} />;
};

export default Index;
