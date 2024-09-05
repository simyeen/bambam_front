import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

import { authService, dbService } from '../../../firebase';
import { userState } from '../../../store/stateAtoms';
import { onAuthStateChanged } from 'firebase/auth';

import Home from './Home';
import Loding from '../../atoms/Loding';
import { BOARD_BUTTON_LIST } from '../../../constants/board';

const Index = () => {
  const navigator = useNavigate();
  const imageRef = useRef('<div><div/>');

  const [userData, setUserData] = useRecoilState(userState);
  const [seletedBoard, setSeletedBoard] = useState(BOARD_BUTTON_LIST[0]);

  useEffect(() => {
    //뒤로 가기 방지
    window.history.pushState(null, '', '');
    onAuthStateChanged(authService, user => {
      if (user) {
        querySnapShot(user.uid);
      } else {
        navigator('/');
      }
    });

    async function querySnapShot(uid) {
      const q = query(collection(dbService, process.env.REACT_APP_FIREBASE_USER_COLLECTION), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const _userData = querySnapshot.docs.map(doc => ({
        ...doc.data(), //합쳐서 보여줌
      }))[0];

      setUserData(_userData);
      setSeletedBoard(BOARD_BUTTON_LIST[_userData.latestBoardType ? _userData.latestBoardType - 1 : 0]);
    }
  }, []);

  // 선택한 드랍다운에서 item의 name과 type을 저장
  // item은 그냥 보여주기만 할거니깐 상관없고, type은 setUserData에 넣어줘야함.
  const handleSelect = async (index = 0, value) => {
    const collectionRef = doc(dbService, process.env.REACT_APP_FIREBASE_USER_COLLECTION, userData.dockey);
    await updateDoc(collectionRef, { latestBoardType: value });

    setUserData({ ...userData, latestBoardType: value });
    BOARD_BUTTON_LIST.forEach((item, i) => {
      if (item.content === value) {
        setSeletedBoard(BOARD_BUTTON_LIST[i]);
      }
    });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigator('/');
    });
  };

  return (
    <>
      {userData.name ? (
        <Home
          {...{ BOARD_BUTTON_LIST }}
          {...{ imageRef }}
          {...{ userData }}
          {...{ seletedBoard }}
          {...{ handleLogout }}
          {...{ handleSelect }}
        />
      ) : (
        <Loding />
      )}
    </>
  );
};

export default Index;
