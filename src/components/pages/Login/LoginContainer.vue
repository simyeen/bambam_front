<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthAPI } from '@/api';
import { useAuthStore } from '@/stores/auth';

import LoginPresenter from './LoginPresenter.vue';

const router = useRouter();
const authStore = useAuthStore();

const loginForm = ref({
  username: '',
  password: ''
});

const handleChange = (e) => {
  loginForm.value[e.target.name] = e.target.value;
  console.log('핸들체인지', e.target.value);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = await AuthAPI.login({ data: { ...loginForm.value } });
    authStore.setToken(token);
    console.log('토큰 저장 완료', token);
    router.push('/home');
  } catch (error) {
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
