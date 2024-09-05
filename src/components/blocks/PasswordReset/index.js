import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import PasswordReset from './PasswordReset';

const Index = ({ passwordResetModalVisible, setPasswordResetModalVisible }) => {
  const [form, setForm] = useState({
    email: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 비밀번호 초기화히기
  const handleSubmit = async e => {
    const auth = getAuth();

    await sendPasswordResetEmail(auth, form.email)
      .then(() => {
        alert('이메일이 전송됐습니다. 잠시만 기다려주세요.');
        setForm({ ...form, email: '' });
      })
      .catch(error => {
        console.log(error);
        alert('아이디 혹은 비밀번호가 틀렸습니다.');
      });
  };

  return (
    <PasswordReset
      {...{ handleChange }}
      {...{ handleSubmit }}
      {...{ passwordResetModalVisible }}
      {...{ setPasswordResetModalVisible }}
    />
  );
};

export default Index;
