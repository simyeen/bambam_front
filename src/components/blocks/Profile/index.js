import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { doc, updateDoc } from 'firebase/firestore';

import Profile from './Profile';
import { dbService } from '../../../firebase';
import { userState } from '../../../store/stateAtoms';

const Index = ({ modalVisible, setModalVisible }) => {
  const [userData, setUserData] = useRecoilState(userState);
  const { branchType, centerType, team, name, email, dockey } = userData;

  const PROFILE_FORM = {
    name: name,
    email: email,
    branchType: branchType,
    centerType: centerType,
    team: team,
  };
  const [profileForm, setProfileForm] = useState(PROFILE_FORM);

  const handleChange = e => {
    const { name, value } = e.target;

    setProfileForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { branchType, centerType, team } = profileForm;

    try {
      const ref = doc(dbService, 'user-collection', dockey);

      await updateDoc(ref, {
        branchType: branchType,
        centerType: centerType,
        team: team,
      });
      window.location.reload();
    } catch (error) {
      console.log('회원가입 실패', error);
    }
  };

  return (
    <Profile
      {...{ profileForm }}
      {...{ modalVisible }}
      {...{ setModalVisible }}
      {...{ handleChange }}
      {...{ handleSubmit }}
    />
  );
};

export default Index;
