<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../../../firebase';

import LoginPresenter from './LoginPresenter.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginForm = ref({
  email: '',
  password: ''
});

const handleChange = (e) => {
  loginForm.value[e.target.name] = e.target.value;
  console.log('핸들체인지', e.target.value);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = loginForm.value;
  console.log(email, password, '??');

  try {
    const userCredential = await signInWithEmailAndPassword(authService, email, password);
    if (userCredential.user.uid) {
      router.push('/home');
      console.log('로그인 성공');
    }
  } catch (error) {
    router.push('/home');
    console.log(error);
    alert('아이디 혹은 비밀번호가 틀렸습니다.');
  }
};
</script>

<template>
  <div class="w-full flex justify-center">
    <LoginPresenter
      :loginForm="loginForm"
      :handleChange="handleChange"
      :handleSubmit="handleSubmit"
    />
  </div>
</template>
