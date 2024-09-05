import React from 'react';
import Share from './Share';
import { toBlob } from 'html-to-image';
import { useRecoilState } from 'recoil';
import { boardState, imageUrlState, positionState, userState } from '../../../store/stateAtoms';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { dbService } from '../../../firebase';
import { DAO } from '../../../util/data';

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

  const handleShare = async () => {
    // board를 DB에 넣기 알맞은 형태로 바꿔줘야함.

    if (!navigator.share) {
      alert('공유 기능을 사용할 수 없는 환경입니다.\n*안드로이드는 크롬브라우저, 아이폰은 사파리를 사용해주세요.');
      return;
    }

    if (!imageUrl['ORIGINAL'].url) {
      alert('사진이 없습니다.');
      return;
    }

    if (window.confirm('사진을 공유하시겠습니까?')) {
    } else {
      console.log('취소');
      return;
    }

    const newFile = await toBlob(imageRef.current);
    const data = {
      files: [
        new File([newFile], 'image.png', {
          type: newFile.type,
        }),
      ],
    };

    try {
      await navigator.share(data);

      const _postData = { ...postForm, postItems: [...boardData] };
      console.log(_postData);
      const docRef = await addDoc(collection(dbService, process.env.REACT_APP_FIREBASE_POST_COLLECTION), _postData);

      alert('공유가 완료됐습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  return <Share {...{ handleShare }} />;
};

export default Index;
