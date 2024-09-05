import React, { useState } from 'react';
import SignIn from './SignIn';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { authService, dbService } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Index = ({ modalVisible, setModalVisible }) => {
  const SIGNIN_FORM = {
    branchType: '',
    centerType: '',
    name: '',
    team: '',
    email: '',
    password: '',
    checkedPassword: '',
  };
  const [signInForm, setSignInForm] = useState(SIGNIN_FORM);

  const handleChange = e => {
    const { name, value } = e.target;

    setSignInForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, team, email, password, checkedPassword, branchType, centerType } = signInForm;
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if ([name, team, email, password, checkedPassword].includes('')) {
      alert('빈칸 없이 입력해주세요.');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    // 비밀번호 유효성 검사
    if (!password || password.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (password !== checkedPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (
      window.confirm(
        `입력한 정보가 맞으신가요? 이름과 아이디는 추후 수정이 어렵습니다.\n\n이름: ${name}\n아이디: ${email}`,
      )
    ) {
    } else {
      console.log('취소');
      return;
    }

    try {
      // 이메일 중복체크
      const q = query(
        collection(dbService, process.env.REACT_APP_FIREBASE_USER_COLLECTION),
        where('email', '==', email),
      );
      const querySnapshot = await getDocs(q);
      const _userData = querySnapshot.docs.map(doc => ({
        ...doc.data(), //합쳐서 보여줌
      }))[0];

      if (_userData) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }

      const _userCredential = await createUserWithEmailAndPassword(authService, email, password);
      if (!_userCredential) {
        alert('서비스 에러발생, 다시 실행해주세요.');
        return;
      }
      const userRef = collection(dbService, process.env.REACT_APP_FIREBASE_USER_COLLECTION);

      if (_userCredential.user) {
        const _dockey = uuidv4();
        await setDoc(doc(userRef, _dockey), {
          uid: _userCredential.user.uid, //firebase 제공 id
          dockey: _dockey, //uuid로 생성한 임의 아이디
          name: name,
          team: team,
          email: email,
          branchType: branchType,
          centerType: centerType,
          latestBoardType: 1,
          createAt: new Date(),
          // password: password,
        });
      } else {
        alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.log('회원가입 실패', error);
    }
  };

  return (
    <div>
      <SignIn {...{ modalVisible }} {...{ setModalVisible }} {...{ handleChange }} {...{ handleSubmit }} />
    </div>
  );
};

export default Index;
