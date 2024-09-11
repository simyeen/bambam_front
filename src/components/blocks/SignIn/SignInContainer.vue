<script setup>
import { reactive } from 'vue';

import SignInPresenter from './SignInPresenter.vue';
import { AuthAPI } from '@/api';
import { useRouter } from 'vue-router';

const { modalVisible, toggleModal } = defineProps({
  modalVisible: Boolean,
  toggleModal: Function
});

const router = useRouter();

const SIGNIN_FORM = {
  username: '',
  email: '',
  password: '',
  checkedPassword: ''
};

const signInForm = reactive({ ...SIGNIN_FORM });

const handleChange = (e) => {
  const { name, value } = e.target;
  signInForm[name] = value;
};

const handleSubmit = async () => {
  const { username, email, password, checkedPassword } = signInForm;
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  if ([username, email, password, checkedPassword].includes('')) {
    alert('빈칸 없이 입력해주세요.');
    return;
  }

  if (!email || !emailRegex.test(email)) {
    alert('유효한 이메일 주소를 입력하세요.');
    return;
  }

  if (!password || password.length < 6) {
    alert('비밀번호는 6자 이상이어야 합니다.');
    return;
  }

  if (password !== checkedPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  if (window.confirm(`입력한 정보가 맞으신가요? \n아이디: ${username}\n이메일: ${email}`)) {
    // Continue
  } else {
    console.log('취소');
    return;
  }

  try {
    const result = await AuthAPI.signIn({ data: { ...signInForm } });
    console.log('result', result);

    alert('회원가입 성공!');
    // router.push('/home');
  } catch (error) {
    console.log('회원가입 실패', error);
  }
};
</script>

<template>
  <div>
    <SignInPresenter
      :modalVisible="modalVisible"
      :toggleModal="toggleModal"
      :handleChange="handleChange"
      :handleSubmit="handleSubmit"
    />
  </div>
</template>
